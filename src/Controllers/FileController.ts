import { Request, Response, NextFunction } from "express";
import { FileManager } from "../Logic/Managers/FileManager";
import * as uuidv1 from "uuid/v1";
import { BaseRouter } from "../Repositories/Utility/BaseRouter";
var fs = require("fs");
export class FileController extends BaseRouter {
  constructor() {
    super(FileManager);
  }

  init() {
    super.init();
    this.router.post("/upload", this.uploadFile);
  }

  uploadFile(req: Request, res: Response, next: NextFunction) {
    var manager = new FileManager();
    if (req["files"]) {
      let sampleFile = req["files"][Object.keys(req["files"])[0]],
        filename = uuidv1();
      manager.create({ _id: "", guid: filename }, (err, result) => {
        if (err) return res.status(500).send({ error: err, a: "qweqwe" });
        fs.writeFile(
          `${process.env.FILE_SAVE_URL}/UploadFiles/${filename}.jpg`,
          new Uint8Array(Buffer.from(sampleFile.data)),
          function(err) {
            if (err) return res.status(500).send({ error: err, a: "zxczxc" });
            res.send({ filename });
          }
        );
      });
    }
  }
}
const fileController = new FileController();

export default fileController.router;
