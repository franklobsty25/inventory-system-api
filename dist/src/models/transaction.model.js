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
exports.PaginateTransactionModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const contant_1 = require("../constants/contant");
const Schema = mongoose_1.default.Schema;
const TransactionSchema = new Schema({
    type: { type: String, default: contant_1.TransactionTypeEnum.RECEIPT },
    quantity: { type: Number, default: 1 },
    date: { type: Date, default: new Date() },
    isDeleted: { type: Boolean, default: false },
    product: { type: mongoose_1.SchemaTypes.ObjectId, required: true, ref: contant_1.PRODUCT },
}, { timestamps: true });
TransactionSchema.plugin(mongoose_paginate_v2_1.default);
const PaginateTransactionModel = mongoose_1.default.model(contant_1.TRANSACTION, TransactionSchema);
exports.PaginateTransactionModel = PaginateTransactionModel;
//# sourceMappingURL=transaction.model.js.map