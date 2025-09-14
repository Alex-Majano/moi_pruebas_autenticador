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
exports.MenuService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const MntMenu_entity_1 = require("../entities/MntMenu.entity");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const moment = require("moment-timezone");
const mntModules_entity_1 = require("../entities/mntModules.entity");
const mntEtiquetas_entity_1 = require("../entities/mntEtiquetas.entity");
const userSession_class_1 = require("../../common/class/userSession.class");
const mntPermissionsModules_entity_1 = require("../entities/mntPermissionsModules.entity");
let MenuService = class MenuService {
    constructor(menuRepository, dataSource, sessionUser) {
        this.menuRepository = menuRepository;
        this.dataSource = dataSource;
        this.sessionUser = sessionUser;
    }
    async findAll() {
        try {
            const array = [];
            const menu = [
                {
                    label: 'Inicio',
                    icon: 'pi pi-home',
                    to: '/',
                    items: [],
                },
                {
                    label: 'Requisiciones',
                    icon: 'pi pi-home',
                    to: '/',
                    items: [],
                },
                {
                    label: 'Mantenimiento',
                    icon: 'pi pi-home',
                    to: '/',
                    items: [],
                },
                {
                    label: 'Reportes',
                    icon: 'pi pi-home',
                    to: '/',
                    items: [],
                },
            ];
            const idUsuario = this.sessionUser.idUser;
            const repositoryEtiqueta = await this.dataSource
                .getRepository(mntEtiquetas_entity_1.MntEtiquetas)
                .createQueryBuilder('mnt_etiquetas')
                .select([
                'mnt_etiquetas.id',
                'mnt_etiquetas.nombre',
                'mnt_etiquetas.visible',
                'mnt_etiquetas.activo',
                'mnt_etiquetas.prioridad',
                'mnt_etiquetas.icono',
            ])
                .distinct(true)
                .innerJoin('mnt_etiquetas.etiquetaMenu', 'mnt_menu')
                .innerJoin('mnt_menu.modulos', 'mnt_modulo')
                .innerJoin('mnt_modulo.permissionUser', 'mnt_permisos_usuario')
                .innerJoin('mnt_permisos_usuario.user', 'mnt_usuarios')
                .where('mnt_menu.activo is true')
                .andWhere('mnt_menu.visible is true')
                .andWhere('mnt_usuarios.id = :idUsuario', {
                idUsuario,
            })
                .andWhere('mnt_etiquetas.visible is true')
                .andWhere('mnt_modulo.visible is true')
                .andWhere('mnt_modulo.active is true')
                .andWhere('mnt_modulo.frontend is true')
                .orderBy('mnt_etiquetas.prioridad', 'ASC')
                .getRawMany();
            for (const elementEtiqueta in repositoryEtiqueta) {
                const dataEtiqueta = repositoryEtiqueta[elementEtiqueta];
                const idEtiqueta = dataEtiqueta['mnt_etiquetas_id'];
                const nombreEtiqueta = dataEtiqueta['mnt_etiquetas_nombre'];
                const iconoEtiqueta = dataEtiqueta['mnt_etiquetas_icono'];
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
                    .innerJoin('mnt_modulo.permissionUser', 'mnt_permisos_usuario')
                    .innerJoin('mnt_permisos_usuario.user', 'mnt_usuarios')
                    .where('mnt_menu.activo is true')
                    .andWhere('mnt_menu.visible is true')
                    .andWhere('mnt_menu.activo is true')
                    .andWhere('mnt_usuarios.id = :idUsuario', {
                    idUsuario,
                })
                    .andWhere('mnt_menu.id_etiqueta = :idEtiqueta', {
                    idEtiqueta,
                })
                    .andWhere('mnt_modulo.visible is true')
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
                    const repositoryModulo = await this.dataSource
                        .getRepository(mntModules_entity_1.MntModules)
                        .createQueryBuilder('mnt_modulo')
                        .select([
                        'mnt_modulo.id',
                        'mnt_modulo.name',
                        'mnt_modulo.visible',
                        'mnt_modulo.active',
                        'mnt_modulo.icono',
                        'mnt_modulo.filename',
                        'mnt_modulo.isFather',
                        'mnt_modulo.priority',
                    ])
                        .distinct(true)
                        .innerJoin('mnt_modulo.permissionUser', 'mnt_permisos_usuario')
                        .innerJoin('mnt_permisos_usuario.user', 'mnt_usuarios')
                        .andWhere('mnt_usuarios.id = :idUsuario', {
                        idUsuario: idUsuario,
                    })
                        .andWhere('mnt_modulo.id_menu = :menuId', {
                        menuId: idMenu,
                    })
                        .andWhere('mnt_modulo.visible is true')
                        .andWhere('mnt_modulo.active is true')
                        .andWhere('mnt_modulo.frontend is true')
                        .orderBy('mnt_modulo.priority', 'ASC')
                        .getRawMany();
                    for (const modulo in repositoryModulo) {
                        const filenameModulo = repositoryModulo[modulo]['mnt_modulo_filename'];
                        const newItem = {
                            label: nombreMenu,
                            to: filenameModulo,
                            icon: iconoMenu,
                        };
                        arrayGeneral.push(newItem);
                        array.push(newItem);
                    }
                }
                const newArrayOther = {
                    label: nombreEtiqueta,
                    icon: iconoEtiqueta,
                    items: arrayGeneral,
                };
                menu.push(newArrayOther);
            }
            return menu;
        }
        catch (error) {
            throw new common_1.NotFoundException('No se encontráron registros pasando esos parámetros' + error, error);
        }
    }
    async createEtiqueta(data) {
        const repo = this.dataSource.getRepository(mntEtiquetas_entity_1.MntEtiquetas);
        return await repo.save(Object.assign({ id: (0, uuid_1.v4)(), createAt: moment().tz('America/El_Salvador').format() }, data));
    }
    async createMenu(data) {
        const repo = this.dataSource.getRepository(MntMenu_entity_1.MntMenu);
        return await repo.save(Object.assign(Object.assign({ id: (0, uuid_1.v4)(), etiqueta: { id: data.idEtiqueta } }, data), { createAt: moment().tz('America/El_Salvador').format() }));
    }
    async createModule(data) {
        const repo = this.dataSource.getRepository(mntModules_entity_1.MntModules);
        return await repo.save(Object.assign(Object.assign({ id: (0, uuid_1.v4)(), menu: { id: data.idMenu }, padre: { id: data.idPadre } }, data), { createAt: moment().tz('America/El_Salvador').format() }));
    }
    async createPermisosModulos(data) {
        const repo = this.dataSource.getRepository(mntPermissionsModules_entity_1.MntPermissionModules);
        return await repo.save({
            id: (0, uuid_1.v4)(),
            moduleView: { id: data.idVista },
            moduleEndpoint: { id: data.idEndpoint },
        });
    }
    async createPermisosArrayModulos(idVista, endpoints) {
        const repo = this.dataSource.getRepository(mntPermissionsModules_entity_1.MntPermissionModules);
        for (const endpoint of endpoints) {
            await repo.save({
                id: (0, uuid_1.v4)(),
                moduleView: { id: idVista },
                moduleEndpoint: { id: endpoint },
            });
        }
    }
};
exports.MenuService = MenuService;
exports.MenuService = MenuService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(MntMenu_entity_1.MntMenu)),
    __param(1, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource,
        userSession_class_1.classSessionUser])
], MenuService);
//# sourceMappingURL=menu.service.js.map