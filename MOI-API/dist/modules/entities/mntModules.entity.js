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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MntModules = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const MntPermissionsRol_entity_1 = require("../../auth/entities/MntPermissionsRol.entity");
const MntPermissionsUser_entity_1 = require("../../auth/entities/MntPermissionsUser.entity");
const MntMenu_entity_1 = require("./MntMenu.entity");
let MntModules = class MntModules {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, visible: { required: true, type: () => Boolean }, active: { required: true, type: () => Boolean }, icono: { required: true, type: () => String }, filename: { required: true, type: () => String }, method: { required: true, type: () => String }, isFather: { required: true, type: () => Boolean }, priority: { required: true, type: () => Number }, frontend: { required: true, type: () => Boolean }, createAt: { required: true, type: () => Date }, updateAt: { required: true, type: () => Date }, deletedAt: { required: true, type: () => Date }, hijos: { required: true, type: () => [require("./mntModules.entity").MntModules] }, padre: { required: true, type: () => require("./mntModules.entity").MntModules }, permissionRol: { required: true, type: () => [require("../../auth/entities/MntPermissionsRol.entity").MntPermissionsRol] }, permissionUser: { required: true, type: () => [require("../../auth/entities/MntPermissionsUser.entity").MntPermissionsUser] }, menu: { required: true, type: () => require("./MntMenu.entity").MntMenu } };
    }
};
exports.MntModules = MntModules;
__decorate([
    (0, typeorm_1.PrimaryColumn)('text'),
    __metadata("design:type", String)
], MntModules.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, name: 'nombre' }),
    __metadata("design:type", String)
], MntModules.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'descripcion' }),
    __metadata("design:type", String)
], MntModules.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', nullable: true, default: true }),
    __metadata("design:type", Boolean)
], MntModules.prototype, "visible", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', nullable: true, default: true, name: 'activo' }),
    __metadata("design:type", Boolean)
], MntModules.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], MntModules.prototype, "icono", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 150 }),
    __metadata("design:type", String)
], MntModules.prototype, "filename", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10, nullable: true }),
    __metadata("design:type", String)
], MntModules.prototype, "method", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', nullable: true, name: 'is_father' }),
    __metadata("design:type", Boolean)
], MntModules.prototype, "isFather", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int4', nullable: true, name: 'prioridad' }),
    __metadata("design:type", Number)
], MntModules.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', nullable: true, default: false }),
    __metadata("design:type", Boolean)
], MntModules.prototype, "frontend", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
    }),
    __metadata("design:type", Date)
], MntModules.prototype, "createAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'updated_at',
    }),
    __metadata("design:type", Date)
], MntModules.prototype, "updateAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.DeleteDateColumn)({
        type: 'timestamptz',
        name: 'deleted_at',
    }),
    __metadata("design:type", Date)
], MntModules.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => MntModules, (module) => module.padre, { nullable: true }),
    __metadata("design:type", Array)
], MntModules.prototype, "hijos", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => MntModules, (modulo) => modulo.hijos, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'id_padre' }),
    __metadata("design:type", MntModules)
], MntModules.prototype, "padre", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => MntPermissionsRol_entity_1.MntPermissionsRol, (permissionRol) => permissionRol.module),
    __metadata("design:type", Array)
], MntModules.prototype, "permissionRol", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => MntPermissionsUser_entity_1.MntPermissionsUser, (permissionUser) => permissionUser.module),
    __metadata("design:type", Array)
], MntModules.prototype, "permissionUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => MntMenu_entity_1.MntMenu, (menu) => menu.modulos),
    (0, typeorm_1.JoinColumn)({ name: 'id_menu' }),
    __metadata("design:type", MntMenu_entity_1.MntMenu)
], MntModules.prototype, "menu", void 0);
exports.MntModules = MntModules = __decorate([
    (0, typeorm_1.Entity)('mnt_modulos')
], MntModules);
//# sourceMappingURL=mntModules.entity.js.map