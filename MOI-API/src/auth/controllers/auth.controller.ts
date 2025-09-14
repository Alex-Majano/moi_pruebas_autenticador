import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Ip,
  Param,
  Post,
  Req,
  UseGuards,
  UnauthorizedException,
  BadRequestException
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '@auth/guards/jwt.guard';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from '@auth/decorators/public.decorator';
import { AuthService } from '@auth/services/auth.service';
import { MntUsers } from '@users/entities';
import { loginDTO } from '@auth/dtos/login.dto';
import { PermissionsService } from '@auth/services/permissions.service';
import { IChangePassword } from '@users/interfaces/change-password.interface';
import { UsersService } from '@users/services/users.service';
import { IRestorePassword } from '@auth/interfaces/restore-password.interface';
import { TwoFactorService } from '../../two-factor/two-factor.service';

@ApiTags('Auth')
@Controller('auth')
@UseGuards(JwtAuthGuard)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly permissionService: PermissionsService,
    private readonly usersService: UsersService,
    private readonly twoFactorService: TwoFactorService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: loginDTO })
  @ApiOperation({ summary: 'Iniciar sesión de usuario' })
  @ApiResponse({ 
    status: 200, 
    description: 'Login exitoso',
    schema: {
      oneOf: [
        {
          properties: {
            user: { type: 'object' },
            token: { type: 'string' }
          }
        },
        {
          properties: {
            requires2fa: { type: 'boolean', example: true },
            message: { type: 'string' },
            email: { type: 'string', example: 'admin@salud.gob.sv' },
            userId: { type: 'string' }
          }
        }
      ]
    }
  })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: Request) {
    try {
      const result = await this.authService.login(req.user as MntUsers);
      
      if ('requires2fa' in result && result.requires2fa) {
        return {
          requires2fa: true,
          message: result.message,
          email: result.email,
          userId: result.userId
        };
      }
      
      return result;
    } catch (error) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @ApiOperation({ summary: 'Verificar código 2FA' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'string' },
        token: { type: 'string' }
      },
      required: ['userId', 'token'],
      example: {
        userId: '123e4567-e89b-12d3-a456-426614174000',
        token: '123456'
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Código 2FA verificado correctamente',
    schema: {
      properties: {
        user: { type: 'object' },
        token: { type: 'string' }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Código 2FA inválido' })
  @Post('verify-2fa')
  async verify2FA(@Body() body: { userId: string; token: string }) {
    try {
      return await this.authService.verify2FALogin(body.userId, body.token);
    } catch (error) {
      throw new UnauthorizedException('Código 2FA inválido');
    }
  }

  @Post('enable-2fa')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Activar autenticación de dos factores' })
  @ApiResponse({ 
    status: 200, 
    description: 'QR generado exitosamente',
    schema: {
      properties: {
        qrImage: { 
          type: 'string', 
          description: 'Imagen QR en formato base64',
          example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...'
        },
        secret: { 
          type: 'string', 
          description: 'Clave secreta para configuración manual',
          example: 'JBSWY3DPEHPK3PXP'
        },
        message: { 
          type: 'string', 
          example: 'Escanee el QR con Google Authenticator' 
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Token JWT requerido' })
  async enable2FA(@Req() req: Request) {
    try {
      const user = req.user as MntUsers;
      
      // ✅ VERIFICACIÓN EXTRA: Asegurar que el user tiene ID
      if (!user || !user.id) {
        console.error('❌ User object:', user);
        throw new BadRequestException('Usuario no válido o sin ID');
      }
      
      console.log('🔍 User ID en enable2FA:', user.id);
      console.log('🔍 User email:', user.email);
      
      const secret = this.twoFactorService.generateSecret();
      const appName = 'Sistema MINSAL';
      const qrUrl = this.twoFactorService.generateQRCodeURL(secret, user.email, appName);
      const qrImage = await this.twoFactorService.generateQRCodeImage(qrUrl);
      
      await this.usersService.update(user.id, { 
        two_factor_secret: secret,
      });
      
      return {
        qrImage,
        secret,
        message: 'Escanee el QR con Google Authenticator'
      };
    } catch (error) {
      console.error('❌ Error en enable2FA:', error);
      throw new BadRequestException('Error al generar QR: ' + error.message);
    }
  }

  @Post('verify-enable-2fa')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verificar y activar 2FA' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        token: { 
          type: 'string',
          description: 'Código de 6 dígitos de Google Authenticator',
          example: '123456'
        }
      },
      required: ['token']
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: '2FA activado correctamente',
    schema: {
      properties: {
        message: { type: 'string', example: '2FA activado correctamente' },
        enabled: { type: 'boolean', example: true }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Token JWT requerido' })
  async verifyEnable2FA(@Req() req: Request, @Body() body: { token: string }) {
    try {
      const user = req.user as MntUsers;
      
      // ✅ OBTENER USUARIO COMPLETO DE LA BD
      const fullUser = await this.usersService.findByEmail(user.email);
      
      if (!fullUser.two_factor_secret) {
        throw new BadRequestException('No se ha configurado el 2FA');
      }
      
      const isValid = this.twoFactorService.verifyCode(fullUser.two_factor_secret, body.token);
      
      if (!isValid) {
        throw new UnauthorizedException('Código inválido');
      }
      
      await this.usersService.update(fullUser.id, { 
        is_2fa_enabled: true 
      });
      
      return { 
        message: '2FA activado correctamente',
        enabled: true 
      };
    } catch (error) {
      console.error('❌ Error en verifyEnable2FA:', error);
      throw new BadRequestException('Error al verificar 2FA: ' + error.message);
    }
  }

  @Post('disable-2fa')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Desactivar autenticación de dos factores' })
  @ApiResponse({ 
    status: 200, 
    description: '2FA desactivado correctamente',
    schema: {
      properties: {
        message: { type: 'string', example: '2FA desactivado correctamente' },
        enabled: { type: 'boolean', example: false }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Token JWT requerido' })
  async disable2FA(@Req() req: Request) {
    try {
      const user = req.user as MntUsers;
      
      // ✅ OBTENER USUARIO COMPLETO DE LA BD
      const fullUser = await this.usersService.findByEmail(user.email);
      
      await this.usersService.update(fullUser.id, { 
        is_2fa_enabled: false,
        two_factor_secret: null
      });
      
      return { 
        message: '2FA desactivado correctamente',
        enabled: false 
      };
    } catch (error) {
      console.error('❌ Error en disable2FA:', error);
      throw new BadRequestException('Error al desactivar 2FA: ' + error.message);
    }
  }

  @Post('check-2fa-status')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verificar estado del 2FA' })
  @ApiResponse({ 
    status: 200, 
    description: 'Estado del 2FA',
    schema: {
      properties: {
        is_2fa_enabled: { type: 'boolean', example: true },
        has_secret_configured: { type: 'boolean', example: true }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Token JWT requerido' })
  async check2FAStatus(@Req() req: Request) {
    const user = req.user as MntUsers;
    
    // ✅ OBTENER USUARIO COMPLETO DE LA BD
    const fullUser = await this.usersService.findByEmail(user.email);
    
    return { 
      is_2fa_enabled: fullUser.is_2fa_enabled,
      has_secret_configured: !!fullUser.two_factor_secret
    };
  }

  @Post('/has-permission')
  @ApiOperation({ summary: 'Verificar permisos de usuario' })
  hassPermission(@Body() data: string[]) {
    return this.permissionService.hassPermission(data);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/recuperar-password/:id')
  @ApiOperation({ summary: 'Recuperar contraseña' })
  recuperarPassword(@Ip() ip: string, @Param('id') id: string) {
    return this.authService.recoverPassword(id, ip);
  }

  @Public()
  @HttpCode(HttpStatus.ACCEPTED)
  @Post('/reestablecer-password')
  @ApiOperation({ summary: 'Reestablecer contraseña' })
  reestablecerPassword(@Body() data: IRestorePassword) {
    return this.authService.verifyRecoverPassword(data['tokenNombre']);
  }

  @Public()
  @HttpCode(HttpStatus.ACCEPTED)
  @Post('/change-password-reset/')
  @ApiOperation({ summary: 'Cambiar contraseña' })
  changePasswordReset(@Body() payload: IChangePassword) {
    return this.usersService.changePasswordReset(payload);
  }
}