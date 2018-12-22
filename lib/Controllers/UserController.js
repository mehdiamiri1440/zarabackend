"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserManager_1 = require("../Logic/Managers/UserManager");
const BaseRouter_1 = require("../Repositories/Utility/BaseRouter");
class CountryController extends BaseRouter_1.BaseRouter {
    constructor() {
        super(UserManager_1.UserManager);
        this.generatePassword = () => {
            let password = "", possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < 8; i++)
                password += possible.charAt(Math.floor(Math.random() * possible.length));
            return password;
        };
    }
    init() {
        super.init();
        this.router.post("/login", this.login);
        this.router.post("/signup", this.signup);
        this.router.post("/resetpassword", this.resetPassword);
    }
    login(req, res, next) {
        var manager = new UserManager_1.UserManager();
        manager.login(req.body.username, function (err, result) {
            if (err)
                res.status(500).send({ error: err });
            else if (result.password === req.body.password)
                res.send(result);
            else
                res.status(500).send({ error: err });
        });
    }
    signup(req, res, next) {
        var manager = new UserManager_1.UserManager();
        manager.signup(req.body, function (err, result) {
            if (err)
                res.status(500).send({ error: err });
            else
                res.send(result);
        });
    }
    resetPassword(req, res, next) {
        var manager = new UserManager_1.UserManager();
        let password = this.generatePassword();
        manager.resetPassword(req.body.email, password, function (err, result) {
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
