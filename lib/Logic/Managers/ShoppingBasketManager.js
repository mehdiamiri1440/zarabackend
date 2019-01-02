"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("../../Repositories/Base/BaseRepository");
class ShoppingBasketManager extends BaseRepository_1.BaseRepository {
    constructor() {
        super("shoppingBasket");
    }
}
exports.ShoppingBasketManager = ShoppingBasketManager;
Object.seal(ShoppingBasketManager);
