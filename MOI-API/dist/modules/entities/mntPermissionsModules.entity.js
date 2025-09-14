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
exports.MntPermissionModules = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const mntModules_entity_1 = require("./mntModules.entity");
let MntPermissionModules = class MntPermissionModules {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, moduleView: { required: true, type: () => require("./mntModules.entity").MntModules }, moduleEndpoint: { required: true, type: () => require("./mntModules.entity").MntModules } };
    }
};
exports.MntPermissionModules = MntPermissionModules;
__decorate([
    (0, typeorm_1.PrimaryColumn)('text'),
    __metadata("design:type", String)
], MntPermissionModules.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => mntModules_entity_1.MntModules, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'id_modulo_visa' }),
    __metadata("design:type", mntModules_entity_1.MntModules)
], MntPermissionModules.prototype, "moduleView", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => mntModules_entity_1.MntModules, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'id_modulo_endpoint' }),
    __metadata("design:type", mntModules_entity_1.MntModules)
], MntPermissionModules.prototype, "moduleEndpoint", void 0);
exports.MntPermissionModules = MntPermissionModules = __decorate([
    (0, typeorm_1.Entity)('mnt_permisos_modulos')
], MntPermissionModules);
//# sourceMappingURL=mntPermissionsModules.entity.js.map