import { MntUsers } from './mntUsers.entity';
export declare class MntRestoreAccount {
    id: string;
    dataTimeExpiration: Date;
    ip: string;
    linkRestore: string;
    tokenRestore: string;
    active: boolean;
    createAt: Date;
    updateAt: Date;
    deletedAt: Date;
    user: MntUsers;
}
