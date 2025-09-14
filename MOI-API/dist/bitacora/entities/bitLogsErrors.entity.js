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
exports.BitLogErrores = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
let BitLogErrores = class BitLogErrores {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, error: { required: true, type: () => String }, url: { required: true, type: () => String }, params: { required: true, type: () => String }, body: { required: true, type: () => String }, query: { required: true, type: () => String }, method: { required: true, type: () => String }, ip: { required: true, type: () => String }, fechaHora: { required: true, type: () => Date }, createAt: { required: true, type: () => Date }, updateAt: { required: true, type: () => Date }, deletedAt: { required: true, type: () => Date }, user: { required: true, type: () => String } };
    }
};
exports.BitLogErrores = BitLogErrores;
__decorate([
    (0, typeorm_1.PrimaryColumn)('text'),
    __metadata("design:type", String)
], BitLogErrores.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], BitLogErrores.prototype, "error", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], BitLogErrores.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], BitLogErrores.prototype, "params", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], BitLogErrores.prototype, "body", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], BitLogErrores.prototype, "query", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", String)
], BitLogErrores.prototype, "method", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], BitLogErrores.prototype, "ip", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', name: 'fecha_hora' }),
    __metadata("design:type", Date)
], BitLogErrores.prototype, "fechaHora", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
    }),
    __metadata("design:type", Date)
], BitLogErrores.prototype, "createAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'updated_at',
    }),
    __metadata("design:type", Date)
], BitLogErrores.prototype, "updateAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.DeleteDateColumn)({
        type: 'timestamptz',
        name: 'deleted_at',
    }),
    __metadata("design:type", Date)
], BitLogErrores.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'id_usuario' }),
    __metadata("design:type", String)
], BitLogErrores.prototype, "user", void 0);
exports.BitLogErrores = BitLogErrores = __decorate([
    (0, typeorm_1.Entity)('bit_log_errores')
], BitLogErrores);
//# sourceMappingURL=bitLogsErrors.entity.js.map