import { UsersService } from '@users/services/users.service';
import { paginationUsersDTO } from '@users/dtos/users-pagination.dto';
import { createUserDTO, updateUserDTO } from '@users/dtos/users.dto';
import { createPermissionsDTO } from '@users/dtos/user-permissions.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(paramsUsers: paginationUsersDTO): Promise<{
        users: import("../entities").MntUsers[];
        pagination: {
            limit: number;
            offset: number;
            total: number;
        };
    }>;
    create(data: createUserDTO): Promise<import("../entities").MntUsers>;
    permisosById(id: string): Promise<{
        permisos: any[];
        user: string;
    }>;
    update(id: string, data: updateUserDTO): Promise<import("../entities").MntUsers>;
    findOne(id: string): Promise<import("../entities").MntUsers>;
    delete(id: string): Promise<void>;
    permisos(payload: createPermissionsDTO): Promise<import("../entities").MntUsers>;
}
