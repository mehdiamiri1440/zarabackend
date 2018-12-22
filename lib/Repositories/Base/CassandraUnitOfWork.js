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
let CassandraUnitOfWork = class CassandraUnitOfWork {
    constructor() {
        // var db = new DataAccess();
        this._collection = DataAccess.ModelInstance;
    }
    getList(tableName, query, callback) {
        this._collection.instance[tableName].find(query, { raw: true, allow_filtering: true }, callback);
    }
    getListAsync(tableName, query, callback) {
        this._collection.instance[tableName].findAsync(query, { raw: true, allow_filtering: true }, callback);
    }
    grabInsert(tableName, entity, callback) {
        var queries = [];
        var that = this;
        entity.forEach(function (val, index) {
            delete val["id"];
            var model = new that._collection.instance[tableName](val);
            queries.push(model.save({ return_query: true }));
        });
        this._collection.doBatch(queries, callback);
    }
    grabInsertWithTTL(tableName, entity, ttl, callback) {
        var queries = [];
        var that = this;
        entity.forEach(function (val, index) {
            delete val["id"];
            var model = new that._collection.instance[tableName](val);
            queries.push(model.save({ return_query: true, ttl: ttl }));
        });
        this._collection.doBatch(queries, callback);
    }
    grabUpdate(tableName, entity, callback) {
        let queries = [];
        let that = this;
        entity.forEach(function (val, index) {
            let id = val["id"];
            console.log(id);
            delete val["id"];
            var model = that._collection.instance[tableName].update({ id: that._collection.datatypes.Uuid.fromString(id) }, val, {
                return_query: true
            });
            queries.push(model);
        });
        this._collection.doBatch(queries, callback);
    }
    grabDelete(tableName, id, callback) {
        let queries = [];
        let that = this;
        id.forEach(function (val, index) {
            var model = that._collection.instance[tableName].delete({ id: val }, {
                return_query: true
            });
            queries.push(model);
        });
        this._collection.doBatch(queries, callback);
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
CassandraUnitOfWork = __decorate([
    inversify_1.injectable()
], CassandraUnitOfWork);
exports.CassandraUnitOfWork = CassandraUnitOfWork;
