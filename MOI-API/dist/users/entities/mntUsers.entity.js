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
exports.MntUsers = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const MntTokens_entity_1 = require("../../auth/entities/MntTokens.entity");
const MntPermissionsUser_entity_1 = require("../../auth/entities/MntPermissionsUser.entity");
const mntRestoreAccount_entity_1 = require("./mntRestoreAccount.entity");
const mntRolUser_entity_1 = require("./mntRolUser.entity");
let MntUsers = class MntUsers {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, email: { required: true, type: () => String }, password: { required: true, type: () => String }, active: { required: true, type: () => Boolean }, two_factor_secret: { required: true, type: () => String }, is_2fa_enabled: { required: true, type: () => Boolean }, createAt: { required: true, type: () => Date }, updateAt: { required: true, type: () => Date }, deletedAt: { required: true, type: () => Date }, rol: { required: true, type: () => require("./mntRolUser.entity").MntRolUser }, permissions: { required: true, type: () => [require("../../auth/entities/MntPermissionsUser.entity").MntPermissionsUser] }, tokens: { required: true, type: () => [require("../../auth/entities/MntTokens.entity").MntTokens] }, restoreAccount: { required: true, type: () => [require("./mntRestoreAccount.entity").MntRestoreAccount] } };
    }
};
exports.MntUsers = MntUsers;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid'),
    __metadata("design:type", String)
], MntUsers.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true, unique: true }),
    __metadata("design:type", String)
], MntUsers.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], MntUsers.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true, name: 'activo' }),
    __metadata("design:type", Boolean)
], MntUsers.prototype, "active", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({
        name: 'two_factor_secret',
        type: 'text',
        nullable: true,
        default: null
    }),
    __metadata("design:type", String)
], MntUsers.prototype, "two_factor_secret", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'is_2fa_enabled',
        type: 'boolean',
        default: false
    }),
    __metadata("design:type", Boolean)
], MntUsers.prototype, "is_2fa_enabled", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
    }),
    __metadata("design:type", Date)
], MntUsers.prototype, "createAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamptz',
        name: 'updated_at',
    }),
    __metadata("design:type", Date)
], MntUsers.prototype, "updateAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.DeleteDateColumn)({
        type: 'timestamptz',
        name: 'deleted_at',
    }),
    __metadata("design:type", Date)
], MntUsers.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => mntRolUser_entity_1.MntRolUser, (rol) => rol.users, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'id_rol' }),
    __metadata("design:type", mntRolUser_entity_1.MntRolUser)
], MntUsers.prototype, "rol", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => MntPermissionsUser_entity_1.MntPermissionsUser, (permission) => permission.user),
    __metadata("design:type", Array)
], MntUsers.prototype, "permissions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => MntTokens_entity_1.MntTokens, (tokens) => tokens.user),
    __metadata("design:type", Array)
], MntUsers.prototype, "tokens", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => mntRestoreAccount_entity_1.MntRestoreAccount, (restore) => restore.user),
    __metadata("design:type", Array)
], MntUsers.prototype, "restoreAccount", void 0);
exports.MntUsers = MntUsers = __decorate([
    (0, typeorm_1.Entity)('mnt_usuarios')
], MntUsers);
//# sourceMappingURL=mntUsers.entity.js.map