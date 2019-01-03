import { Request, Response, NextFunction } from "express";
import { UserManager } from "../Logic/Managers/UserManager";
import { BaseRouter } from "../Repositories/Utility/BaseRouter";
import { Security } from "../Repositories/Utility/Security";
import { EmailManager } from "../Infrastructure/EmailManager";

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
    let manager = new UserManager();
    manager.getUserByEmail(req.body.email, function(err, result) {
      if (err) res.status(500).send({ error: err });
      else {
        let securityManager = new Security();
        if (
          securityManager.compareText(req.body.password, result[0].password)
        ) {
          delete result[0]._id;
          res.send(result[0]);
        } else res.status(500).send({ error: err });
      }
    });
  }
  signup(req: Request, res: Response, next: NextFunction) {
    let manager = new UserManager(),
      securityManager = new Security();
    securityManager
      .hashText(req.body.password)
      .then((hashedPassword: string) => {
        req.body.password = hashedPassword;
        manager.signup(req.body, function(err, result) {
          if (err) res.status(500).send({ error: err });
          else res.send(result);
        });
      });
  }
  resetPassword(req: Request, res: Response, next: NextFunction) {
    let manager = new UserManager(),
      securityManager = new Security(),
      password = securityManager.generatePassword();
    securityManager.hashText(password).then((hashedPassword: string) => {
      manager.resetPassword(req.body.email, hashedPassword, function(
        err,
        result
      ) {
        if (err) res.status(500).send({ error: err });
        else {
          let emailManager = new EmailManager();
          emailManager.sendEMail(req.body.email, "Reset Password", "asdasdasd");
          res.send(result);
        }
      });
    });
  }
}
const countryController = new CountryController();

export default countryController.router;