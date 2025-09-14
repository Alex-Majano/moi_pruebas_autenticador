import { Injectable } from '@nestjs/common';
import * as speakeasy from 'speakeasy';
import * as QRCode from 'qrcode';

@Injectable()
export class TwoFactorService {
  // Generar un secret único para el usuario
  generateSecret(): string {
    return speakeasy.generateSecret().base32;
  }

  // Generar URL para QR (para Google Authenticator)
  generateQRCodeURL(secret: string, email: string, appName: string): string {
    return speakeasy.otpauthURL({
      secret: secret,
      label: `${appName}:${email}`,  // ✅ FORMATO CORRECTO: "AppName:user@email.com"
      issuer: appName,
      encoding: 'base32',
    });
  }

  // Generar imagen QR a partir de la URL
  async generateQRCodeImage(url: string): Promise<string> {
    return await QRCode.toDataURL(url);
  }

  // Verificar el código de 6 dígitos
  verifyCode(secret: string, token: string): boolean {
    return speakeasy.totp.verify({
      secret: secret,
      token: token,
      encoding: 'base32',
      window: 1, // Permite un margen de error de 30 segundos (1 intervalo)
    });
  }
}