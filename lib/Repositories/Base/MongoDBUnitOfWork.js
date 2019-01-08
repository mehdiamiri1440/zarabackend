"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const DataAccess = require("./DataAccess");
var ObjectId = require("mongodb").ObjectID;
let MongoDBUnitOfWork = class MongoDBUnitOfWork {
    constructor() {
        this._collection = DataAccess.ModelInstance;
    }
    getList(tableName, query, callback) {
        this._collection.collection(tableName, function (err, collection) {
            collection.find(query).toArray(callback);
        });
    }
    getListAsync(tableName, query, callback) {
        this._collection.instance[tableName].findAsync(query, { raw: true, allow_filtering: true }, callback);
    }
    grabInsert(tableName, entity, callback) {
        entity.map(x => {
            delete x["_id"];
        });
        this._collection.collection(tableName, function (err, collection) {
            collection.insertMany(entity).then(function (result, err) {
                callback(err, result.result);
            });
        });
    }
    grabInsertWithTTL(tableName, entity, ttl, callback) {
        this._collection.collection(tableName, function (err, collection) {
            collection.insertMany(entity).then(function (result, err) {
                callback(err, result.result);
            });
        });
    }
    grabUpdate(tableName, entity, callback) {
        this._collection.collection(tableName, function (err, collection) {
            entity.forEach(function (val, index) {
                let id = val["_id"];
                delete val["_id"];
                collection
                    .update({ _id: ObjectId(id) }, val)
                    .then(function (result, err) {
                    callback(err, result.result);
                });
            });
        });
    }
    grabDelete(tableName, id, callback) {
        this._collection.collection(tableName, function (err, collection) {
            for (let i in id)
                id[i] = ObjectId(id[i]);
            collection.deleteMany({ _id: { $in: id } }).then(function (result, err) {
                callback(err, result.result);
            });
        });
    }
    markNew(tableName, entity, queryNumber) {
        return "";
    }
    markDirty(tableName, entity, queryNumber) {
        return "";
    }
    markDeleted(tableName, entity, queryNumber) {
        return "";
    }
    markList(tableName, query, queryNumber) {
        return "";
    }
    commit(tableName, queryNumber, callback) { }
    commitAsync(tableName, queryNumber, callback) { }
    rollback(tableName, queryNumber, callback) { }
};
MongoDBUnitOfWork = __decorate([
    inversify_1.injectable()
], MongoDBUnitOfWork);
exports.MongoDBUnitOfWork = MongoDBUnitOfWork;
