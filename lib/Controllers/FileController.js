"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FileManager_1 = require("../Logic/Managers/FileManager");
const BaseRouter_1 = require("../Repositories/Utility/BaseRouter");
class FileContrtoller extends BaseRouter_1.BaseRouter {
    constructor() {
        super(FileManager_1.FileManager);
        this.uploadFile = (req, res) => {
            // var fstream;
            //       req.pipe(req.busboy);
            //       req.busboy.on('file', function (fieldname, file, filename) {
            //           console.log("Uploading: " + filename);
            //           //Path where image will be uploaded
            //           fstream = fs.createWriteStream(__dirname + '/img/' + filename);
            //           file.pipe(fstream);
            //           fstream.on('close', function () {
            //               console.log("Upload Finished of " + filename);
            //               res.redirect('back');           //where to go next
            //           });
            //       });
        };
    }
    init() {
        super.init();
    }
}
exports.FileContrtoller = FileContrtoller;
const fileContrtoller = new FileContrtoller();
exports.default = fileContrtoller.router;
