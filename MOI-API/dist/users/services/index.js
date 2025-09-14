"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const rols_service_1 = require("./rols.service");
const users_service_1 = require("./users.service");
const restore_account_service_1 = require("./restore-account.service");
exports.userServices = [users_service_1.UsersService, rols_service_1.RolsService, restore_account_service_1.RestoreAccountService];
//# sourceMappingURL=index.js.map