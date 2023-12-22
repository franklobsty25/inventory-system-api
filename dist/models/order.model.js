"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginateOrderModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const contants_1 = require("../constants/contants");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const Schema = mongoose_1.default.Schema;
const OrderSchema = new Schema({
    amount: { type: Number, required: true },
    status: { type: String, default: contants_1.OrderStatusEnum.PENDING },
    date: { type: Date, default: new Date() },
    completedDate: { type: Date, default: new Date() },
    isDeleted: { type: Boolean, default: false },
    customer: { type: mongoose_1.SchemaTypes.ObjectId, require: true, ref: contants_1.CUSTOMER }
}, { timestamps: true });
OrderSchema.plugin(mongoose_paginate_v2_1.default);
const PaginateOrderModel = mongoose_1.default.model(contants_1.ORDER, OrderSchema);
exports.PaginateOrderModel = PaginateOrderModel;
