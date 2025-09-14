"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitacoraModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const httpExceptionsFilter_1 = require("./filters/httpExceptionsFilter");
const bitacora_service_1 = require("./services/bitacora.service");
const typeorm_1 = require("@nestjs/typeorm");
const bitLogsErrors_entity_1 = require("./entities/bitLogsErrors.entity");
let BitacoraModule = class BitacoraModule {
};
exports.BitacoraModule = BitacoraModule;
exports.BitacoraModule = BitacoraModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([bitLogsErrors_entity_1.BitLogErrores])],
        providers: [
            bitacora_service_1.BitacoraService,
            {
                provide: core_1.APP_FILTER,
                useClass: httpExceptionsFilter_1.HttpExceptionFilter,
            },
            bitacora_service_1.BitacoraService,
        ],
    })
], BitacoraModule);
//# sourceMappingURL=bitacora.module.js.map