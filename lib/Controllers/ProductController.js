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
        this.router.get("/getByCategoryName/:categoryName", this.getByCategoryName);
        this.router.post("/search", this.search);
        this.router.get("/itemDetail", this.itemDetail);
        this.router.get("/getIsNew", this.getIsNew);
    }
    itemDetail(req, res, next) {
        let manager = new ProductManager_1.ProductManager();
        manager.find({ _id: req.body._id, isAvailable: true }, (err, product) => {
            if (err || product.length === 0)
                res.status(500).send({ error: err });
            product = product[0];
            manager.find({ hashTag: product.hashTag, isAvailable: true }, (err, similarProducts) => {
                if (err)
                    res.status(500).send({ error: err });
                res.send({ product, similarProducts });
            });
        });
    }
    getByCategoryName(req, res, next) {
        let manager = new ProductManager_1.ProductManager();
        manager.getByCategory(req.params.categoryName, function (err, result) {
            if (err)
                res.status(500).send({ error: err });
            else
                res.send(result);
        });
    }
    search(req, res, next) {
        let manager = new ProductManager_1.ProductManager();
        manager.search(req.body.phrase, function (err, result) {
            if (err)
                res.status(500).send({ error: err });
            else
                res.send(result);
        });
    }
    getIsNew(req, res, next) {
        let manager = new ProductManager_1.ProductManager();
        manager.getIsNew((err, result) => {
            if (err)
                res.status(500).send({ error: err });
            else if (result.length > 0) {
                result.sort((a, b) => a.Date - b.Date);
                res.send(result.slice(0, 10));
            }
            else
                res.status(500).send({ error: "No product found" });
        });
    }
}
exports.ProductController = ProductController;
const productController = new ProductController();
exports.default = productController.router;
