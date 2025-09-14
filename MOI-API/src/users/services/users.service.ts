import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import {
  DataSource,
  FindManyOptions,
  FindOptionsWhere,
  ILike,
  Repository,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment-timezone';
import { v4 as uuidv4 } from 'uuid';

import { MntRestoreAccount, MntRolUser, MntUsers } from '../entities';
import { paginationUsersDTO } from '@users/dtos/users-pagination.dto';
import { createUserDTO, updateUserDTO } from '@users/dtos/users.dto';
import { RolsService } from '@users/services/rols.service';
import { MntPermissionsUser } from '@auth/entities/MntPermissionsUser.entity';
import { MntPermissionModules } from '@modules/entities/mntPermissionsModules.entity';
import { ModulesService } from '@modules/services/modules.service';
import { PermissionsService } from '@auth/services/permissions.service';
import { MntPermissionsRol } from '@auth/entities/MntPermissionsRol.entity';
import { MntModules } from '@modules/entities/mntModules.entity';
import { IChangePassword } from '@users/interfaces/change-password.interface';
import { RestoreAccountService } from '@users/services/restore-account.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(MntUsers)
    private readonly usersRepository: Repository<MntUsers>,
    private readonly rolService: RolsService,
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly moduleService: ModulesService,
    private readonly permissionsService: PermissionsService,
    private readonly restoreAccountService: RestoreAccountService,
  ) {}

  async findAll(params: paginationUsersDTO) {
    const { take, page, pagination, directionOrder, email } = params; // ✅ CORREGIDO: pagination

    const findOptions: FindManyOptions<MntUsers> = {};
    const where: FindOptionsWhere<MntUsers> = {};

    if (email) where.email = ILike(`%${email || ''}%`);

    if (pagination) { // ✅ CORREGIDO
      findOptions.take = take;
      findOptions.skip = take * (page - 1);
    }

    if (directionOrder) findOptions.order = { email: directionOrder };

    findOptions.relations = { rol: true };
    findOptions.select = { rol: { id: true, name: true } };
    findOptions.where = where;

    const [users, count] = await this.usersRepository.findAndCount(findOptions);
    return {
      users,
      pagination: {
        limit: pagination ? take : count, // ✅ CORREGIDO
        offset: pagination ? page : 1, // ✅ CORREGIDO
        total: count,
      },
    };
  }

  async findByEmail(email: string): Promise<MntUsers> {
    return await this.usersRepository.findOne({
      where: { email },
      relations: { rol: true },
    });
  }

  async findOne(id: string): Promise<MntUsers> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: {
        rol: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async create(createUserDTO: createUserDTO): Promise<MntUsers> {
    const { idRol, password, email } = createUserDTO;

    await this.rolService.findOne(idRol);

    if (await this.findByEmail(email)) {
      throw new BadRequestException('Email already exists');
    }

    const hashPassword: string = await bcrypt.hash(password, 10);

    const user = this.usersRepository.create({
      id: uuidv4(),
      password: hashPassword,
      email,
      rol: { id: idRol },
      createAt: moment().tz('America/El_Salvador').format(),
    });

    await this.usersRepository.save(user);

    return user;
  }

  async update(id: string, updateUserDTO: updateUserDTO | any): Promise<MntUsers> {
    try {
      const { idRol, email, ...otherFields } = updateUserDTO;
      const oldUser = await this.findOne(id);

      // ✅ VERIFICACIÓN MEJORADA: Asegurar que hay datos para actualizar
      const hasFieldsToUpdate = idRol || email || Object.keys(otherFields).length > 0;
      
      if (!hasFieldsToUpdate) {
        throw new BadRequestException('No se proporcionaron datos para actualizar');
      }

      if (email && email !== oldUser.email) {
        if (await this.findByEmail(email)) {
          throw new BadRequestException('Email already exists');
        }
      }

      // Si se está actualizando el rol, validar que exista
      if (idRol) {
        await this.rolService.findOne(idRol);
      }

      // ✅ CONSTRUIR updateData DE FORMA MÁS FLEXIBLE
      const updateData: any = {};

      // Agregar campos adicionales (como two_factor_secret)
      if (Object.keys(otherFields).length > 0) {
        Object.assign(updateData, otherFields);
      }

      // Solo agregar rol si se está actualizando
      if (idRol) {
        updateData.rol = { id: idRol };
      }

      // Solo agregar email si se está actualizando
      if (email) {
        updateData.email = email;
      }

      // Siempre agregar la fecha de actualización
      updateData.updateAt = moment().tz('America/El_Salvador').format();

      // ✅ VERIFICACIÓN: Asegurar que updateData no esté vacío
      if (Object.keys(updateData).length === 0) {
        throw new BadRequestException('No se proporcionaron datos válidos para actualizar');
      }

      // ✅ DEBUG: Mostrar lo que se va a actualizar
      console.log('🔄 Actualizando usuario ID:', id);
      console.log('📦 Datos de actualización:', updateData);

      // ✅ USAR update() CORRECTAMENTE con criterio WHERE
      await this.usersRepository.update(
        { id: id }, // ← CRITERIO WHERE (IMPORTANTE)
        updateData   // ← DATOS A ACTUALIZAR
      );

      return await this.findOne(id);
    } catch (error) {
      console.error('❌ Error en update:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);
    await this.usersRepository.softDelete(id);
  }

  /**
   * Esta funcion servira para poder actualizar los permisos
   * de un usuario en especifico
   */
  async permisos(id: string, array: string) {
    const usuario = await this.findOne(id);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const rol: MntRolUser = await this.rolService.findOne(usuario.rol.id);
      const permisosTipoUsuario: MntPermissionsRol[] =
        await this.permissionsService.findPermissionUserByRol(rol.id);
      const arrayPermisosTipoUsuario: any[] = [];
      for (const element of permisosTipoUsuario) {
        arrayPermisosTipoUsuario.push(element.module.id);
      }
      const arrayNew: any = JSON.parse(array);
      const arrayPadre: Array<MntPermissionsUser> = [];
      await queryRunner.manager.delete(MntPermissionsUser, {
        user: usuario,
      });
      const arrayModulos: string[] = [];
      const arrayModulosFinal: string[] = [];

      for (const key in arrayNew) {
        if (Object.prototype.hasOwnProperty.call(arrayNew, key)) {
          const element: any = arrayNew[key];
          arrayModulos.push(element);
          arrayModulosFinal.push(element);
        }
      }
      for (const moduloId of arrayModulos) {
        const repositoryEtiqueta: any[] = await this.dataSource
          .getRepository(MntPermissionModules)
          .createQueryBuilder('mnt_permisos_modulos')
          .innerJoin('mnt_permisos_modulos.moduleView', 'mnt_modulo')
          .select(['mnt_permisos_modulos.id_modulo_endpoint'])
          .distinct(true)
          .where('mnt_modulo.id = :idVista', {
            idVista: moduloId,
          })
          .getRawMany();
        for (const idModAgregar of repositoryEtiqueta) {
          arrayModulosFinal.push(idModAgregar['id_modulo_endpoint']);
        }
      }
      for (const moduloId of arrayModulosFinal) {
        const moduloRegister: MntModules =
          await this.moduleService.findById(moduloId);
        let asignadoEspecialVar: boolean = false;
        if (arrayPermisosTipoUsuario.indexOf(moduloRegister.id) == -1) {
          asignadoEspecialVar = true;
        }
        const arrayHijo: MntPermissionsUser = {
          id: uuidv4(),
          user: usuario,
          module: moduloRegister,
          specialAssignee: asignadoEspecialVar,
          createAt: moment().tz('America/El_Salvador').format(),
          updateAt: undefined,
        };
        arrayPadre.push(arrayHijo);
      }
      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(MntPermissionsUser)
        .values(arrayPadre)
        .execute();
      await queryRunner.commitTransaction();
      return usuario;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new NotFoundException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async findAllByRol(id: string) {
    return await this.usersRepository.find({
      where: {
        rol: { id },
      },
    });
  }

  async findPermissionsById(id: string) {
    const user = await this.findOne(id);
    const permisos = await this.permissionsService.permisosByUser(id);

    return {
      permisos,
      user: user.email,
    };
  }

  async changePasswordReset(payload: IChangePassword) {
    if (payload.newPassword != payload.repeatPassword) {
      throw new BadRequestException('Las contraseñas enviadas no coinciden.');
    } else {
      const tokenRegister = await this.restoreAccountService.searchToken(
        payload.tokenReset,
      );
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
        const hashPassword = await bcrypt.hash(payload.newPassword, 10);
        const user = await queryRunner.manager.update(
          MntUsers,
          {
            id: tokenRegister.usuarioId,
          },
          {
            password: hashPassword,
          },
        );
        await queryRunner.manager.update(
          MntRestoreAccount,
          {
            id: tokenRegister.recuperacion_cuenta_id,
          },
          {
            active: false,
          },
        );
        await queryRunner.commitTransaction();
        return user;
      } catch (err) {
        await queryRunner.rollbackTransaction();
        throw new NotFoundException('Error al cambiar la contraseña.' + err);
      } finally {
        await queryRunner.release();
      }
    }
  }
}