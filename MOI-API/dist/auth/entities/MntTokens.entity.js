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
exports.MntTokens = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const entities_1 = require("../../users/entities");
let MntTokens = class MntTokens {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, token: { required: true, type: () => String }, expirationTime: { required: true, type: () => Date }, refreshToken: { required: true, type: () => String }, refreshExpirationTime: { required: true, type: () => Date }, active: { required: true, type: () => Boolean }, user: { required: true, type: () => require("../../users/entities/mntUsers.entity").MntUsers }, createAt: { required: true, type: () => Date }, updateAt: { required: true, type: () => Date }, deletedAt: { required: true, type: () => Date } };
    }
};
exports.MntTokens = MntTokens;
__decorate([
    (0, typeorm_1.PrimaryColumn)('text'),
    __metadata("design:type", String)
], MntTokens.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], MntTokens.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', name: 'expiration_time' }),
    __metadata("design:type", Date)
], MntTokens.prototype, "expirationTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'refresh_token', nullable: true }),
    __metadata("design:type", String)
], MntTokens.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamptz',
        name: 'refresh_expiration_time',
        nullable: true,
    }),
    __metadata("design:type", Date)
], MntTokens.prototype, "refreshExpirationTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', nullable: true }),
    __metadata("design:type", Boolean)
], MntTokens.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_1.MntUsers, (user) => user.tokens, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'id_user' }),
    __metadata("design:type", entities_1.MntUsers)
], MntTokens.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
    }),
    __metadata("design:type", Date)
], MntTokens.prototype, "createAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamptz',
        name: 'updated_at',
        nullable: true,
    }),
    __metadata("design:type", Date)
], MntTokens.prototype, "updateAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        type: 'timestamptz',
        name: 'deleted_at',
    }),
    __metadata("design:type", Date)
], MntTokens.prototype, "deletedAt", void 0);
exports.MntTokens = MntTokens = __decorate([
    (0, typeorm_1.Entity)('mnt_tokens')
], MntTokens);
//# sourceMappingURL=MntTokens.entity.js.map