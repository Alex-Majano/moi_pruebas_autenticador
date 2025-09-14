import { MntUsers } from '@users/entities/mntUsers.entity';
import { MntModules } from '@modules/entities/mntModules.entity';
export declare class MntPermissionsUser {
    id: string;
    specialAssignee: boolean;
    module: MntModules;
    user: MntUsers;
    createAt: string;
    updateAt: string;
}
