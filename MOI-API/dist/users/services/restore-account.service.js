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
exports.RestoreAccountService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const uuid_1 = require("uuid");
const envs_1 = require("../../config/envs");
const moment = require("moment-timezone");
const entities_1 = require("../entities");
let RestoreAccountService = class RestoreAccountService {
    constructor(restoreAccountRepository, dataSource) {
        this.restoreAccountRepository = restoreAccountRepository;
        this.dataSource = dataSource;
    }
    async create(usuario, ip, route, useQueryRunner) {
        const urlApplication = envs_1.envs.urlApplicationFront;
        const dateTime = new Date().getTime();
        const dataTimeExpiration = dateTime + parseInt(envs_1.envs.emailRecoverPasswordTime) * 1000;
        const expirationDateTime = String(new Date(dataTimeExpiration).toLocaleDateString()) +
            ' ' +
            String(new Date(dataTimeExpiration).toLocaleTimeString());
        const fechaHoraActual = String(new Date(dateTime).toLocaleDateString()) +
            ' ' +
            String(new Date(dateTime).toLocaleTimeString());
        const saltOrRounds = 10;
        const password = fechaHoraActual + `${usuario.id}`;
        const token = await bcrypt.hash(password, saltOrRounds);
        const tokenNew = token.split('/').join('');
        const tokenNew2 = tokenNew.split('.').join('');
        const tokenNew3 = tokenNew2.split('$').join('');
        const linkRecuperacion = `${urlApplication}${route}${tokenNew3}`;
        const attemps = await this.restoreAccountRepository
            .createQueryBuilder('recuperacion_cuenta')
            .select(['recuperacion_cuenta.id'])
            .where('recuperacion_cuenta.id_user = :usuarioId', {
            usuarioId: usuario.id,
        })
            .andWhere('recuperacion_cuenta.active is true')
            .andWhere('recuperacion_cuenta.dataTimeExpiration >= :dataTimeExpiration', { dataTimeExpiration: fechaHoraActual })
            .getCount();
        if (attemps >= parseInt(envs_1.envs.maxAttempsRecoverPasswordEmail)) {
            throw new common_1.BadRequestException(`No se pueden enviar mas de ${envs_1.envs.maxAttempsRecoverPasswordEmail} peticiones de restablecimiento de password. Intente mas tarde.`);
        }
        let queryRunner = useQueryRunner;
        if (!useQueryRunner) {
            queryRunner = this.dataSource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();
        }
        let ipAddress = ip || '';
        if (ipAddress.substr(0, 7) == '::ffff:') {
            ipAddress = ipAddress.substr(7);
        }
        try {
            await queryRunner.manager.insert(entities_1.MntRestoreAccount, [
                {
                    id: (0, uuid_1.v4)(),
                    ip: ipAddress,
                    linkRestore: linkRecuperacion,
                    tokenRestore: tokenNew3,
                    active: true,
                    user: usuario,
                    dataTimeExpiration: expirationDateTime,
                    createAt: moment().tz('America/El_Salvador').format(),
                },
            ]);
            if (!useQueryRunner) {
                await queryRunner.commitTransaction();
            }
            return linkRecuperacion;
        }
        catch (err) {
            if (!useQueryRunner) {
                await queryRunner.rollbackTransaction();
            }
            throw new common_1.ConflictException('Error al enviar el email');
        }
        finally {
            if (!useQueryRunner) {
                await queryRunner.release();
            }
        }
    }
    async searchToken(token) {
        const dateTime = new Date().getTime();
        const fechaHoraActual = String(new Date(dateTime).toLocaleDateString()) +
            ' ' +
            String(new Date(dateTime).toLocaleTimeString());
        const attemps = await this.restoreAccountRepository
            .createQueryBuilder('recuperacion_cuenta')
            .select([
            'recuperacion_cuenta.id',
            'recuperacion_cuenta.dataTimeExpiration',
            'recuperacion_cuenta.active',
            'recuperacion_cuenta.id_user',
            'usuarios.id',
            'usuarios.email',
        ])
            .innerJoin('recuperacion_cuenta.user', 'usuarios')
            .where('recuperacion_cuenta.tokenRestore = :token', {
            token: token,
        })
            .andWhere('recuperacion_cuenta.active is true')
            .andWhere('recuperacion_cuenta.dataTimeExpiration >= :dataTimeExpiration', { dataTimeExpiration: fechaHoraActual })
            .getRawOne();
        if (!attemps) {
            throw new common_1.NotFoundException(`No se encontró una petición de recuperación de cuenta con esa URL`);
        }
        return attemps;
    }
    async searchTokenByUser(idUser) {
        const dateTime = new Date().getTime();
        const fechaHoraActual = String(new Date(dateTime).toLocaleDateString()) +
            ' ' +
            String(new Date(dateTime).toLocaleTimeString());
        const attemps = await this.restoreAccountRepository
            .createQueryBuilder('recuperacion_cuenta')
            .select([
            'recuperacion_cuenta.id',
            'recuperacion_cuenta.dataTimeExpiration',
            'recuperacion_cuenta.tokenRestore',
        ])
            .innerJoin('recuperacion_cuenta.user', 'usuarios')
            .where('usuarios.id = :idUser', {
            idUser,
        })
            .andWhere('recuperacion_cuenta.active is true')
            .andWhere('recuperacion_cuenta.dataTimeExpiration >= :fechaHoraActual', {
            fechaHoraActual,
        })
            .getRawOne();
        if (!attemps) {
            throw new common_1.NotFoundException(`No se encontró una petición de recuperación de cuenta para este usuario.`);
        }
        return attemps;
    }
};
exports.RestoreAccountService = RestoreAccountService;
exports.RestoreAccountService = RestoreAccountService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.MntRestoreAccount)),
    __param(1, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], RestoreAccountService);
//# sourceMappingURL=restore-account.service.js.map