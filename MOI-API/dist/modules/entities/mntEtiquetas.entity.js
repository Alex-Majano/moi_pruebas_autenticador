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
exports.MntEtiquetas = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const MntMenu_entity_1 = require("./MntMenu.entity");
let MntEtiquetas = class MntEtiquetas {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, nombre: { required: true, type: () => String }, icono: { required: true, type: () => String }, descripcion: { required: true, type: () => String }, visible: { required: true, type: () => Boolean }, activo: { required: true, type: () => Boolean }, prioridad: { required: true, type: () => Boolean }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, deletedAt: { required: true, type: () => Date }, etiquetaMenu: { required: true, type: () => [require("./MntMenu.entity").MntMenu] } };
    }
};
exports.MntEtiquetas = MntEtiquetas;
__decorate([
    (0, typeorm_1.PrimaryColumn)('text'),
    __metadata("design:type", String)
], MntEtiquetas.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], MntEtiquetas.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], MntEtiquetas.prototype, "icono", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], MntEtiquetas.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', nullable: true, default: true }),
    __metadata("design:type", Boolean)
], MntEtiquetas.prototype, "visible", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', nullable: true, default: true }),
    __metadata("design:type", Boolean)
], MntEtiquetas.prototype, "activo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int4', nullable: true }),
    __metadata("design:type", Boolean)
], MntEtiquetas.prototype, "prioridad", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
    }),
    __metadata("design:type", Date)
], MntEtiquetas.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'updated_at',
    }),
    __metadata("design:type", Date)
], MntEtiquetas.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.DeleteDateColumn)({
        type: 'timestamptz',
        name: 'deleted_at',
    }),
    __metadata("design:type", Date)
], MntEtiquetas.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => MntMenu_entity_1.MntMenu, (menu) => menu.etiqueta),
    __metadata("design:type", Array)
], MntEtiquetas.prototype, "etiquetaMenu", void 0);
exports.MntEtiquetas = MntEtiquetas = __decorate([
    (0, typeorm_1.Entity)('mnt_etiquetas')
], MntEtiquetas);
//# sourceMappingURL=mntEtiquetas.entity.js.map