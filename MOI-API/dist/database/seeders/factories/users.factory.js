"use strict";
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
exports.UsersFactory = void 0;
const bcrypt = require("bcrypt");
const entities_1 = require("../../../users/entities");
const users_data_1 = require("../data/users.data");
const moment = require("moment-timezone");
class UsersFactory {
    async run(dataSource) {
        const repository = dataSource.getRepository(entities_1.MntUsers);
        for (const dato of users_data_1.UsersSeed) {
            const { password, idRol } = dato, data = __rest(dato, ["password", "idRol"]);
            const hashPassword = await bcrypt.hash(password, 10);
            const newDato = repository.create(Object.assign(Object.assign({ password: hashPassword }, data), { rol: { id: idRol }, createAt: moment().tz('America/El_Salvador').format() }));
            await repository.save(newDato);
        }
    }
}
exports.UsersFactory = UsersFactory;
//# sourceMappingURL=users.factory.js.map