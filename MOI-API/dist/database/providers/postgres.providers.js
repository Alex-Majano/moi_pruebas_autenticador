"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresDatabaseProvider = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const postgres_config_1 = require("../../config/postgres.config");
exports.PostgresDatabaseProvider = typeorm_1.TypeOrmModule.forRootAsync({
    imports: [config_1.ConfigModule],
    inject: [config_1.ConfigService],
    useFactory: postgres_config_1.postgresConfig,
});
//# sourceMappingURL=postgres.providers.js.map