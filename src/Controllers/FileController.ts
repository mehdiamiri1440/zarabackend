import { Request, Response, NextFunction } from "express";
import { FileManager } from "../Logic/Managers/FileManager";
import * as uuidv1 from "uuid/v1";
import { BaseRouter } from "../Repositories/Utility/BaseRouter";
import * as fs from "fs";

export class FileController extends BaseRouter {
  constructor() {
    super(FileManager);
  }

  init() {
    super.init();
    this.router.post("/upload", this.uploadFile);
    this.router.get("/:_id", this.fileHandler);
  }

  uploadFile(req: Request, res: Response, next: NextFunction) {
    let manager = new FileManager();
    if (req["files"]) {
      let sampleFile = req["files"][Object.keys(req["files"])[0]],
        filename = uuidv1();
      manager.create({ _id: "", guid: filename }, (err, result) => {
        if (err) return res.status(500).send({ error: err });
        fs.writeFile(
          `${process.env.FILE_SAVE_URL}/${filename}.jpg`,
          new Uint8Array(Buffer.from(sampleFile.data)),
          function(err) {
            if (err) return res.status(500).send({ error: err });
            res.send({ filename });
          }
        );
      });
    }
  }
  fileHandler(req: Request, res: Response, next: NextFunction) {
    res.sendFile(`${process.env.FILE_SAVE_URL}/${req.params._id}.jpg`);
  }
}
const fileController = new FileController();

export default fileController.router;
