import { Request } from 'express';
import { AuthService } from '@auth/services/auth.service';
import { PermissionsService } from '@auth/services/permissions.service';
import { IChangePassword } from '@users/interfaces/change-password.interface';
import { UsersService } from '@users/services/users.service';
import { IRestorePassword } from '@auth/interfaces/restore-password.interface';
import { TwoFactorService } from '../../two-factor/two-factor.service';
export declare class AuthController {
    private readonly authService;
    private readonly permissionService;
    private readonly usersService;
    private readonly twoFactorService;
    constructor(authService: AuthService, permissionService: PermissionsService, usersService: UsersService, twoFactorService: TwoFactorService);
    login(req: Request): Promise<{
        user: import("../interfaces/authUser.interface").IAuthUser;
        token: string;
    } | {
        requires2fa: boolean;
        message: string;
        email: string;
        userId: string;
    }>;
    verify2FA(body: {
        userId: string;
        token: string;
    }): Promise<{
        user: import("../interfaces/authUser.interface").IAuthUser;
        token: string;
    }>;
    enable2FA(req: Request): Promise<{
        qrImage: string;
        secret: string;
        message: string;
    }>;
    verifyEnable2FA(req: Request, body: {
        token: string;
    }): Promise<{
        message: string;
        enabled: boolean;
    }>;
    disable2FA(req: Request): Promise<{
        message: string;
        enabled: boolean;
    }>;
    check2FAStatus(req: Request): Promise<{
        is_2fa_enabled: boolean;
        has_secret_configured: boolean;
    }>;
    hassPermission(data: string[]): Promise<any[]>;
    recuperarPassword(ip: string, id: string): Promise<{
        message: string;
    }>;
    reestablecerPassword(data: IRestorePassword): Promise<any>;
    changePasswordReset(payload: IChangePassword): Promise<import("typeorm").UpdateResult>;
}
