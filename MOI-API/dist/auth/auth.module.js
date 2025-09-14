"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const token_middleware_1 = require("./middlewares/token.middleware");
const users_module_1 = require("../users/users.module");
const auth_service_1 = require("./services/auth.service");
const token_service_1 = require("./services/token.service");
const entities_1 = require("./entities");
const permissions_service_1 = require("./services/permissions.service");
const auth_controller_1 = require("./controllers/auth.controller");
const local_strategy_1 = require("./strategies/local.strategy");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const modules_module_1 = require("../modules/modules.module");
const email_module_1 = require("../email/email.module");
const two_factor_module_1 = require("../two-factor/two-factor.module");
let AuthModule = class AuthModule {
    configure(consumer) {
        consumer
            .apply(token_middleware_1.TokenMiddleware)
            .exclude({ path: 'auth/login', method: common_1.RequestMethod.ALL }, { path: 'auth/verify-2fa', method: common_1.RequestMethod.ALL })
            .forRoutes({ path: '/*', method: common_1.RequestMethod.ALL });
    }
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.registerAsync({
                useFactory: () => ({}),
            }),
            typeorm_1.TypeOrmModule.forFeature([...entities_1.authEntities]),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            email_module_1.EmailModule,
            passport_1.PassportModule.register({ defaultStrategy: 'local' }),
            modules_module_1.ModulesModule,
            two_factor_module_1.TwoFactorModule,
        ],
        providers: [
            auth_service_1.AuthService,
            local_strategy_1.LocalStrategy,
            jwt_strategy_1.JwtStrategy,
            token_service_1.TokenService,
            permissions_service_1.PermissionsService,
        ],
        controllers: [auth_controller_1.AuthController],
        exports: [auth_service_1.AuthService, permissions_service_1.PermissionsService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map