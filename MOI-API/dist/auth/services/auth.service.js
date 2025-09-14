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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const moment = require("moment-timezone");
const envs_1 = require("../../config/envs");
const users_service_1 = require("../../users/services/users.service");
const token_service_1 = require("./token.service");
const restore_account_service_1 = require("../../users/services/restore-account.service");
const email_service_1 = require("../../email/services/email.service");
let AuthService = class AuthService {
    constructor(usersService, tokenService, restoreAccountService, emailService) {
        this.usersService = usersService;
        this.tokenService = tokenService;
        this.restoreAccountService = restoreAccountService;
        this.emailService = emailService;
    }
    async validateUser(email, password) {
        const user = await this.usersService.findByEmail(email);
        if (user && user.active) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                return user;
            }
        }
        return null;
    }
    async login(user) {
        if (user.is_2fa_enabled) {
            return {
                requires2fa: true,
                message: 'Se requiere código de autenticación de dos factores',
                email: user.email,
                userId: user.id,
            };
        }
        return await this.generateAuthResponse(user);
    }
    async verify2FALogin(userId, token) {
        const user = await this.usersService.findOne(userId);
        if (!user) {
            throw new common_1.UnauthorizedException('Usuario no encontrado');
        }
        if (!user.is_2fa_enabled) {
            throw new common_1.UnauthorizedException('2FA no está activado para este usuario');
        }
        if (!user.two_factor_secret) {
            throw new common_1.UnauthorizedException('No hay secret configurado para 2FA');
        }
        const isValid = await this.verify2FACode(user.two_factor_secret, token);
        if (!isValid) {
            throw new common_1.UnauthorizedException('Código 2FA inválido');
        }
        return await this.generateAuthResponse(user);
    }
    async verify2FACode(secret, token) {
        const speakeasy = require('speakeasy');
        return speakeasy.totp.verify({
            secret: secret,
            token: token,
            encoding: 'base32',
            window: 1,
        });
    }
    async generateAuthResponse(user) {
        const dataToken = { rol: user.rol, sub: user.id };
        const token = await this.tokenService.createJWTToken(dataToken, envs_1.envs.jwtExpiration, envs_1.envs.jwtSecret);
        await this.tokenService.desactiveTokensByUser(user.id);
        const { amount, unit } = this.tokenService.parseExpirationJwt(envs_1.envs.jwtExpiration);
        const savedToken = await this.tokenService.create({
            userId: user.id,
            token,
            expirationTime: moment()
                .tz('America/El_Salvador')
                .add(amount, unit)
                .format(),
        });
        if (envs_1.envs.jwtUseRefreshToken) {
            const dataRefreshToken = {
                rol: user.rol + token,
                sub: user.id + token,
            };
            const refreshToken = await this.tokenService.createJWTToken(dataRefreshToken, envs_1.envs.jwtRefreshExpiration, envs_1.envs.jwtSecret);
            const { amount: refreshAmount, unit: refreshUnit } = this.tokenService.parseExpirationJwt(envs_1.envs.jwtRefreshExpiration);
            await this.tokenService.update(savedToken.token, {
                userId: user.id,
                refreshToken: refreshToken,
                refreshExpirationTime: moment()
                    .tz('America/El_Salvador')
                    .add(refreshAmount, refreshUnit)
                    .format(),
            });
        }
        return {
            user: this.formatUser(user),
            token,
        };
    }
    async logout(user) {
        await this.tokenService.desactiveTokensByUser(user.id);
    }
    formatUser(user) {
        const infoUser = {
            id: user.id,
            email: user.email,
            tipo_usuario: {
                id: user.rol.id,
                nombre: user.rol.name,
            },
        };
        return infoUser;
    }
    async recoverPassword(id, ip) {
        const user = await this.usersService.findOne(id);
        const url = await this.restoreAccountService.create(user, ip, '/auth/reestablecer-password/');
        await this.emailService.sendEmail(user.email, 'Restablecer contraseña', 'name_template', {
            name: user.email,
            url: url,
        });
        return {
            message: 'Se ha enviado un correo para recuperar su cuenta',
        };
    }
    async verifyRecoverPassword(token) {
        return await this.restoreAccountService.searchToken(token);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        token_service_1.TokenService,
        restore_account_service_1.RestoreAccountService,
        email_service_1.EmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map