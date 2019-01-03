import { Router, Request, Response, NextFunction } from "express";
import { FileManager } from "../Logic/Managers/FileManager";
import * as uuidv1 from "uuid/v1";
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
    var manager = new FileManager();
    if (req["files"]) {
      let sampleFile = req["files"][Object.keys(req["files"])[0]];
      let filename = uuidv1();
      manager.create({ _id: "", guid: filename }, (res, err) => {
        if (err) return res.status(500).send(err);
        sampleFile.mv(
          `${process.env.FILE_SAVE_URL}/UploadedFiles/${filename}.jpg`,
          function(err) {
            if (err) return res.status(500).send(err);
            res.send(filename);
          }
        );
      });
    }
  }
}
const fileController = new FileController();

export default fileController.router;
