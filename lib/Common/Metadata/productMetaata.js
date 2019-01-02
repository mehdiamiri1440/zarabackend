"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class product {
    constructor() {
        this._id = "";
        this.name = "";
        this.image = [];
        this.decription = "";
        this.color = [];
        this.size = [];
        this.price = "";
        this.categoryCode = "";
    }
}
exports.product = product;
class shoppingCartProduct extends product {
    constructor() {
        super(...arguments);
        this.count = 0;
    }
}
exports.shoppingCartProduct = shoppingCartProduct;
