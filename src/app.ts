var cors = require("cors");
import * as express from "express";
import * as logger from "morgan";
import * as bodyParser from "body-parser";

import * as busboy from "connect-busboy"; //middleware for form/file upload
import * as path from "path"; //used for file path

import "reflect-metadata";

var fileUpload = require("express-fileupload");

// Controllers
import CountryController from "./Controllers/CountryController";
import UserController from "./Controllers/UserController";
import CategoryController from "./Controllers/CategoryController";
import ProductController from "./Controllers/ProductController";
import ShoppingBasketController from "./Controllers/ShoppingBasketController";
import FileController from "./Controllers/FileController";
import CarouselController from "./Controllers/CarouselController";

// Services
import { Permission } from "./Repositories/Utility/Permission";

export class App {
  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger("dev"));
    this.express.use(cors());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(Permission.getAuth);
    this.express.use(
      fileUpload({
        limits: { fileSize: 30 * 1024 * 1024 }
      })
    );
    this.express.use(
      Permission.getGlobalBruteForce.getMiddleware({
        key: function(req, res, next) {
          // prevent too many attempts for the same username
          next(req.url);
        }
      })
    );

    this.express.use(busboy());
    this.express.use(express.static(path.join(__dirname, "public")));
  }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();
    this.express.use("/", router);
    this.express.use("/country", CountryController);
    this.express.use("/user", UserController);
    this.express.use("/shoppingBasket", ShoppingBasketController);
    this.express.use("/category", CategoryController);
    this.express.use("/product", ProductController);
    this.express.use("/document", FileController);
    this.express.use("/carousel", CarouselController);
  }
}

export default new App().express;
