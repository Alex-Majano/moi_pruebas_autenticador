import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { TwoFactorService } from './two-factor.service';

@Controller('two-factor')
export class TwoFactorController {
  constructor(private readonly twoFactorService: TwoFactorService) {}

  // Endpoint para generar QR y secret (activar 2FA)
  @Post('generate')
  async generate2FA(@Body() body: { email: string }) {
    const secret = this.twoFactorService.generateSecret();
    const appName = 'Sistema MINSAL'; // Personaliza con el nombre de tu app
    const url = this.twoFactorService.generateQRCodeURL(secret, body.email, appName);
    const qrImage = await this.twoFactorService.generateQRCodeImage(url);

    // Aquí deberías guardar el "secret" en la base de datos para el usuario (body.email)
    // Ej: await this.userService.updateUser(body.email, { two_factor_secret: secret });

    return {
      secret, // Solo para pruebas (no enviar en producción)
      qrImage, // Envía esto al frontend para mostrar el QR
    };
  }

  // Endpoint para verificar el código durante el login
  @Post('verify')
  async verify2FA(@Body() body: { secret: string; token: string }) {
    const isValid = this.twoFactorService.verifyCode(body.secret, body.token);
    if (!isValid) {
      throw new UnauthorizedException('Código 2FA inválido');
    }
    return { valid: true };
  }
}