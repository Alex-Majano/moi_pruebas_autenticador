"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailModule = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const envs_1 = require("../config/envs");
const path_1 = require("path");
const email_service_1 = require("./services/email.service");
let EmailModule = class EmailModule {
};
exports.EmailModule = EmailModule;
exports.EmailModule = EmailModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mailer_1.MailerModule.forRootAsync({
                useFactory: () => ({
                    transport: {
                        host: envs_1.envs.smtpHost,
                        port: envs_1.envs.smtpPort,
                        secure: false,
                        auth: {
                            user: envs_1.envs.smtpUser,
                            pass: envs_1.envs.smtpPass,
                        },
                        tls: {
                            ciphers: 'SSLv3',
                        },
                    },
                    defaults: {
                        from: `"No contestar, " <${envs_1.envs.emailFrom}>`,
                    },
                    template: {
                        dir: (0, path_1.join)(__dirname, './templates'),
                        adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                        options: {
                            strict: true,
                        },
                    },
                }),
            }),
        ],
        exports: [EmailModule, email_service_1.EmailService],
        providers: [email_service_1.EmailService],
    })
], EmailModule);
//# sourceMappingURL=email.module.js.map