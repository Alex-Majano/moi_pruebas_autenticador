export declare class TwoFactorService {
    generateSecret(): string;
    generateQRCodeURL(secret: string, email: string, appName: string): string;
    generateQRCodeImage(url: string): Promise<string>;
    verifyCode(secret: string, token: string): boolean;
}
