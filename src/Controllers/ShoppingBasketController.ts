import { Request, Response, NextFunction } from "express";
import { ShoppingBasketManager } from "../Logic/Managers/ShoppingBasketManager";
import { BaseRouter } from "../Repositories/Utility/BaseRouter";

export class ShoppingBasketController extends BaseRouter {
  constructor() {
    super(ShoppingBasketManager);
  }

  init() {
    super.init();
  }
}
const shoppingBasketController = new ShoppingBasketController();

export default shoppingBasketController.router;
