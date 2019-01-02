"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("../../Repositories/Base/BaseRepository");
class CategoryManager extends BaseRepository_1.BaseRepository {
    constructor() {
        super("category");
    }
}
exports.CategoryManager = CategoryManager;
Object.seal(CategoryManager);
