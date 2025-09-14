import { RolsService } from '@users/services/rols.service';
import { createPermissionsDTO } from '@users/dtos/user-permissions.dto';
import { paginationRolsDTO } from '@users/dtos/rols-pagination.dto';
export declare class RolsController {
    private readonly rolService;
    constructor(rolService: RolsService);
    findAll(params: paginationRolsDTO): Promise<{
        data: import("../entities").MntRolUser[];
        pagination: {
            limit: number;
            offset: number;
            total: number;
        };
    }>;
    permisosById(id: string): Promise<{
        rol: string;
        permisos: any[];
    }>;
    get(id: string): Promise<import("../entities").MntRolUser>;
    permisos(payload: createPermissionsDTO): Promise<import("../entities").MntRolUser>;
}
