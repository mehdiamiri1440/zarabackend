"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExpressBrute = require("express-brute"), 
//   MemcacheStore = require("express-brute-memcached"),
store;
store = new ExpressBrute.MemoryStore();
class Permission {
    static getAuth(req, res, next) {
        // console.log(req.method);
        // res.status(403).send({error: 'access denied'});
        next();
    }
    static bruteFailCallback(req, res, next, nextValidRequestDate) {
        res.status(429).send("too many request from your ip!");
    }
    static bruteHandleStateError(error) {
        console.log("error");
    }
}
Permission.getGlobalBruteForce = new ExpressBrute(store, {
    freeRetries: 100,
    attachResetToRequest: false,
    refreshTimeoutOnRequest: false,
    minWait: 3000,
    maxWait: 30000,
    lifetime: 60 * 60,
    failCallback: Permission.bruteFailCallback,
    handleStoreError: Permission.bruteHandleStateError
});
exports.Permission = Permission;
