import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

import { envs } from '@config/envs';
import { classSessionUser } from '@common/class/userSession.class';
import { IToken } from '../interfaces/token.interface';
import { PermissionsService } from '@auth/services/permissions.service';
import { UsersService } from '@users/services/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly permissionsService: PermissionsService,
    private readonly usersService: UsersService,
    private sessionUser: classSessionUser,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: envs.jwtSecret,
      passReqToCallback: true,
      ignoreExpiration: false,
    });
  }

  async validate(request: Request, payload: IToken): Promise<any> {
    const idUser: string = payload['sub'];

    // ✅ USAR EL MÉTODO CORRECTO: findOne en lugar de findById
    const user = await this.usersService.findOne(idUser);
    
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const endpoint: string = request.route?.path || request.url;
    const method: string = request.method;

    // storage class global
    this.sessionUser.idUser = idUser;
    await this.permissionsService.findPermissionsToUser(
      idUser,
      endpoint,
      method,
    );

    // ✅ DEVOLVER SOLO PROPIEDADES QUE EXISTEN EN MntUsers
    return {
      id: user.id,
      email: user.email,
      active: user.active,
      is_2fa_enabled: user.is_2fa_enabled,
      // Agregar otras propiedades que necesites del usuario
    };
  }
}