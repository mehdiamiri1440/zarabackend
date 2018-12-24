"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("../../Repositories/Base/BaseRepository");
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
                console.log(result[0].password, password);
                result[0].password = password;
                this.update(result[0], callback);
            }
        });
    }
}
exports.UserManager = UserManager;
Object.seal(UserManager);
