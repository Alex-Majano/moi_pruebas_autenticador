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
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const moment = require("moment-timezone");
const bitacora_service_1 = require("../services/bitacora.service");
let HttpExceptionFilter = class HttpExceptionFilter extends core_1.BaseExceptionFilter {
    constructor(applicationRef, bitLogErroresService) {
        super(applicationRef);
        this.bitLogErroresService = bitLogErroresService;
    }
    async catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let status = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const method = request['method'];
        let ipAddress = (request === null || request === void 0 ? void 0 : request.ip) || '';
        if (ipAddress.substr(0, 7) == '::ffff:') {
            ipAddress = ipAddress.substr(7);
        }
        let message = exception instanceof Error ? exception.message : exception.message.error;
        let detail;
        const PostgresErrorCode = {
            UniqueViolation: 23505,
            CheckViolation: 23514,
            NotNullViolation: 23502,
            ForeignKeyViolation: 23503,
            ColumnNotExist: 42703,
            GroupByError: 42803,
            SintaxisQueryError: 42601,
            QueryFailedError: '42P01',
        };
        if (exception.response !== undefined) {
            message = exception.response.message;
        }
        if (!exception.status) {
            if (Object.values(PostgresErrorCode).includes(exception.code)) {
                message = exception.message;
                detail = exception.detail;
                status = common_1.HttpStatus.CONFLICT;
            }
        }
        const requestx = {
            error: `${message} ${detail || ''}`,
            url: request.url,
            method: method,
            ip: ipAddress,
            fechaHora: moment().tz('America/El_Salvador').format(),
            user: null,
            params: JSON.stringify(request['params']),
            query: JSON.stringify(request['query']),
            body: JSON.stringify(request['body']),
        };
        response.status(status).json({
            status,
            message,
            detail: status === common_1.HttpStatus.INTERNAL_SERVER_ERROR
                ? 'Please contact with a admin of system.'
                : status == common_1.HttpStatus.CONFLICT
                    ? detail
                    : '',
            path: request.url,
        });
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = __decorate([
    (0, common_1.Catch)(),
    __param(0, (0, common_1.Inject)(core_1.HttpAdapterHost)),
    __metadata("design:paramtypes", [Object, bitacora_service_1.BitacoraService])
], HttpExceptionFilter);
//# sourceMappingURL=httpExceptionsFilter.js.map