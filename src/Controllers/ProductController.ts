import { Request, Response, NextFunction } from "express";
import { ProductManager } from "../Logic/Managers/ProductManager";
import { BaseRouter } from "../Repositories/Utility/BaseRouter";

export class ProductController extends BaseRouter {
  constructor() {
    super(ProductManager);
  }

  init() {
    super.init();
    this.router.get("/getByCategoryName/:categoryName", this.getByCategoryName);
    this.router.get("/search", this.search);
    this.router.get("/itemDetail", this.itemDetail);
    this.router.get("/getIsNew", this.getIsNew);
  }

  itemDetail(req: Request, res: Response, next: NextFunction) {
    let manager = new ProductManager();
    manager.find({ _id: req.body._id, isAvailable: true }, (err, product) => {
      if (err || product.length === 0) res.status(500).send({ error: err });
      product = product[0];
      manager.find(
        { hashTag: product.hashTag, isAvailable: true },
        (err, similarProducts) => {
          if (err) res.status(500).send({ error: err });
          res.send({ product, similarProducts });
        }
      );
    });
  }

  getByCategoryName(req: Request, res: Response, next: NextFunction) {
    let manager = new ProductManager();
    manager.getByCategory(req.params.categoryName, function(err, result) {
      if (err) res.status(500).send({ error: err });
      else res.send(result);
    });
  }
  search(req: Request, res: Response, next: NextFunction) {
    let manager = new ProductManager();
    manager.search(req.body.phrase, function(err, result) {
      if (err) res.status(500).send({ error: err });
      else res.send(result);
    });
  }
  getIsNew(req: Request, res: Response, next: NextFunction) {
    let manager = new ProductManager();
    manager.getIsNew((err, result) => {
      if (err) res.status(500).send({ error: err });
      else if (result.length > 0) {
        result.sort((a, b) => a.Date - b.Date);
        res.send(result.slice(0, 10));
      } else res.status(500).send({ error: "No product found" });
    });
  }
}
const productController = new ProductController();

export default productController.router;
