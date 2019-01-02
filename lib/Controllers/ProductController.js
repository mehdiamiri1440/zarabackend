"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProductManager_1 = require("../Logic/Managers/ProductManager");
const BaseRouter_1 = require("../Repositories/Utility/BaseRouter");
class ProductController extends BaseRouter_1.BaseRouter {
    constructor() {
        super(ProductManager_1.ProductManager);
    }
    init() {
        super.init();
        this.router.get("/getByCategoryCode", this.getByCategoryCode);
    }
    getByCategoryCode(req, res, next) {
        let manager = new ProductManager_1.ProductManager();
        manager.getByCategory(req.body.categoryCode, function (err, result) {
            if (err)
                res.status(500).send({ error: err });
            else
                res.send(result);
        });
    }
}
exports.ProductController = ProductController;
const productController = new ProductController();
exports.default = productController.router;
