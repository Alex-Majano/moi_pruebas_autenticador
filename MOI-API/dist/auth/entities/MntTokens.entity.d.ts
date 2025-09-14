import { MntUsers } from '@users/entities';
export declare class MntTokens {
    id: string;
    token: string;
    expirationTime: Date;
    refreshToken: string;
    refreshExpirationTime: Date;
    active: boolean;
    user: MntUsers;
    createAt: Date;
    updateAt: Date;
    deletedAt: Date;
}
