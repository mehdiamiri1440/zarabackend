"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserManager_1 = require("../Logic/Managers/UserManager");
const BaseRouter_1 = require("../Repositories/Utility/BaseRouter");
const Security_1 = require("../Repositories/Utility/Security");
const EmailManager_1 = require("../Infrastructure/EmailManager");
class CountryController extends BaseRouter_1.BaseRouter {
    constructor() {
        super(UserManager_1.UserManager);
    }
    init() {
        super.init();
        this.router.post("/login", this.login);
        this.router.post("/signup", this.signup);
        this.router.post("/resetpassword", this.resetPassword);
        this.router.post("/search", this.search);
        this.router.get("/showme", this.showMe);
        this.router.get("/isuserlogin", this.isUserLogin);
        this.router.get("/logout", this.logout);
        // this.router.post("/a", this.a);
        this.router.post("/b", this.b);
    }
    // a(req: Request, res: Response, next: NextFunction) {
    //   req.session.username = "asdasd";
    //   console.log(req.session.username);
    //   res.send("ok");
    // }
    b(req, res, next) {
        res.send(req["session"].userId);
    }
    login(req, res, next) {
        let manager = new UserManager_1.UserManager();
        manager.getUserByEmail(req.body.email, function (err, result) {
            if (err)
                res.status(500).send({ error: err });
            else if (result.length === 0)
                res.status(500).send({ error: "Wrong email or password" });
            else {
                let securityManager = new Security_1.Security();
                if (securityManager.compareText(req.body.password, result[0].password)) {
                    req["session"].userId = result[0]._id;
                    delete result[0]._id;
                    res.send(result[0]);
                }
                else
                    res.status(500).send({ error: err });
            }
        });
    }
    logout(req, res, next) {
        req["session"].destroy();
        res.send("");
    }
    showMe(req, res, next) {
        let manager = new UserManager_1.UserManager();
        manager.showMe(req["session"].userId, (error, response) => {
            if (error)
                res.status(500).send({ error });
            res.send(response);
        });
    }
    signup(req, res, next) {
        let manager = new UserManager_1.UserManager(), error = [];
        if (req.body.password.length < 8)
            error.push("Password is too short");
        if (req.body.username.length < 8)
            error.push("Username is too short");
        manager.find({ $or: [{ username: "" }, { email: "" }] }, function (err, result) {
            if (err)
                res.status(500).send({ error: err });
            else if (result.length > 0) {
                if (req.body.username === result[0].username)
                    error.push("Duplicated Username");
                if (req.body.email === result[0].email)
                    error.push("Duplicated Email");
                res.status(500).send({ error });
            }
            else {
                if (error.length > 0)
                    res.status(500).send(error);
                let securityManager = new Security_1.Security();
                securityManager
                    .hashText(req.body.password)
                    .then((hashedPassword) => {
                    req.body.password = hashedPassword;
                    manager.signup(req.body, function (err, result) {
                        if (err)
                            res.status(500).send({ error: err });
                        else
                            res.send(result);
                    });
                });
            }
        });
    }
    resetPassword(req, res, next) {
        let manager = new UserManager_1.UserManager(), securityManager = new Security_1.Security(), password = securityManager.generatePassword();
        securityManager.hashText(password).then((hashedPassword) => {
            manager.resetPassword(req.body.email, hashedPassword, function (err, result) {
                if (err)
                    res.status(500).send({ error: err });
                else {
                    let emailManager = new EmailManager_1.EmailManager();
                    emailManager.sendEMail(req.body.email, "Reset Password", "asdasdasd");
                    res.send(result);
                }
            });
        });
    }
    search(req, res, next) {
        let manager = new UserManager_1.UserManager();
        manager.search(req.body.phrase, (err, result) => {
            if (err)
                res.status(500).send({ error: err });
            res.send(result);
        });
    }
    isUserLogin(req, res, next) {
        if (req["session"].userId)
            res.send(true);
        else
            res.send(false);
    }
}
exports.CountryController = CountryController;
const countryController = new CountryController();
exports.default = countryController.router;
