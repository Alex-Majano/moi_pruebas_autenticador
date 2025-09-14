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
exports.MntMenu = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const mntModules_entity_1 = require("./mntModules.entity");
const mntEtiquetas_entity_1 = require("./mntEtiquetas.entity");
let MntMenu = class MntMenu {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, nombre: { required: true, type: () => String }, descripcion: { required: true, type: () => String }, visible: { required: true, type: () => Boolean }, activo: { required: true, type: () => Boolean }, icono: { required: true, type: () => String }, filename: { required: true, type: () => String }, admin: { required: true, type: () => Boolean }, superAdmin: { required: true, type: () => Boolean }, prioridad: { required: true, type: () => Number }, createAt: { required: true, type: () => Date }, updateAt: { required: true, type: () => Date }, deletedAt: { required: true, type: () => Date }, etiqueta: { required: true, type: () => require("./mntEtiquetas.entity").MntEtiquetas }, modulos: { required: true, type: () => [require("./mntModules.entity").MntModules] } };
    }
};
exports.MntMenu = MntMenu;
__decorate([
    (0, typeorm_1.PrimaryColumn)('text'),
    __metadata("design:type", String)
], MntMenu.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], MntMenu.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], MntMenu.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', nullable: true }),
    __metadata("design:type", Boolean)
], MntMenu.prototype, "visible", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', nullable: true }),
    __metadata("design:type", Boolean)
], MntMenu.prototype, "activo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], MntMenu.prototype, "icono", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 150 }),
    __metadata("design:type", String)
], MntMenu.prototype, "filename", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', nullable: true }),
    __metadata("design:type", Boolean)
], MntMenu.prototype, "admin", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', nullable: true, name: 'super_admin' }),
    __metadata("design:type", Boolean)
], MntMenu.prototype, "superAdmin", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int4' }),
    __metadata("design:type", Number)
], MntMenu.prototype, "prioridad", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
    }),
    __metadata("design:type", Date)
], MntMenu.prototype, "createAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'updated_at',
    }),
    __metadata("design:type", Date)
], MntMenu.prototype, "updateAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.DeleteDateColumn)({
        type: 'timestamptz',
        name: 'deleted_at',
    }),
    __metadata("design:type", Date)
], MntMenu.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => mntEtiquetas_entity_1.MntEtiquetas, (menu) => menu.etiquetaMenu),
    (0, typeorm_1.JoinColumn)({ name: 'id_etiqueta' }),
    __metadata("design:type", mntEtiquetas_entity_1.MntEtiquetas)
], MntMenu.prototype, "etiqueta", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => mntModules_entity_1.MntModules, (modulos) => modulos.menu),
    __metadata("design:type", Array)
], MntMenu.prototype, "modulos", void 0);
exports.MntMenu = MntMenu = __decorate([
    (0, typeorm_1.Entity)('mnt_menu')
], MntMenu);
//# sourceMappingURL=MntMenu.entity.js.map