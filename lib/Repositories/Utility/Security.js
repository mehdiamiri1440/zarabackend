"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const salt = bcryptjs_1.genSaltSync(10);
class Security {
    generatePassword() {
        let password = "", possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 8; i++)
            password += possible.charAt(Math.floor(Math.random() * possible.length));
        return password;
    }
    hashText(text) {
        return new Promise((resolve, reject) => {
            bcryptjs_1.hash(text, salt).then(hashedText => {
                resolve(hashedText);
            });
        });
    }
    compareText(text, hashedText) {
        return bcryptjs_1.compareSync(text, hashedText);
    }
}
exports.Security = Security;
