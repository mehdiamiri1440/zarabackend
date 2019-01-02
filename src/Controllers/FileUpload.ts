import { Router, Request, Response, NextFunction } from "express";
const uuidv1 = require("uuid/v1");
export class FileController {
  router: Router;
  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    this.router.post("/", this.uploadFile);
  }

  uploadFile(req: Request, res: Response, next: NextFunction) {
    console.log("Object.keys(req)", Object.keys(req));
    console.log("req.body", req.body);
    if (req["files"]) {
      let sampleFile = req["files"][Object.keys(req["files"])[0]];
      let filename = uuidv1();
      sampleFile.mv(
        `${process.env.FILE_SAVE_URL}/UploadedFiles/${filename}.jpg`,
        function(err) {
          if (err) return res.status(500).send(err);

          res.send(filename);
        }
      );
    }
    console.log("aaaaaaaaaa");
  }
}
const fileController = new FileController();

export default fileController.router;
