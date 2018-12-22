"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Inversify_Config_1 = require("../../App_Start/Inversify.Config");
var ObjectId = require("mongodb").ObjectID;
// The class only can be extended
class BaseRepository {
    constructor(entity) {
        this.repository = Inversify_Config_1.myContainer.get("IUnitOfWork");
        this.entity = entity;
    }
    create(item, callback) {
        this.repository.grabInsert(this.entity, [item], callback);
    }
    createWithTTL(item, ttl, callback) {
        this.repository.grabInsertWithTTL(this.entity, [item], ttl, callback);
    }
    update(item, callback) {
        this.repository.grabUpdate(this.entity, [item], callback);
    }
    delete(_id, callback) {
        this.repository.grabDelete(this.entity, [_id], callback);
    }
    createBatch(item, callback) {
        this.repository.grabInsert(this.entity, item, callback);
    }
    updateBatch(item, callback) {
        this.repository.grabUpdate(this.entity, item, callback);
    }
    deleteBatch(_id, callback) {
        this.repository.grabDelete(this.entity, _id, callback);
    }
    find(query, callback) {
        this.repository.getList(this.entity, query, callback);
    }
    findOne(_id, callback) {
        this.repository.getList(this.entity, { _id: ObjectId(_id) }, callback);
    }
}
exports.BaseRepository = BaseRepository;
