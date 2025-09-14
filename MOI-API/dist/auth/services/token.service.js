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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const moment = require("moment-timezone");
const uuid_1 = require("uuid");
const MntTokens_entity_1 = require("../entities/MntTokens.entity");
const jwt_1 = require("@nestjs/jwt");
const envs_1 = require("../../config/envs");
let TokenService = class TokenService {
    constructor(tokensRepository, jwtService) {
        this.tokensRepository = tokensRepository;
        this.jwtService = jwtService;
    }
    async findOne(token) {
        const findToken = await this.tokensRepository.findOne({
            where: {
                token,
                active: true,
            },
            relations: { user: true },
        });
        if (!findToken) {
            throw new common_1.NotFoundException('Invalid token');
        }
        return findToken;
    }
    async validExpiration(token) {
        const existToken = await this.tokensRepository.findOne({
            where: { token },
        });
        if (!existToken)
            throw new common_1.UnauthorizedException();
        const nowTime = moment().tz('America/El_Salvador').valueOf();
        const dateToken = moment(existToken.expirationTime).valueOf();
        if (dateToken <= nowTime) {
            if (!envs_1.envs.jwtUseRefreshToken) {
                throw new common_1.UnauthorizedException('token vencido');
            }
            const dateRefreshToken = moment(existToken.refreshExpirationTime).valueOf();
            if (dateRefreshToken <= nowTime) {
                throw new common_1.UnauthorizedException('refresh token vencido');
            }
            await this.updateTimeToken(existToken.id);
        }
        return existToken;
    }
    async createJWTToken(payload, timeExpired, secretKey) {
        return this.jwtService.sign(payload, {
            secret: secretKey,
            expiresIn: timeExpired,
        });
    }
    async ValidToken(token, secretKey) {
        try {
            return this.jwtService.verify(token, {
                secret: secretKey,
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Invalid token');
        }
    }
    async create(createToken) {
        const { userId } = createToken, data = __rest(createToken, ["userId"]);
        const token = this.tokensRepository.create(Object.assign(Object.assign({ id: (0, uuid_1.v4)(), active: true }, data), { user: {
                id: userId,
            }, createAt: moment().tz('America/El_Salvador').format() }));
        await this.tokensRepository.save(token);
        return token;
    }
    async update(token, updateToken) {
        const { userId } = updateToken, data = __rest(updateToken, ["userId"]);
        const { id } = await this.findOne(token);
        const updated = await this.tokensRepository.preload(Object.assign(Object.assign({ id, user: { id: userId } }, data), { updateAt: moment().tz('America/El_Salvador').format() }));
        await this.tokensRepository.save(updated);
        return updated;
    }
    async desactiveTokensByUser(userId) {
        const [tokens, count] = await this.tokensRepository.findAndCount({
            where: {
                user: { id: userId },
                active: true,
            },
        });
        if (!!count) {
            await this.tokensRepository
                .createQueryBuilder('tokens')
                .update(MntTokens_entity_1.MntTokens, { active: false })
                .where('id IN (:...ids)', {
                ids: tokens.map((token) => token.id),
            })
                .updateEntity(true)
                .execute();
        }
    }
    async updateTimeToken(id) {
        const { amount, unit } = this.parseExpirationJwt(envs_1.envs.jwtExpiration);
        const token = await this.tokensRepository.preload({
            id,
            expirationTime: moment()
                .tz('America/El_Salvador')
                .add(amount, unit)
                .format(),
            updateAt: moment().tz('America/El_Salvador').format(),
        });
        await this.tokensRepository.save(token);
    }
    parseExpirationJwt(jwtExpireTime) {
        const regex = /^(\d+)([a-zA-Z]+)$/;
        const match = jwtExpireTime.match(regex);
        if (!match) {
            throw new common_1.BadRequestException('Format invalid: ' + jwtExpireTime);
        }
        const [, amount, unit] = match;
        return { amount: parseInt(amount, 10), unit };
    }
};
exports.TokenService = TokenService;
exports.TokenService = TokenService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(MntTokens_entity_1.MntTokens)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        jwt_1.JwtService])
], TokenService);
//# sourceMappingURL=token.service.js.map