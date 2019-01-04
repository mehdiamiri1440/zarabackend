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
    this.router.get("/getByCategoryName", this.getByCategoryName);
    this.router.get("/search", this.search);
  }
  getByCategoryName(req, res, next) {
    let manager = new ProductManager_1.ProductManager();
    manager.getByCategory(req.body.categoryName, function(err, result) {
      if (err) res.status(500).send({ error: err });
      else res.send(result);
    });
  }
  search(req, res, next) {
    let manager = new ProductManager_1.ProductManager();
    manager.search(req.body.phrase, function(err, result) {
      if (err) res.status(500).send({ error: err });
      else res.send(result);
    });
  }
  getIsNew(req, res, next) {
    let manager = new ProductManager_1.ProductManager();
    manager.getIsNew((err, result) => {
      if (err) res.status(500).send({ error: err });
      else if (result.length > 0) {
        result.sort((a, b) => a.Date - b.Date);
        res.send(result.slice(0, 10));
      } else res.status(500).send({ error: "No product found" });
    });
  }
}
exports.ProductController = ProductController;
const productController = new ProductController();
exports.default = productController.router;
