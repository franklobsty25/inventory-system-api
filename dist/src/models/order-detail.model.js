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
exports.PaginateOrderDetailModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const contant_1 = require("../constants/contant");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const Schema = mongoose_1.default.Schema;
const OrderDetailSchema = new Schema({
    description: { type: String, required: false },
    quantity: { type: Number, default: 1 },
    unitPrice: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
    order: { type: mongoose_1.SchemaTypes.ObjectId, required: true, ref: contant_1.ORDER },
    product: { type: mongoose_1.SchemaTypes.ObjectId, required: true, ref: contant_1.PRODUCT },
}, { timestamps: true });
OrderDetailSchema.plugin(mongoose_paginate_v2_1.default);
const PaginateOrderDetailModel = mongoose_1.default.model(contant_1.ORDER_DETAIL, OrderDetailSchema);
exports.PaginateOrderDetailModel = PaginateOrderDetailModel;
//# sourceMappingURL=order-detail.model.js.map