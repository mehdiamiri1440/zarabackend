import { Request, Response, NextFunction } from "express";
import { ProductManager } from "../Logic/Managers/ProductManager";
import { BaseRouter } from "../Repositories/Utility/BaseRouter";

export class ProductController extends BaseRouter {
  constructor() {
    super(ProductManager);
  }

  init() {
    super.init();
    this.router.get("/getByCategoryName", this.getByCategoryName);
    this.router.get("/search", this.search);
  }

  getByCategoryName(req: Request, res: Response, next: NextFunction) {
    let manager = new ProductManager();
    manager.getByCategory(req.body.categoryName, function(err, result) {
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
