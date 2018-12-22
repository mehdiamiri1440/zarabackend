"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("../../Repositories/Base/BaseRepository");
class CountryManager extends BaseRepository_1.BaseRepository {
    constructor() {
        super("country");
    }
    get(callback) {
        this.find({}, callback);
    }
}
exports.CountryManager = CountryManager;
Object.seal(CountryManager);
