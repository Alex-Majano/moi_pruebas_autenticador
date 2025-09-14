import { MntUsers } from './mntUsers.entity';
import { MntPermissionsRol } from '@auth/entities/MntPermissionsRol.entity';
export declare class MntRolUser {
    id: string;
    name: string;
    description: string;
    active: boolean;
    createAt: Date;
    updateAt: Date;
    deletedAt: Date;
    users: MntUsers[];
    permissions: MntPermissionsRol[];
}
