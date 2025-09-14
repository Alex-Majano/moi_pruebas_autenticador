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
exports.TwoFactorController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const two_factor_service_1 = require("./two-factor.service");
let TwoFactorController = class TwoFactorController {
    constructor(twoFactorService) {
        this.twoFactorService = twoFactorService;
    }
    async generate2FA(body) {
        const secret = this.twoFactorService.generateSecret();
        const appName = 'Sistema MINSAL';
        const url = this.twoFactorService.generateQRCodeURL(secret, body.email, appName);
        const qrImage = await this.twoFactorService.generateQRCodeImage(url);
        return {
            secret,
            qrImage,
        };
    }
    async verify2FA(body) {
        const isValid = this.twoFactorService.verifyCode(body.secret, body.token);
        if (!isValid) {
            throw new common_1.UnauthorizedException('Código 2FA inválido');
        }
        return { valid: true };
    }
};
exports.TwoFactorController = TwoFactorController;
__decorate([
    (0, common_1.Post)('generate'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TwoFactorController.prototype, "generate2FA", null);
__decorate([
    (0, common_1.Post)('verify'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TwoFactorController.prototype, "verify2FA", null);
exports.TwoFactorController = TwoFactorController = __decorate([
    (0, common_1.Controller)('two-factor'),
    __metadata("design:paramtypes", [two_factor_service_1.TwoFactorService])
], TwoFactorController);
//# sourceMappingURL=two-factor.controller.js.map