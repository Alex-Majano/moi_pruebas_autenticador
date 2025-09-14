"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_extension_1 = require("typeorm-extension");
const factories_1 = require("./factories");
class InitialSeeder {
    async run(dataSource) {
        await (0, typeorm_extension_1.runSeeder)(dataSource, factories_1.RolsFactory);
        await (0, typeorm_extension_1.runSeeder)(dataSource, factories_1.UsersFactory);
        await (0, typeorm_extension_1.runSeeder)(dataSource, factories_1.UnaccentFactory);
        await (0, typeorm_extension_1.runSeeder)(dataSource, factories_1.PermisosFactory);
    }
}
exports.default = InitialSeeder;
//# sourceMappingURL=initial.seeder.js.map