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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const rols_service_1 = require("../services/rols.service");
const user_permissions_dto_1 = require("../dtos/user-permissions.dto");
const swagger_1 = require("@nestjs/swagger");
const rols_pagination_dto_1 = require("../dtos/rols-pagination.dto");
const jwt_guard_1 = require("../../auth/guards/jwt.guard");
const public_decorator_1 = require("../../auth/decorators/public.decorator");
let RolsController = class RolsController {
    constructor(rolService) {
        this.rolService = rolService;
    }
    findAll(params) {
        return this.rolService.findAll(params);
    }
    permisosById(id) {
        return this.rolService.findPermissionsById(id);
    }
    get(id) {
        return this.rolService.findOne(id);
    }
    permisos(payload) {
        return this.rolService.permisos(payload.id, payload.array);
    }
};
exports.RolsController = RolsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Endpoint para poder listar los usuarios con paginación',
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [rols_pagination_dto_1.paginationRolsDTO]),
    __metadata("design:returntype", void 0)
], RolsController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/permisos-modulos/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Este endpoint lista los permisos de un rol.',
    }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RolsController.prototype, "permisosById", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Endpoint para poder realizar la búsqueda de un rol de usuario en especifico.',
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("../entities/mntRolUser.entity").MntRolUser }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RolsController.prototype, "get", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('/permisos-modulos'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Este endpoint actualiza los permisos de un rol de usuario.',
    }),
    openapi.ApiResponse({ status: common_1.HttpStatus.CREATED, type: require("../entities/mntRolUser.entity").MntRolUser }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_permissions_dto_1.createPermissionsDTO]),
    __metadata("design:returntype", void 0)
], RolsController.prototype, "permisos", null);
exports.RolsController = RolsController = __decorate([
    (0, swagger_1.ApiTags)('Rols'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('rols'),
    __metadata("design:paramtypes", [rols_service_1.RolsService])
], RolsController);
//# sourceMappingURL=rols.controller.js.map