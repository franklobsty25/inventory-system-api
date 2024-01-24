"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginateLocationModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const contant_1 = require("../constants/contant");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const Schema = mongoose_1.default.Schema;
const LocationSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    type: { type: String, default: contant_1.LocationTypeEnum.SHELVES },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });
LocationSchema.plugin(mongoose_paginate_v2_1.default);
const PaginateLocationModel = mongoose_1.default.model(contant_1.LOCATION, LocationSchema);
exports.PaginateLocationModel = PaginateLocationModel;
//# sourceMappingURL=location.model.js.map