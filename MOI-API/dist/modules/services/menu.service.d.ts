import { MntMenu } from '@modules/entities/MntMenu.entity';
import { DataSource, Repository } from 'typeorm';
import { IMenu } from '@modules/interfaces/menu.interface';
import { classSessionUser } from '@common/class/userSession.class';
import { MntPermissionModules } from '@modules/entities/mntPermissionsModules.entity';
export declare class MenuService {
    private menuRepository;
    private dataSource;
    private readonly sessionUser;
    constructor(menuRepository: Repository<MntMenu>, dataSource: DataSource, sessionUser: classSessionUser);
    findAll(): Promise<IMenu[]>;
    createEtiqueta(data: any): Promise<any>;
    createMenu(data: any): Promise<any>;
    createModule(data: any): Promise<any>;
    createPermisosModulos(data: any): Promise<{
        id: string;
        moduleView: {
            id: any;
        };
        moduleEndpoint: {
            id: any;
        };
    } & MntPermissionModules>;
    createPermisosArrayModulos(idVista: string, endpoints: string[]): Promise<void>;
}
