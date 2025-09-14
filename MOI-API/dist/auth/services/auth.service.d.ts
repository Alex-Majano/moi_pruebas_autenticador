import { UsersService } from '@users/services/users.service';
import { MntUsers } from '@users/entities';
import { TokenService } from './token.service';
import { IAuthUser } from '@auth/interfaces/authUser.interface';
import { RestoreAccountService } from '@users/services/restore-account.service';
import { EmailService } from '@email/services/email.service';
export declare class AuthService {
    private readonly usersService;
    private readonly tokenService;
    private readonly restoreAccountService;
    private readonly emailService;
    constructor(usersService: UsersService, tokenService: TokenService, restoreAccountService: RestoreAccountService, emailService: EmailService);
    validateUser(email: string, password: string): Promise<MntUsers>;
    login(user: MntUsers): Promise<{
        user: IAuthUser;
        token: string;
    } | {
        requires2fa: boolean;
        message: string;
        email: string;
        userId: string;
    }>;
    verify2FALogin(userId: string, token: string): Promise<{
        user: IAuthUser;
        token: string;
    }>;
    private verify2FACode;
    private generateAuthResponse;
    logout(user: MntUsers): Promise<void>;
    private formatUser;
    recoverPassword(id: string, ip: string): Promise<{
        message: string;
    }>;
    verifyRecoverPassword(token: string): Promise<any>;
}
