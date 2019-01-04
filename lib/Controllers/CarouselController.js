"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CarouselManager_1 = require("../Logic/Managers/CarouselManager");
const BaseRouter_1 = require("../Repositories/Utility/BaseRouter");
class CategoryController extends BaseRouter_1.BaseRouter {
    constructor() {
        super(CarouselManager_1.CarouselManager);
    }
    init() {
        super.init();
        this.router.post("/getShowenCarousels", this.getShowenCarousels);
    }
    getShowenCarousels(req, res, next) {
        let manager = new CarouselManager_1.CarouselManager();
        manager.find({ show: true }, (error, result) => {
            if (error)
                res.status(500).send({ error });
            res.send(result);
        });
    }
}
exports.CategoryController = CategoryController;
const categoryController = new CategoryController();
exports.default = categoryController.router;
