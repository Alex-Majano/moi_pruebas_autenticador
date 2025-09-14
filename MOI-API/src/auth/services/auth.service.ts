import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment-timezone';
import { envs } from '@config/envs';

import { UsersService } from '@users/services/users.service';
import { MntUsers } from '@users/entities';
import { TokenService } from './token.service';
import { IToken } from '../interfaces/token.interface';
import { IRefreshToken } from '../interfaces/refreshToken.interface';
import { IAuthUser } from '@auth/interfaces/authUser.interface';
import { RestoreAccountService } from '@users/services/restore-account.service';
import { EmailService } from '@email/services/email.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
    private readonly restoreAccountService: RestoreAccountService,
    private readonly emailService: EmailService,
  ) {}

  async validateUser(email: string, password: string): Promise<MntUsers> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.active) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return user;
      }
    }
    return null;
  }

  async login(user: MntUsers) {
    // Verificar si el usuario tiene 2FA activado
    if (user.is_2fa_enabled) {
      // Si tiene 2FA activado, no generar token aún
      return {
        requires2fa: true,
        message: 'Se requiere código de autenticación de dos factores',
        email: user.email,
        userId: user.id,
      };
    }

    // Si no tiene 2FA activado, generar token normalmente
    return await this.generateAuthResponse(user);
  }

  // Método para verificar el código 2FA y completar el login
  async verify2FALogin(userId: string, token: string) {
    const user = await this.usersService.findOne(userId);
    
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    if (!user.is_2fa_enabled) {
      throw new UnauthorizedException('2FA no está activado para este usuario');
    }

    if (!user.two_factor_secret) {
      throw new UnauthorizedException('No hay secret configurado para 2FA');
    }

    // Verificar el código usando el secret almacenado
    const isValid = await this.verify2FACode(user.two_factor_secret, token);
    
    if (!isValid) {
      throw new UnauthorizedException('Código 2FA inválido');
    }

    // Si el código es válido, generar la respuesta de autenticación
    return await this.generateAuthResponse(user);
  }

  // Método para verificar código 2FA (usando speakeasy)
  private async verify2FACode(secret: string, token: string): Promise<boolean> {
    // Importar speakeasy dinámicamente para evitar conflictos
    const speakeasy = require('speakeasy');
    
    return speakeasy.totp.verify({
      secret: secret,
      token: token,
      encoding: 'base32',
      window: 1, // Permite un margen de error de 30 segundos
    });
  }

  // Método para generar la respuesta de autenticación (token y user info)
  private async generateAuthResponse(user: MntUsers) {
    const dataToken: IToken = { rol: user.rol, sub: user.id };
    const token = await this.tokenService.createJWTToken(
      dataToken,
      envs.jwtExpiration,
      envs.jwtSecret,
    );

    // Desactivar tokens antiguos
    await this.tokenService.desactiveTokensByUser(user.id);

    const { amount, unit } = this.tokenService.parseExpirationJwt(
      envs.jwtExpiration,
    );

    const savedToken = await this.tokenService.create({
      userId: user.id,
      token,
      expirationTime: moment()
        .tz('America/El_Salvador')
        .add(amount, unit)
        .format(),
    });

    if (envs.jwtUseRefreshToken) {
      const dataRefreshToken: IRefreshToken = {
        rol: user.rol + token,
        sub: user.id + token,
      };
      const refreshToken = await this.tokenService.createJWTToken(
        dataRefreshToken,
        envs.jwtRefreshExpiration,
        envs.jwtSecret,
      );

      const { amount: refreshAmount, unit: refreshUnit } = this.tokenService.parseExpirationJwt(
        envs.jwtRefreshExpiration,
      );

      await this.tokenService.update(savedToken.token, {
        userId: user.id,
        refreshToken: refreshToken,
        refreshExpirationTime: moment()
          .tz('America/El_Salvador')
          .add(refreshAmount, refreshUnit)
          .format(),
      });
    }

    return {
      user: this.formatUser(user),
      token,
    };
  }

  async logout(user: MntUsers): Promise<void> {
    await this.tokenService.desactiveTokensByUser(user.id);
  }

  private formatUser(user: MntUsers) {
    const infoUser: IAuthUser = {
      id: user.id,
      email: user.email,
      tipo_usuario: {
        id: user.rol.id,
        nombre: user.rol.name,
      },
    };

    return infoUser;
  }

  async recoverPassword(id: string, ip: string) {
    const user = await this.usersService.findOne(id);
    const url = await this.restoreAccountService.create(
      user,
      ip,
      '/auth/reestablecer-password/',
    );
    await this.emailService.sendEmail(
      user.email,
      'Restablecer contraseña',
      'name_template',
      {
        name: user.email,
        url: url,
      },
    );

    return {
      message: 'Se ha enviado un correo para recuperar su cuenta',
    };
  }

  async verifyRecoverPassword(token: string) {
    return await this.restoreAccountService.searchToken(token);
  }
}