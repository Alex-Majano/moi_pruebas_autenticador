"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolsFactory = void 0;
const entities_1 = require("../../../users/entities");
const rols_data_1 = require("../data/rols.data");
const moment = require("moment-timezone");
class RolsFactory {
    async run(dataSource) {
        const repository = dataSource.getRepository(entities_1.MntRolUser);
        for (const dato of rols_data_1.RolsSeed) {
            const newDato = repository.create(Object.assign(Object.assign({}, dato), { createAt: moment().tz('America/El_Salvador').format() }));
            await repository.save(newDato);
        }
    }
}
exports.RolsFactory = RolsFactory;
//# sourceMappingURL=rols.factory.js.map