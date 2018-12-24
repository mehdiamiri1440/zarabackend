"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CountryManager_1 = require("../Logic/Managers/CountryManager");
const BaseRouter_1 = require("../Repositories/Utility/BaseRouter");
class CountryController extends BaseRouter_1.BaseRouter {
    constructor() {
        super(CountryManager_1.CountryManager);
    }
    init() {
        super.init();
        this.router.get("/get", this.get);
    }
    get(req, res, next) {
        let manager = new CountryManager_1.CountryManager();
        manager.get(function (err, result) {
            if (err)
                res.status(500).send({ error: err });
            else
                res.send(result);
        });
    }
}
exports.CountryController = CountryController;
const countryController = new CountryController();
exports.default = countryController.router;
