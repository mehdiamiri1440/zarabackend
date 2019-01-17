"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("../../Repositories/Base/BaseRepository");
const mongodb_1 = require("mongodb");
class UserManager extends BaseRepository_1.BaseRepository {
    constructor() {
        super("user");
    }
    getUserByEmail(email, callback) {
        this.find({ email: email }, callback);
    }
    signup(user, callback) {
        this.create(user, callback);
    }
    resetPassword(email, password, callback) {
        this.find({ email: email }, (error, result) => {
            if (error)
                callback(error, result);
            else {
                result[0].password = password;
                this.update(result[0], callback);
            }
        });
    }
    search(phrase, callback) {
        this.find({
            $or: [
                { firstName: new RegExp(".*" + phrase + ".*") },
                { lastName: new RegExp(".*" + phrase + ".*") },
                { username: new RegExp(".*" + phrase + ".*") }
            ]
        }, callback);
    }
    showMe(userId, callback) {
        this.find({ _id: mongodb_1.ObjectId(userId) }, callback);
    }
}
exports.UserManager = UserManager;
Object.seal(UserManager);
