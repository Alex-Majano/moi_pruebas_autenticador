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
exports.MntPermissionsRol = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const entities_1 = require("../../users/entities");
const mntModules_entity_1 = require("../../modules/entities/mntModules.entity");
let MntPermissionsRol = class MntPermissionsRol {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, specialAssignee: { required: true, type: () => Boolean }, module: { required: true, type: () => require("../../modules/entities/mntModules.entity").MntModules }, rol: { required: true, type: () => require("../../users/entities/mntRolUser.entity").MntRolUser }, createAt: { required: true, type: () => String }, updateAt: { required: true, type: () => String } };
    }
};
exports.MntPermissionsRol = MntPermissionsRol;
__decorate([
    (0, typeorm_1.PrimaryColumn)('text'),
    __metadata("design:type", String)
], MntPermissionsRol.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        nullable: true,
        name: 'asignado_especial',
        default: false,
    }),
    __metadata("design:type", Boolean)
], MntPermissionsRol.prototype, "specialAssignee", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => mntModules_entity_1.MntModules, (module) => module.permissionRol, {
        nullable: false,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'id_modulo' }),
    __metadata("design:type", mntModules_entity_1.MntModules)
], MntPermissionsRol.prototype, "module", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_1.MntRolUser, (rol) => rol.permissions, {
        nullable: false,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'id_rol' }),
    __metadata("design:type", entities_1.MntRolUser)
], MntPermissionsRol.prototype, "rol", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
    }),
    __metadata("design:type", String)
], MntPermissionsRol.prototype, "createAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamptz',
        name: 'updated_at',
    }),
    __metadata("design:type", String)
], MntPermissionsRol.prototype, "updateAt", void 0);
exports.MntPermissionsRol = MntPermissionsRol = __decorate([
    (0, typeorm_1.Entity)('mnt_permisos_roles')
], MntPermissionsRol);
//# sourceMappingURL=MntPermissionsRol.entity.js.map