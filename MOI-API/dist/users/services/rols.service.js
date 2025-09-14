"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../entities");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const moment = require("moment-timezone");
const users_service_1 = require("./users.service");
const MntPermissionsUser_entity_1 = require("../../auth/entities/MntPermissionsUser.entity");
const MntPermissionsRol_entity_1 = require("../../auth/entities/MntPermissionsRol.entity");
const mntPermissionsModules_entity_1 = require("../../modules/entities/mntPermissionsModules.entity");
const modules_service_1 = require("../../modules/services/modules.service");
const permissions_service_1 = require("../../auth/services/permissions.service");
let RolsService = class RolsService {
    constructor(rolRepository, dataSource, moduleServices, usersService, permissionsService) {
        this.rolRepository = rolRepository;
        this.dataSource = dataSource;
        this.moduleServices = moduleServices;
        this.usersService = usersService;
        this.permissionsService = permissionsService;
    }
    async findAll(params) {
        const { take, page, pagination, directionOrder, orderField, name, search } = params;
        const findOptions = {};
        const where = {};
        if (name || search)
            where.name = (0, typeorm_2.ILike)(`%${name || ''}%`);
        if (pagination) {
            findOptions.take = take;
            findOptions.skip = take * (page - 1);
        }
        if (directionOrder && orderField)
            findOptions.order = { [orderField]: directionOrder };
        const [roles, count] = await this.rolRepository.findAndCount(findOptions);
        return {
            data: roles,
            pagination: {
                limit: pagination ? take : count,
                offset: pagination ? page : 1,
                total: count,
            },
        };
    }
    async findOne(id) {
        const rol = await this.rolRepository.findOne({ where: { id } });
        if (!rol) {
            throw new common_1.NotFoundException('Rol not found');
        }
        return rol;
    }
    async permisos(id, array) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const tipoUsuario = await this.findOne(id);
            const arrayNew = JSON.parse(array);
            const usersChanged = await this.usersService.findAllByRol(id);
            const arrayPadre = [];
            const arrayPadreRol = [];
            await queryRunner.manager.delete(MntPermissionsRol_entity_1.MntPermissionsRol, {
                specialAssignee: false,
                rol: tipoUsuario,
            });
            const arrayModulos = [];
            const arrayModulosFinal = [];
            for (const key in arrayNew) {
                if (Object.prototype.hasOwnProperty.call(arrayNew, key)) {
                    const element = arrayNew[key];
                    arrayModulos.push(element);
                    arrayModulosFinal.push(element);
                }
            }
            for (const moduloId of arrayModulos) {
                const repositoryEtiqueta = await this.dataSource
                    .getRepository(mntPermissionsModules_entity_1.MntPermissionModules)
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
                const moduloRegister = await this.moduleServices.findById(moduloId);
                const arrayHijoRol = {
                    specialAssignee: false,
                    module: moduloRegister,
                    rol: tipoUsuario,
                    id: (0, uuid_1.v4)(),
                    createAt: moment().tz('America/El_Salvador').format(),
                    updateAt: undefined,
                };
                arrayPadreRol.push(arrayHijoRol);
            }
            for (const usuarioRegister of usersChanged) {
                await queryRunner.manager.delete(MntPermissionsUser_entity_1.MntPermissionsUser, {
                    specialAssignee: false,
                    user: usuarioRegister,
                });
                for (const moduloId of arrayModulosFinal) {
                    const moduloRegister = await this.moduleServices.findById(moduloId);
                    const arrayHijo = {
                        user: usuarioRegister,
                        module: moduloRegister,
                        specialAssignee: false,
                        id: (0, uuid_1.v4)(),
                        createAt: moment().tz('America/El_Salvador').format(),
                        updateAt: undefined,
                    };
                    arrayPadre.push(arrayHijo);
                }
            }
            await queryRunner.manager
                .createQueryBuilder()
                .insert()
                .into(MntPermissionsUser_entity_1.MntPermissionsUser)
                .values(arrayPadre)
                .execute();
            await queryRunner.manager
                .createQueryBuilder()
                .insert()
                .into(MntPermissionsRol_entity_1.MntPermissionsRol)
                .values(arrayPadreRol)
                .execute();
            await queryRunner.commitTransaction();
            return tipoUsuario;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new common_1.BadRequestException(error);
        }
        finally {
            await queryRunner.release();
        }
    }
    async findPermissionsById(id) {
        const { name } = await this.findOne(id);
        const permisos = await this.permissionsService.permisosByRol(id);
        return {
            rol: name,
            permisos,
        };
    }
};
exports.RolsService = RolsService;
exports.RolsService = RolsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.MntRolUser)),
    __param(1, (0, typeorm_1.InjectDataSource)()),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource,
        modules_service_1.ModulesService,
        users_service_1.UsersService,
        permissions_service_1.PermissionsService])
], RolsService);
//# sourceMappingURL=rols.service.js.map