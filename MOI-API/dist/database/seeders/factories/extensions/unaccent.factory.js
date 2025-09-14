"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnaccentFactory = void 0;
class UnaccentFactory {
    async run(dataSource) {
        await dataSource.query(`CREATE EXTENSION IF NOT EXISTS unaccent;`);
    }
}
exports.UnaccentFactory = UnaccentFactory;
//# sourceMappingURL=unaccent.factory.js.map