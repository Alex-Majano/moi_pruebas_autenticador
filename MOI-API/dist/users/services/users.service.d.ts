import { DataSource, Repository } from 'typeorm';
import { MntUsers } from '../entities';
import { paginationUsersDTO } from '@users/dtos/users-pagination.dto';
import { createUserDTO, updateUserDTO } from '@users/dtos/users.dto';
import { RolsService } from '@users/services/rols.service';
import { ModulesService } from '@modules/services/modules.service';
import { PermissionsService } from '@auth/services/permissions.service';
import { IChangePassword } from '@users/interfaces/change-password.interface';
import { RestoreAccountService } from '@users/services/restore-account.service';
export declare class UsersService {
    private readonly usersRepository;
    private readonly rolService;
    private readonly dataSource;
    private readonly moduleService;
    private readonly permissionsService;
    private readonly restoreAccountService;
    constructor(usersRepository: Repository<MntUsers>, rolService: RolsService, dataSource: DataSource, moduleService: ModulesService, permissionsService: PermissionsService, restoreAccountService: RestoreAccountService);
    findAll(params: paginationUsersDTO): Promise<{
        users: MntUsers[];
        pagination: {
            limit: number;
            offset: number;
            total: number;
        };
    }>;
    findByEmail(email: string): Promise<MntUsers>;
    findOne(id: string): Promise<MntUsers>;
    create(createUserDTO: createUserDTO): Promise<MntUsers>;
    update(id: string, updateUserDTO: updateUserDTO | any): Promise<MntUsers>;
    delete(id: string): Promise<void>;
    permisos(id: string, array: string): Promise<MntUsers>;
    findAllByRol(id: string): Promise<MntUsers[]>;
    findPermissionsById(id: string): Promise<{
        permisos: any[];
        user: string;
    }>;
    changePasswordReset(payload: IChangePassword): Promise<import("typeorm").UpdateResult>;
}
