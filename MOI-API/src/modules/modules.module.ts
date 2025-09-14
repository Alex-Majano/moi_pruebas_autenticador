import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { modulesEntities } from '@modules/entities';

import { MenuService } from './services/menu.service';
import { ModulesService } from './services/modules.service';
import { MenuController } from './controllers/menu.controller';

@Module({
  imports: [TypeOrmModule.forFeature([...modulesEntities])],
  providers: [ModulesService, MenuService],
  exports: [ModulesService],
  controllers: [MenuController],
})
export class ModulesModule {}
