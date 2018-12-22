"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("../../Repositories/Base/BaseRepository");
class UserManager extends BaseRepository_1.BaseRepository {
    constructor() {
        super("user");
    }
    login(username, callback) {
        this.find({ username: username }, callback);
    }
    signup(user, callback) {
        this.create(user, callback);
    }
    resetPassword(email, password, callback) {
        this.find({ email: email }, (error, result) => {
            if (error)
                callback(error, result);
            else {
                result.password = password;
                this.update(result, callback);
            }
        });
    }
}
exports.UserManager = UserManager;
Object.seal(UserManager);
