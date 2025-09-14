import { MntRolUser } from '@users/entities';
import { DataSource, Repository } from 'typeorm';
import { UsersService } from './users.service';
import { paginationRolsDTO } from '@users/dtos/rols-pagination.dto';
import { ModulesService } from '@modules/services/modules.service';
import { PermissionsService } from '@auth/services/permissions.service';
export declare class RolsService {
    private readonly rolRepository;
    private readonly dataSource;
    private readonly moduleServices;
    private readonly usersService;
    private readonly permissionsService;
    constructor(rolRepository: Repository<MntRolUser>, dataSource: DataSource, moduleServices: ModulesService, usersService: UsersService, permissionsService: PermissionsService);
    findAll(params: paginationRolsDTO): Promise<{
        data: MntRolUser[];
        pagination: {
            limit: number;
            offset: number;
            total: number;
        };
    }>;
    findOne(id: string): Promise<MntRolUser>;
    permisos(id: string, array: string): Promise<MntRolUser>;
    findPermissionsById(id: string): Promise<{
        rol: string;
        permisos: any[];
    }>;
}
