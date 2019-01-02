import { Request, Response, NextFunction } from "express";
import { CategoryManager } from "../Logic/Managers/CategoryManager";
import { BaseRouter } from "../Repositories/Utility/BaseRouter";

export class CategoryController extends BaseRouter {
  constructor() {
    super(CategoryManager);
  }

  init() {
    super.init();
  }
}
const categoryController = new CategoryController();

export default categoryController.router;
