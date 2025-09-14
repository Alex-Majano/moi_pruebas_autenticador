import { RolsService } from '@users/services/rols.service';
import { UsersService } from '@users/services/users.service';
import { RestoreAccountService } from '@users/services/restore-account.service';

export const userServices = [UsersService, RolsService, RestoreAccountService];
