var cors = require("cors");
import * as express from "express";
import * as logger from "morgan";
import * as bodyParser from "body-parser";
import "reflect-metadata";

// Controllers
import CountryController from "./Controllers/CountryController";
import UserController from "./Controllers/UserController";

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
      Permission.getGlobalBruteForce.getMiddleware({
        key: function(req, res, next) {
          // prevent too many attempts for the same username
          next(req.url);
        }
      })
    );
  }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();
    this.express.use("/", router);
    this.express.use("/country", CountryController);
    this.express.use("/user", UserController);
  }
}

export default new App().express;
