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
exports.MntRolUser = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const mntUsers_entity_1 = require("./mntUsers.entity");
const MntPermissionsRol_entity_1 = require("../../auth/entities/MntPermissionsRol.entity");
let MntRolUser = class MntRolUser {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, active: { required: true, type: () => Boolean }, createAt: { required: true, type: () => Date }, updateAt: { required: true, type: () => Date }, deletedAt: { required: true, type: () => Date }, users: { required: true, type: () => [require("./mntUsers.entity").MntUsers] }, permissions: { required: true, type: () => [require("../../auth/entities/MntPermissionsRol.entity").MntPermissionsRol] } };
    }
};
exports.MntRolUser = MntRolUser;
__decorate([
    (0, typeorm_1.PrimaryColumn)('text'),
    __metadata("design:type", String)
], MntRolUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, name: 'nombre' }),
    __metadata("design:type", String)
], MntRolUser.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 250, nullable: true, name: 'descripcion' }),
    __metadata("design:type", String)
], MntRolUser.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true, name: 'activo' }),
    __metadata("design:type", Boolean)
], MntRolUser.prototype, "active", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
    }),
    __metadata("design:type", Date)
], MntRolUser.prototype, "createAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamptz',
        name: 'updated_at',
    }),
    __metadata("design:type", Date)
], MntRolUser.prototype, "updateAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.DeleteDateColumn)({
        type: 'timestamptz',
        name: 'deleted_at',
    }),
    __metadata("design:type", Date)
], MntRolUser.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => mntUsers_entity_1.MntUsers, (user) => user.rol),
    __metadata("design:type", Array)
], MntRolUser.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => MntPermissionsRol_entity_1.MntPermissionsRol, (permissionRol) => permissionRol.rol),
    __metadata("design:type", Array)
], MntRolUser.prototype, "permissions", void 0);
exports.MntRolUser = MntRolUser = __decorate([
    (0, typeorm_1.Entity)('mnt_rol_user')
], MntRolUser);
//# sourceMappingURL=mntRolUser.entity.js.map