"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("../../Repositories/Base/BaseRepository");
class CarouselManager extends BaseRepository_1.BaseRepository {
    constructor() {
        super("carousel");
    }
}
exports.CarouselManager = CarouselManager;
Object.seal(CarouselManager);
