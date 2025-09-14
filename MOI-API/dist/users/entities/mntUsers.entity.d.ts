import { MntTokens } from 'src/auth/entities/MntTokens.entity';
import { MntPermissionsUser } from 'src/auth/entities/MntPermissionsUser.entity';
import { MntRestoreAccount } from './mntRestoreAccount.entity';
import { MntRolUser } from './mntRolUser.entity';
export declare class MntUsers {
    id: string;
    email: string;
    password: string;
    active: boolean;
    two_factor_secret: string;
    is_2fa_enabled: boolean;
    createAt: Date;
    updateAt: Date;
    deletedAt: Date;
    rol: MntRolUser;
    permissions: MntPermissionsUser[];
    tokens: MntTokens[];
    restoreAccount: MntRestoreAccount[];
}
