"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var MongoClient = require("mongodb").MongoClient;
const chalk = require("chalk");
class DataAccess {
    constructor() { }
    static connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (DataAccess.ModelInstance)
                return DataAccess.ModelInstance;
            MongoClient.connect(process.env.DB_URL, { useNewUrlParser: true }, function (err, client) {
                //db.collection("tickets", function(err, collection) {});
                DataAccess.ModelInstance = client.db(process.env.DB_NAME);
            });
        });
    }
    static test() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(chalk.cyan("DB Connection Starting..."));
            yield DataAccess.connect();
            console.log(chalk.bold.green("Connect to DB Successfully!"));
        });
    }
}
module.exports = DataAccess;
