"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CategoryManager_1 = require("../Logic/Managers/CategoryManager");
const BaseRouter_1 = require("../Repositories/Utility/BaseRouter");
class CategoryController extends BaseRouter_1.BaseRouter {
    constructor() {
        super(CategoryManager_1.CategoryManager);
    }
    init() {
        super.init();
    }
}
exports.CategoryController = CategoryController;
const categoryController = new CategoryController();
exports.default = categoryController.router;
