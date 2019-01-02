"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ShoppingBasketManager_1 = require("../Logic/Managers/ShoppingBasketManager");
const BaseRouter_1 = require("../Repositories/Utility/BaseRouter");
class ShoppingBasketController extends BaseRouter_1.BaseRouter {
    constructor() {
        super(ShoppingBasketManager_1.ShoppingBasketManager);
    }
    init() {
        super.init();
    }
}
exports.ShoppingBasketController = ShoppingBasketController;
const shoppingBasketController = new ShoppingBasketController();
exports.default = shoppingBasketController.router;
