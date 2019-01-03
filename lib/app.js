"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cors = require("cors");
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const busboy = require("connect-busboy"); //middleware for form/file upload
const path = require("path"); //used for file path
require("reflect-metadata");
// Controllers
const CountryController_1 = require("./Controllers/CountryController");
const UserController_1 = require("./Controllers/UserController");
const CategoryController_1 = require("./Controllers/CategoryController");
const ProductController_1 = require("./Controllers/ProductController");
const ShoppingBasketController_1 = require("./Controllers/ShoppingBasketController");
// Services
const Permission_1 = require("./Repositories/Utility/Permission");
class App {
    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    // Configure Express middleware.
    middleware() {
        this.express.use(logger("dev"));
        this.express.use(cors());
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(Permission_1.Permission.getAuth);
        this.express.use(Permission_1.Permission.getGlobalBruteForce.getMiddleware({
            key: function (req, res, next) {
                // prevent too many attempts for the same username
                next(req.url);
            }
        }));
        this.express.use(busboy());
        this.express.use(express.static(path.join(__dirname, "public")));
    }
    // Configure API endpoints.
    routes() {
        let router = express.Router();
        this.express.use("/", router);
        this.express.use("/country", CountryController_1.default);
        this.express.use("/user", UserController_1.default);
        this.express.use("/shoppingBasket", ShoppingBasketController_1.default);
        this.express.use("/category", CategoryController_1.default);
        this.express.use("/product", ProductController_1.default);
    }
}
exports.App = App;
exports.default = new App().express;