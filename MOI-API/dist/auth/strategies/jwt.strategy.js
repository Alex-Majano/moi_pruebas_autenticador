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
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const envs_1 = require("../../config/envs");
const userSession_class_1 = require("../../common/class/userSession.class");
const permissions_service_1 = require("../services/permissions.service");
const users_service_1 = require("../../users/services/users.service");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt') {
    constructor(permissionsService, usersService, sessionUser) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: envs_1.envs.jwtSecret,
            passReqToCallback: true,
            ignoreExpiration: false,
        });
        this.permissionsService = permissionsService;
        this.usersService = usersService;
        this.sessionUser = sessionUser;
    }
    async validate(request, payload) {
        var _a;
        const idUser = payload['sub'];
        const user = await this.usersService.findOne(idUser);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        const endpoint = ((_a = request.route) === null || _a === void 0 ? void 0 : _a.path) || request.url;
        const method = request.method;
        this.sessionUser.idUser = idUser;
        await this.permissionsService.findPermissionsToUser(idUser, endpoint, method);
        return {
            id: user.id,
            email: user.email,
            active: user.active,
            is_2fa_enabled: user.is_2fa_enabled,
        };
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [permissions_service_1.PermissionsService,
        users_service_1.UsersService,
        userSession_class_1.classSessionUser])
], JwtStrategy);
//# sourceMappingURL=jwt.strategy.js.map