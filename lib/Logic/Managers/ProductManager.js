"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("../../Repositories/Base/BaseRepository");
class ProductManager extends BaseRepository_1.BaseRepository {
    constructor() {
        super("product");
    }
    getByCategory(categoryName, callback) {
        this.find({ categoryName: categoryName }, callback);
    }
    search(phrase, callback) {
        this.find({ name: new RegExp(".*" + phrase + ".*") }, callback);
    }
    getIsNew(callback) {
        this.find({ isNew: true }, callback);
    }
}
exports.ProductManager = ProductManager;
Object.seal(ProductManager);
