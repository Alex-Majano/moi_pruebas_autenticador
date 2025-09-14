import { MntRolUser } from '@users/entities';
import { MntModules } from '@modules/entities/mntModules.entity';
export declare class MntPermissionsRol {
    id: string;
    specialAssignee: boolean;
    module: MntModules;
    rol: MntRolUser;
    createAt: string;
    updateAt: string;
}
