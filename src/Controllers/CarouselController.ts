import { Request, Response, NextFunction } from "express";
import { CarouselManager } from "../Logic/Managers/CarouselManager";
import { BaseRouter } from "../Repositories/Utility/BaseRouter";

export class CategoryController extends BaseRouter {
  constructor() {
    super(CarouselManager);
  }

  init() {
    super.init();
    this.router.post("/getShowenCarousels", this.getShowenCarousels);
  }

  getShowenCarousels(req: Request, res: Response, next: NextFunction) {
    let manager = new CarouselManager();
    manager.find({ show: true }, (error, result) => {
      if (error) res.status(500).send({ error });
      res.send(result);
    });
  }
}
const categoryController = new CategoryController();

export default categoryController.router;
