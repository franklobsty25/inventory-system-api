"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editOrderSchema = exports.createOrderSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const createOrderSchema = joi_1.default.object({
    amount: joi_1.default.number().required(),
    date: joi_1.default.date(),
});
exports.createOrderSchema = createOrderSchema;
const editOrderSchema = joi_1.default.object({
    amount: joi_1.default.number(),
    status: joi_1.default.string().lowercase().valid('pending', 'processing', 'completed'),
    date: joi_1.default.date(),
});
exports.editOrderSchema = editOrderSchema;
//# sourceMappingURL=order.schema.js.map