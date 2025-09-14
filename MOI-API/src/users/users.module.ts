import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@auth/auth.module';
import { MntRestoreAccount, MntRolUser, MntUsers } from './entities';
import { UsersService } from './services/users.service';
import { ModulesModule } from '@modules/modules.module';
import { usersControllers } from '@users/controllers';
import { userServices } from '@users/services';
import { RestoreAccountService } from './services/restore-account.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => ModulesModule),
    TypeOrmModule.forFeature([MntUsers, MntRolUser, MntRestoreAccount]),
  ],
  controllers: [
    // Importar controladores necesarios para el manejo de usuarios
    ...usersControllers,
  ],
  providers: [...userServices],
  exports: [UsersService, RestoreAccountService],
})
export class UsersModule {}
