"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editOrderDetailSchema = exports.createOrderDetailSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const createOrderDetailSchema = joi_1.default.object({
    description: joi_1.default.string().trim(),
    quantity: joi_1.default.number(),
    unitPrice: joi_1.default.number().required(),
});
exports.createOrderDetailSchema = createOrderDetailSchema;
const editOrderDetailSchema = joi_1.default.object({
    description: joi_1.default.string(),
    quantity: joi_1.default.number(),
    unitPrice: joi_1.default.number(),
});
exports.editOrderDetailSchema = editOrderDetailSchema;
//# sourceMappingURL=order-detail.schema.js.map