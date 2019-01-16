"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class BaseRouter {
    constructor(type) {
        this.router = express_1.Router();
        this.controllerType = type;
        this.init();
    }
    init() {
        this.router.get("/", (req, res, next) => {
            this.getAll(this, req, res, next);
        });
        this.router.get("/id/:id", (req, res, next) => {
            this.getOne(this, req, res, next);
        });
        this.router.post("/", (req, res, next) => {
            this.add(this, req, res, next);
        });
        this.router.put("/", (req, res, next) => {
            this.update(this, req, res, next);
        });
        this.router.delete("/", (req, res, next) => {
            this.delete(this, req, res, next);
        });
    }
    getAll(that, req, res, next) {
        var manager = new that.controllerType();
        manager.find({}, function (err, result) {
            res.send(result);
        });
    }
    getOne(that, req, res, next) {
        var manager = new that.controllerType();
        manager.findOne(req.params.id, function (err, result) {
            res.send(result);
        });
    }
    add(that, req, res, next) {
        var manager = new that.controllerType();
        manager.create(req.body, function (err, result) {
            res.send(result);
        });
    }
    update(that, req, res, next) {
        var manager = new that.controllerType();
        console.log("req.body:", req.body);
        manager.update(req.body, function (err, result) {
            res.send(result);
        });
    }
    delete(that, req, res, next) {
        var manager = new that.controllerType();
        manager.delete(req.body.id, function (err, result) {
            res.send(result);
        });
    }
    login(req, res, next) {
        console.log("ewfefw");
        res.send("ewfewf");
    }
}
exports.BaseRouter = BaseRouter;
