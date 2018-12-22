import { Request, Response, NextFunction } from "express";
import { UserManager } from "../Logic/Managers/UserManager";
import { BaseRouter } from "../Repositories/Utility/BaseRouter";

export class CountryController extends BaseRouter {
  constructor() {
    super(UserManager);
  }

  init() {
    super.init();
    this.router.post("/login", this.login);
    this.router.post("/signup", this.signup);
    this.router.post("/resetpassword", this.resetPassword);
  }
  login(req: Request, res: Response, next: NextFunction) {
    var manager = new UserManager();
    manager.login(req.body.username, function(err, result) {
      if (err) res.status(500).send({ error: err });
      else if (result.password === req.body.password) res.send(result);
      else res.status(500).send({ error: err });
    });
  }
  signup(req: Request, res: Response, next: NextFunction) {
    var manager = new UserManager();
    manager.signup(req.body, function(err, result) {
      if (err) res.status(500).send({ error: err });
      else res.send(result);
    });
  }
  resetPassword(req: Request, res: Response, next: NextFunction) {
    var manager = new UserManager();
    let password = this.generatePassword();
    manager.resetPassword(req.body.email, password, function(err, result) {
      if (err) res.status(500).send({ error: err });
      else res.send(result);
    });
  }

  generatePassword = () => {
    let password = "",
      possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 8; i++)
      password += possible.charAt(Math.floor(Math.random() * possible.length));
    return password;
  };
}
const countryController = new CountryController();

export default countryController.router;
