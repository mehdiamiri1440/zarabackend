import { Router, Response, NextFunction, Request } from "express";
var ExpressBrute = require("express-brute"),
  //   MemcacheStore = require("express-brute-memcached"),
  store;

store = new ExpressBrute.MemoryStore();

export class Permission {
  static getAuth(req: Request, res: Response, next: NextFunction) {
    // console.log(req.method);
    // res.status(403).send({error: 'access denied'});
    next();
  }

  static bruteFailCallback(
    req: Request,
    res: Response,
    next: NextFunction,
    nextValidRequestDate: Date
  ) {
    res.status(429).send("too many request from your ip!"); 
  }

  static bruteHandleStateError(error: any) {
    console.log("error");
  }
  static getGlobalBruteForce = new ExpressBrute(store, {
    freeRetries: 100,
    attachResetToRequest: false,
    refreshTimeoutOnRequest: false,
    minWait: 3000,
    maxWait: 30000,
    lifetime: 60 * 60, // 1 Hour (seconds not milliseconds)
    failCallback: Permission.bruteFailCallback,
    handleStoreError: Permission.bruteHandleStateError
  });
}
