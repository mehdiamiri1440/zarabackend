import { Router, Response, NextFunction, Request } from "express";

export class BaseRouter {
  router: Router;
  controllerType: any;

  constructor(type: any) {
    this.router = Router();
    this.controllerType = type;
    this.init();
  }

  init() {
    this.router.get("/", (req: Request, res: Response, next: NextFunction) => {
      this.getAll(this, req, res, next);
    });
    this.router.get(
      "/id/:id",
      (req: Request, res: Response, next: NextFunction) => {
        this.getOne(this, req, res, next);
      }
    );
    this.router.post("/", (req: Request, res: Response, next: NextFunction) => {
      this.add(this, req, res, next);
    });
    this.router.put("/", (req: Request, res: Response, next: NextFunction) => {
      this.update(this, req, res, next);
    });
    this.router.delete(
      "/",
      (req: Request, res: Response, next: NextFunction) => {
        this.delete(this, req, res, next);
      }
    );
  }

  getAll(that: any, req: Request, res: Response, next: NextFunction) {
    var manager = new that.controllerType();
    manager.find({}, function(err, result) {
      res.send(result);
    });
  }

  getOne(that: any, req: Request, res: Response, next: NextFunction) {
    var manager = new that.controllerType();
    manager.findOne(req.params.id, function(err, result) {
      res.send(result);
    });
  }

  add(that: any, req: Request, res: Response, next: NextFunction) {
    var manager = new that.controllerType();
    manager.create(req.body, function(err, result) {
      res.send(result);
    });
  }

  update(that: any, req: Request, res: Response, next: NextFunction) {
    var manager = new that.controllerType();
    manager.update(req.body, function(err, result) {
      res.send(result);
    });
  }

  delete(that: any, req: Request, res: Response, next: NextFunction) {
    var manager = new that.controllerType();
    manager.delete(req.body.id, function(err, result) {
      res.send(result);
    });
  }

  login(req: Request, res: Response, next: NextFunction) {
    console.log("ewfefw");
    res.send("ewfewf");
  }
}
