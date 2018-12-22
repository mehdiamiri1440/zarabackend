"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const MongoDBUnitOfWork_1 = require("../Repositories/Base/MongoDBUnitOfWork");
const myContainer = new inversify_1.Container();
exports.myContainer = myContainer;
myContainer.bind("IUnitOfWork").to(MongoDBUnitOfWork_1.MongoDBUnitOfWork);
