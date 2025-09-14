"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("./database/database.module");
const files_module_1 = require("./files/files.module");
const auth_module_1 = require("./auth/auth.module");
const email_module_1 = require("./email/email.module");
const bitacora_module_1 = require("./bitacora/bitacora.module");
const users_module_1 = require("./users/users.module");
const modules_module_1 = require("./modules/modules.module");
const common_module_1 = require("./common/common.module");
const two_factor_service_1 = require("./two-factor/two-factor.service");
const two_factor_controller_1 = require("./two-factor/two-factor.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            files_module_1.FilesModule,
            auth_module_1.AuthModule,
            email_module_1.EmailModule,
            bitacora_module_1.BitacoraModule,
            users_module_1.UsersModule,
            modules_module_1.ModulesModule,
            common_module_1.CommonModule,
        ],
        controllers: [two_factor_controller_1.TwoFactorController],
        providers: [two_factor_service_1.TwoFactorService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map