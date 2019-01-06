"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FileManager_1 = require("../Logic/Managers/FileManager");
const uuidv1 = require("uuid/v1");
const BaseRouter_1 = require("../Repositories/Utility/BaseRouter");
const fs = require("fs");
class FileController extends BaseRouter_1.BaseRouter {
  constructor() {
    super(FileManager_1.FileManager);
  }
  init() {
    super.init();
    this.router.post("/upload", this.uploadFile);
    this.router.get("/:_id", this.fileHandler);
  }
  uploadFile(req, res, next) {
    let manager = new FileManager_1.FileManager();
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
  fileHandler(req, res, next) {
    res.sendFile(`${process.env.FILE_SAVE_URL}/${req.params._id}.jpg`);
  }
}
exports.FileController = FileController;
const fileController = new FileController();
exports.default = fileController.router;
