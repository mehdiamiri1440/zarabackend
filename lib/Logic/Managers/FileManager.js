"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("../../Repositories/Base/BaseRepository");
class FileManager extends BaseRepository_1.BaseRepository {
    constructor() {
        super("file");
    }
}
exports.FileManager = FileManager;
Object.seal(FileManager);
