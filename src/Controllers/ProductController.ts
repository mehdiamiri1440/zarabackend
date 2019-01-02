import { Request, Response, NextFunction } from "express";
import { ProductManager } from "../Logic/Managers/ProductManager";
import { BaseRouter } from "../Repositories/Utility/BaseRouter";

export class ProductController extends BaseRouter {
  constructor() {
    super(ProductManager);
  }

  init() {
    super.init();
    this.router.get("/getByCategoryCode", this.getByCategoryCode);
    this.router.get("/search", this.search);
  }

  getByCategoryCode(req: Request, res: Response, next: NextFunction) {
    let manager = new ProductManager();
    manager.getByCategory(req.body.categoryCode, function(err, result) {
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
}
const productController = new ProductController();

export default productController.router;
