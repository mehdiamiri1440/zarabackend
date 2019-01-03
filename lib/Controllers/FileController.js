"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FileManager_1 = require("../Logic/Managers/FileManager");
const uuidv1 = require("uuid/v1");
class FileController {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.post("/", this.uploadFile);
    }
    uploadFile(req, res, next) {
        var manager = new FileManager_1.FileManager();
        if (req["files"]) {
            let sampleFile = req["files"][Object.keys(req["files"])[0]];
            let filename = uuidv1();
            manager.create({ _id: "", guid: filename }, (res, err) => {
                if (err)
                    return res.status(500).send(err);
                sampleFile.mv(`${process.env.FILE_SAVE_URL}/UploadedFiles/${filename}.jpg`, function (err) {
                    if (err)
                        return res.status(500).send(err);
                    res.send(filename);
                });
            });
        }
    }
}
exports.FileController = FileController;
const fileController = new FileController();
exports.default = fileController.router;
