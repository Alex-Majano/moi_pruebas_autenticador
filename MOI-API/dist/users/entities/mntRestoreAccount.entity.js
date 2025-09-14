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
exports.MntRestoreAccount = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const mntUsers_entity_1 = require("./mntUsers.entity");
let MntRestoreAccount = class MntRestoreAccount {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, dataTimeExpiration: { required: true, type: () => Date }, ip: { required: true, type: () => String }, linkRestore: { required: true, type: () => String }, tokenRestore: { required: true, type: () => String }, active: { required: true, type: () => Boolean }, createAt: { required: true, type: () => Date }, updateAt: { required: true, type: () => Date }, deletedAt: { required: true, type: () => Date }, user: { required: true, type: () => require("./mntUsers.entity").MntUsers } };
    }
};
exports.MntRestoreAccount = MntRestoreAccount;
__decorate([
    (0, typeorm_1.PrimaryColumn)('text'),
    __metadata("design:type", String)
], MntRestoreAccount.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', name: 'date_time_expiration' }),
    __metadata("design:type", Date)
], MntRestoreAccount.prototype, "dataTimeExpiration", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], MntRestoreAccount.prototype, "ip", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ type: 'text', name: 'link_restore' }),
    __metadata("design:type", String)
], MntRestoreAccount.prototype, "linkRestore", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'token_restore' }),
    __metadata("design:type", String)
], MntRestoreAccount.prototype, "tokenRestore", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], MntRestoreAccount.prototype, "active", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
    }),
    __metadata("design:type", Date)
], MntRestoreAccount.prototype, "createAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamptz',
        name: 'updated_at',
    }),
    __metadata("design:type", Date)
], MntRestoreAccount.prototype, "updateAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.DeleteDateColumn)({
        type: 'timestamptz',
        name: 'deleted_at',
    }),
    __metadata("design:type", Date)
], MntRestoreAccount.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => mntUsers_entity_1.MntUsers, (user) => user.restoreAccount, {
        nullable: false,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'id_user' }),
    __metadata("design:type", mntUsers_entity_1.MntUsers)
], MntRestoreAccount.prototype, "user", void 0);
exports.MntRestoreAccount = MntRestoreAccount = __decorate([
    (0, typeorm_1.Entity)('mnt_restore_account')
], MntRestoreAccount);
//# sourceMappingURL=mntRestoreAccount.entity.js.map