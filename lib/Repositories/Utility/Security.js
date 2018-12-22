"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const saltRounds = 10;
class Security {
    static hashText(text, callback) {
        bcrypt.hash(text, saltRounds, callback);
    }
    static compareHash(text, hash, callback) {
        bcrypt.compare(text, hash, callback);
    }
}
exports.Security = Security;
