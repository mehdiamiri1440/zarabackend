import { Request, Response, NextFunction } from "express";
import { CountryManager } from "../Logic/Managers/CountryManager";
import { BaseRouter } from "../Repositories/Utility/BaseRouter";

export class CountryController extends BaseRouter {
  constructor() {
    super(CountryManager);
  }

  init() {
    super.init();
    this.router.get("/get", this.get);
  }

  get(req: Request, res: Response, next: NextFunction) {
    let manager = new CountryManager();
    manager.get(function(err, result) {
      if (err) res.status(500).send({ error: err });
      else res.send(result);
    });
  }
}
const countryController = new CountryController();

export default countryController.router;
