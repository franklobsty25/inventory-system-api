"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editTransactionSchema = exports.createTransactionSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const createTransactionSchema = joi_1.default.object({
    quantity: joi_1.default.number(),
    type: joi_1.default.string().lowercase().valid('receipt', 'shipment', 'adjustment'),
    date: joi_1.default.date(),
});
exports.createTransactionSchema = createTransactionSchema;
const editTransactionSchema = joi_1.default.object({
    quantity: joi_1.default.number(),
    type: joi_1.default.string().lowercase().valid('receipt', 'shipment', 'adjustment'),
    date: joi_1.default.date(),
});
exports.editTransactionSchema = editTransactionSchema;
