"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("../../Repositories/Base/BaseRepository");
class ProductManager extends BaseRepository_1.BaseRepository {
    constructor() {
        super("product");
    }
    getByCategory(categoryCode, callback) {
        this.find({ categoryCode: categoryCode }, callback);
    }
    search(phrase, callback) {
        this.find({ name: new RegExp(".*" + phrase + ".*") }, callback);
    }
}
exports.ProductManager = ProductManager;
Object.seal(ProductManager);
