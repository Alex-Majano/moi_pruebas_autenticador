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
exports.MntPermissionsUser = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const mntUsers_entity_1 = require("../../users/entities/mntUsers.entity");
const mntModules_entity_1 = require("../../modules/entities/mntModules.entity");
let MntPermissionsUser = class MntPermissionsUser {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, specialAssignee: { required: true, type: () => Boolean }, module: { required: true, type: () => require("../../modules/entities/mntModules.entity").MntModules }, user: { required: true, type: () => require("../../users/entities/mntUsers.entity").MntUsers }, createAt: { required: true, type: () => String }, updateAt: { required: true, type: () => String } };
    }
};
exports.MntPermissionsUser = MntPermissionsUser;
__decorate([
    (0, typeorm_1.PrimaryColumn)('text'),
    __metadata("design:type", String)
], MntPermissionsUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        nullable: true,
        name: 'asignado_especial',
        default: false,
    }),
    __metadata("design:type", Boolean)
], MntPermissionsUser.prototype, "specialAssignee", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => mntModules_entity_1.MntModules, (module) => module.permissionUser, {
        nullable: false,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'id_modulo' }),
    __metadata("design:type", mntModules_entity_1.MntModules)
], MntPermissionsUser.prototype, "module", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => mntUsers_entity_1.MntUsers, (user) => user.permissions),
    (0, typeorm_1.JoinColumn)({ name: 'id_usuario' }),
    __metadata("design:type", mntUsers_entity_1.MntUsers)
], MntPermissionsUser.prototype, "user", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
    }),
    __metadata("design:type", String)
], MntPermissionsUser.prototype, "createAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamptz',
        name: 'updated_at',
    }),
    __metadata("design:type", String)
], MntPermissionsUser.prototype, "updateAt", void 0);
exports.MntPermissionsUser = MntPermissionsUser = __decorate([
    (0, typeorm_1.Entity)('mnt_permisos_usuarios')
], MntPermissionsUser);
//# sourceMappingURL=MntPermissionsUser.entity.js.map