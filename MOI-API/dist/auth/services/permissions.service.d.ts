import { MntPermissionsUser } from '@auth/entities/MntPermissionsUser.entity';
import { DataSource, Repository } from 'typeorm';
import { MntPermissionsRol } from '@auth/entities/MntPermissionsRol.entity';
import { classSessionUser } from '@common/class/userSession.class';
export declare class PermissionsService {
    private readonly usersPermissionsRepository;
    private readonly rolPermissionsRepository;
    private readonly dataSource;
    private readonly sessionUser;
    constructor(usersPermissionsRepository: Repository<MntPermissionsUser>, rolPermissionsRepository: Repository<MntPermissionsRol>, dataSource: DataSource, sessionUser: classSessionUser);
    findPermissionsToUser(idUser: string, path: string, method: string): Promise<void>;
    findPermissionUserByRol(id: string): Promise<MntPermissionsRol[]>;
    permisosByUser(id: string): Promise<any[]>;
    permisosByRol(id: string): Promise<any[]>;
    hassPermission(name: any): Promise<any[]>;
}
