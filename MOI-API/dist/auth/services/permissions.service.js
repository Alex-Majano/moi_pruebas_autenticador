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
exports.PermissionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const MntPermissionsUser_entity_1 = require("../entities/MntPermissionsUser.entity");
const typeorm_2 = require("typeorm");
const MntPermissionsRol_entity_1 = require("../entities/MntPermissionsRol.entity");
const mntEtiquetas_entity_1 = require("../../modules/entities/mntEtiquetas.entity");
const MntMenu_entity_1 = require("../../modules/entities/MntMenu.entity");
const mntModules_entity_1 = require("../../modules/entities/mntModules.entity");
const userSession_class_1 = require("../../common/class/userSession.class");
let PermissionsService = class PermissionsService {
    constructor(usersPermissionsRepository, rolPermissionsRepository, dataSource, sessionUser) {
        this.usersPermissionsRepository = usersPermissionsRepository;
        this.rolPermissionsRepository = rolPermissionsRepository;
        this.dataSource = dataSource;
        this.sessionUser = sessionUser;
    }
    async findPermissionsToUser(idUser, path, method) {
        path = path.split('/api/v1')[1];
        if (!path.startsWith('/menu') && !path.startsWith('/auth')) {
            const permiso = await this.usersPermissionsRepository
                .createQueryBuilder('mnt_permissions_users')
                .select(['mnt_permissions_users.id'])
                .innerJoin('mnt_permissions_users.user', 'mnt_users')
                .innerJoin('mnt_permissions_users.module', 'mnt_module')
                .where('mnt_users.id = :idUser', {
                idUser,
            })
                .andWhere('mnt_module.filename = :filename', { filename: path })
                .andWhere('mnt_module.method = :method', { method })
                .getOne();
            if (!permiso)
                throw new common_1.ForbiddenException('You do not have permission to access this route');
        }
    }
    async findPermissionUserByRol(id) {
        return await this.rolPermissionsRepository.find({
            where: {
                rol: { id },
            },
            relations: {
                module: true,
            },
        });
    }
    async permisosByUser(id) {
        const permisos = [];
        const repositoryEtiqueta = await this.dataSource
            .getRepository(mntEtiquetas_entity_1.MntEtiquetas)
            .createQueryBuilder('mnt_etiquetas')
            .select([
            'mnt_etiquetas.id',
            'mnt_etiquetas.nombre',
            'mnt_etiquetas.visible',
            'mnt_etiquetas.activo',
            'mnt_etiquetas.prioridad',
        ])
            .distinct(true)
            .innerJoin('mnt_etiquetas.etiquetaMenu', 'mnt_menu')
            .innerJoin('mnt_menu.modulos', 'mnt_modulo')
            .where('mnt_etiquetas.activo is true')
            .andWhere('mnt_menu.activo is true')
            .andWhere('mnt_modulo.active is true')
            .andWhere('mnt_modulo.frontend is true')
            .orderBy('mnt_etiquetas.prioridad', 'ASC')
            .getRawMany();
        for (const elementEtiqueta in repositoryEtiqueta) {
            const dataEtiqueta = repositoryEtiqueta[elementEtiqueta];
            const idEtiqueta = dataEtiqueta['mnt_etiquetas_id'];
            const nombreEtiqueta = dataEtiqueta['mnt_etiquetas_nombre'];
            const repositoryMenu = await this.dataSource
                .getRepository(MntMenu_entity_1.MntMenu)
                .createQueryBuilder('mnt_menu')
                .select([
                'mnt_menu.id',
                'mnt_menu.nombre',
                'mnt_menu.visible',
                'mnt_menu.activo',
                'mnt_menu.icono',
                'mnt_menu.filename',
                'mnt_menu.admin',
                'mnt_menu.super_admin',
                'mnt_menu.prioridad',
            ])
                .distinct(true)
                .innerJoin('mnt_menu.modulos', 'mnt_modulo')
                .where('mnt_menu.activo is true')
                .andWhere('mnt_menu.id_etiqueta = :idetiqueta', {
                idetiqueta: idEtiqueta,
            })
                .andWhere('mnt_modulo.active is true')
                .andWhere('mnt_modulo.frontend is true')
                .orderBy('mnt_menu.prioridad', 'ASC')
                .getRawMany();
            const arrayGeneral = [];
            for (const element in repositoryMenu) {
                const data = repositoryMenu[element];
                const idMenu = data['mnt_menu_id'];
                const nombreMenu = data['mnt_menu_nombre'];
                const iconoMenu = data['mnt_menu_icono'];
                const itemsArray = [];
                const repositoryModulo = await this.dataSource
                    .getRepository(mntModules_entity_1.MntModules)
                    .createQueryBuilder('mnt_modulo')
                    .select([
                    'mnt_modulo.id',
                    'mnt_modulo.name',
                    'mnt_modulo.visible',
                    'mnt_modulo.active as activo',
                    'mnt_modulo.icono',
                    'mnt_modulo.filename',
                    'mnt_modulo.isFather',
                    'mnt_modulo.priority as prioridad',
                    'mnt_permisos_usuario.id_usuario as idPermisoUsuario',
                ])
                    .distinct(true)
                    .leftJoin('mnt_modulo.permissionUser', 'mnt_permisos_usuario', 'mnt_permisos_usuario.id_usuario = :usuarioId', {
                    usuarioId: id,
                })
                    .leftJoin('mnt_permisos_usuario.user', 'mnt_usuarios')
                    .andWhere('mnt_modulo.id_menu = :menuId', {
                    menuId: idMenu,
                })
                    .andWhere('mnt_modulo.active is true')
                    .andWhere('mnt_modulo.frontend is true')
                    .orderBy('mnt_modulo.priority', 'ASC')
                    .getRawMany();
                let activo_completo = true;
                for (const modulo in repositoryModulo) {
                    const idModulo = repositoryModulo[modulo]['mnt_modulo_id'];
                    const nombreModulo = repositoryModulo[modulo]['mnt_modulo_nombre'];
                    const iconoModulo = repositoryModulo[modulo]['mnt_modulo_icono'];
                    const idPermisoUsuario = repositoryModulo[modulo]['idpermisousuario'];
                    const filenameModulo = repositoryModulo[modulo]['mnt_modulo_filename'];
                    const newItem = {
                        activo: !!idPermisoUsuario,
                        idModulo: idModulo,
                        label: nombreModulo,
                        to: filenameModulo,
                        icon: iconoModulo,
                    };
                    if (!idPermisoUsuario) {
                        activo_completo = false;
                    }
                    itemsArray.push(newItem);
                }
                const newArray = {
                    id: idMenu,
                    label: nombreMenu,
                    icon: iconoMenu,
                    items: itemsArray,
                    activo_completo: activo_completo,
                };
                arrayGeneral.push(newArray);
            }
            const newArrayOther = {
                label: nombreEtiqueta,
                items: arrayGeneral,
            };
            permisos.push(newArrayOther);
        }
        return permisos;
    }
    async permisosByRol(id) {
        const permisos = [];
        const repositoryEtiqueta = await this.dataSource
            .getRepository(mntEtiquetas_entity_1.MntEtiquetas)
            .createQueryBuilder('mnt_etiquetas')
            .select([
            'mnt_etiquetas.id',
            'mnt_etiquetas.nombre',
            'mnt_etiquetas.visible',
            'mnt_etiquetas.activo',
            'mnt_etiquetas.prioridad',
        ])
            .distinct(true)
            .innerJoin('mnt_etiquetas.etiquetaMenu', 'mnt_menu')
            .innerJoin('mnt_menu.modulos', 'mnt_modulo')
            .where('mnt_etiquetas.activo is true')
            .andWhere('mnt_menu.activo is true')
            .andWhere('mnt_modulo.active is true')
            .andWhere('mnt_modulo.frontend is true')
            .orderBy('mnt_etiquetas.prioridad', 'ASC')
            .getRawMany();
        for (const elementEtiqueta in repositoryEtiqueta) {
            const dataEtiqueta = repositoryEtiqueta[elementEtiqueta];
            const idEtiqueta = dataEtiqueta['mnt_etiquetas_id'];
            const nombreEtiqueta = dataEtiqueta['mnt_etiquetas_nombre'];
            const repositoryMenu = await this.dataSource
                .getRepository(MntMenu_entity_1.MntMenu)
                .createQueryBuilder('mnt_menu')
                .select([
                'mnt_menu.id',
                'mnt_menu.nombre',
                'mnt_menu.visible',
                'mnt_menu.activo',
                'mnt_menu.icono',
                'mnt_menu.filename',
                'mnt_menu.admin',
                'mnt_menu.superAdmin',
                'mnt_menu.prioridad',
            ])
                .distinct(true)
                .innerJoin('mnt_menu.modulos', 'mnt_modulo')
                .where('mnt_menu.activo is true')
                .andWhere('mnt_menu.id_etiqueta = :idetiqueta', {
                idetiqueta: idEtiqueta,
            })
                .andWhere('mnt_modulo.active is true')
                .andWhere('mnt_modulo.frontend is true')
                .orderBy('mnt_menu.prioridad', 'ASC')
                .getRawMany();
            const arrayGeneral = [];
            for (const element in repositoryMenu) {
                const data = repositoryMenu[element];
                const idMenu = data['mnt_menu_id'];
                const nombreMenu = data['mnt_menu_nombre'];
                const iconoMenu = data['mnt_menu_icono'];
                const itemsArray = [];
                const repositoryModulo = await this.dataSource
                    .getRepository(mntModules_entity_1.MntModules)
                    .createQueryBuilder('mnt_modulo')
                    .select([
                    'mnt_modulo.id',
                    'mnt_modulo.name',
                    'mnt_modulo.visible',
                    'mnt_modulo.active as activo',
                    'mnt_modulo.icono',
                    'mnt_modulo.filename',
                    'mnt_modulo.isFather',
                    'mnt_modulo.priority as prioridad',
                    'mnt_permisos_rol.id_rol as id_permiso_rol',
                ])
                    .distinct(true)
                    .leftJoin('mnt_modulo.permissionRol', 'mnt_permisos_rol', 'mnt_permisos_rol.id_rol = :rolId', {
                    rolId: id,
                })
                    .leftJoin('mnt_permisos_rol.rol', 'mnt_rol_usuarios')
                    .andWhere('mnt_modulo.id_menu = :menuId', {
                    menuId: idMenu,
                })
                    .andWhere('mnt_modulo.active is true')
                    .andWhere('mnt_modulo.frontend is true')
                    .orderBy('mnt_modulo.priority', 'ASC')
                    .getRawMany();
                let activo_completo = true;
                for (const modulo in repositoryModulo) {
                    const idModulo = repositoryModulo[modulo]['mnt_modulo_id'];
                    const nombreModulo = repositoryModulo[modulo]['mnt_modulo_nombre'];
                    const iconoModulo = repositoryModulo[modulo]['mnt_modulo_icono'];
                    const idPermisoRol = repositoryModulo[modulo]['id_permiso_rol'];
                    const filenameModulo = repositoryModulo[modulo]['mnt_modulo_filename'];
                    const newItem = {
                        activo: !!idPermisoRol,
                        idModulo: idModulo,
                        label: nombreModulo,
                        to: filenameModulo,
                        icon: iconoModulo,
                    };
                    if (!idPermisoRol) {
                        activo_completo = false;
                    }
                    itemsArray.push(newItem);
                }
                const newArray = {
                    id: idMenu,
                    label: nombreMenu,
                    icon: iconoMenu,
                    items: itemsArray,
                    activo_completo: activo_completo,
                };
                arrayGeneral.push(newArray);
            }
            const newArrayOther = {
                label: nombreEtiqueta,
                items: arrayGeneral,
            };
            permisos.push(newArrayOther);
        }
        return permisos;
    }
    async hassPermission(name) {
        const object = name['data'];
        const dataReturn = [];
        for (const value in object) {
            const nameValue = Object.values(object[value]);
            const keyValue = Object.keys(object[value]);
            const idUsuario = this.sessionUser.idUser;
            const repositoryMenu = await this.dataSource
                .getRepository(MntMenu_entity_1.MntMenu)
                .createQueryBuilder('mnt_menu')
                .select([
                'mnt_menu.id',
                'mnt_menu.nombre',
                'mnt_menu.visible',
                'mnt_menu.activo',
                'mnt_menu.icono',
                'mnt_menu.filename',
                'mnt_menu.admin',
                'mnt_menu.superAdmin as superAdmin',
                'mnt_menu.prioridad',
            ])
                .distinct(true)
                .innerJoin('mnt_menu.modulos', 'mnt_modulo')
                .innerJoin('mnt_modulo.permissionUser', 'mnt_permisos_usuario')
                .innerJoin('mnt_permisos_usuario.user', 'mnt_usuarios')
                .where('mnt_menu.activo is true')
                .andWhere('mnt_usuarios.id = :idUsuario', {
                idUsuario: idUsuario,
            })
                .andWhere('mnt_modulo.filename = :filename', {
                filename: nameValue[0],
            })
                .andWhere('mnt_modulo.active is true')
                .andWhere('mnt_modulo.frontend is true')
                .orderBy('mnt_menu.prioridad', 'ASC')
                .getRawMany();
            if (repositoryMenu.length > 0) {
                dataReturn.push({
                    keyValue: keyValue[0],
                    status: true,
                });
            }
            else {
                dataReturn.push({
                    keyValue: keyValue[0],
                    status: false,
                });
            }
        }
        return dataReturn;
    }
};
exports.PermissionsService = PermissionsService;
exports.PermissionsService = PermissionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(MntPermissionsUser_entity_1.MntPermissionsUser)),
    __param(1, (0, typeorm_1.InjectRepository)(MntPermissionsRol_entity_1.MntPermissionsRol)),
    __param(2, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource,
        userSession_class_1.classSessionUser])
], PermissionsService);
//# sourceMappingURL=permissions.service.js.map