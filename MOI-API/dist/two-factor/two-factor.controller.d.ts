import { TwoFactorService } from './two-factor.service';
export declare class TwoFactorController {
    private readonly twoFactorService;
    constructor(twoFactorService: TwoFactorService);
    generate2FA(body: {
        email: string;
    }): Promise<{
        secret: string;
        qrImage: string;
    }>;
    verify2FA(body: {
        secret: string;
        token: string;
    }): Promise<{
        valid: boolean;
    }>;
}
