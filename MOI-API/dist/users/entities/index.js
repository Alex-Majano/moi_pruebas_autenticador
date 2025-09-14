"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersEntities = exports.MntRolUser = exports.MntRestoreAccount = exports.MntUsers = void 0;
const mntUsers_entity_1 = require("./mntUsers.entity");
Object.defineProperty(exports, "MntUsers", { enumerable: true, get: function () { return mntUsers_entity_1.MntUsers; } });
const mntRolUser_entity_1 = require("./mntRolUser.entity");
Object.defineProperty(exports, "MntRolUser", { enumerable: true, get: function () { return mntRolUser_entity_1.MntRolUser; } });
const mntRestoreAccount_entity_1 = require("./mntRestoreAccount.entity");
Object.defineProperty(exports, "MntRestoreAccount", { enumerable: true, get: function () { return mntRestoreAccount_entity_1.MntRestoreAccount; } });
exports.usersEntities = [mntUsers_entity_1.MntUsers, mntRestoreAccount_entity_1.MntRestoreAccount, mntRolUser_entity_1.MntRolUser];
//# sourceMappingURL=index.js.map