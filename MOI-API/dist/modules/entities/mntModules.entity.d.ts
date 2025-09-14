import { MntPermissionsRol } from '@auth/entities/MntPermissionsRol.entity';
import { MntPermissionsUser } from '@auth/entities/MntPermissionsUser.entity';
import { MntMenu } from '@modules/entities/MntMenu.entity';
export declare class MntModules {
    id: string;
    name: string;
    description: string;
    visible: boolean;
    active: boolean;
    icono: string;
    filename: string;
    method: string;
    isFather: boolean;
    priority: number;
    frontend: boolean;
    createAt: Date;
    updateAt: Date;
    deletedAt: Date;
    hijos: MntModules[];
    padre: MntModules;
    permissionRol: MntPermissionsRol[];
    permissionUser: MntPermissionsUser[];
    menu: MntMenu;
}
