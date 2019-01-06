"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class product {
    constructor() {
        this._id = "";
        this.name = "";
        this.images = [];
        this.decription = "";
        this.color = [];
        this.size = [];
        this.price = "";
        this.categoryName = "";
        this.isNew = false;
        this.hashTag = [];
        this.registerDate = Date.now();
        this.isAvailable = true;
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
