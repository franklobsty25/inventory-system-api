"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editProductSchema = exports.createProductSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const createProductSchema = joi_1.default.object({
    name: joi_1.default.string().trim().required(),
    description: joi_1.default.string().trim().required(),
    category: joi_1.default.string()
        .lowercase()
        .valid('capsule', 'cosmetic', 'grocery', 'syrup', 'tablet')
        .trim()
        .required(),
    unitPrice: joi_1.default.number().required(),
    quantity: joi_1.default.number().required(),
    reorder: joi_1.default.boolean(),
});
exports.createProductSchema = createProductSchema;
const editProductSchema = joi_1.default.object({
    name: joi_1.default.string().trim(),
    description: joi_1.default.string().trim(),
    category: joi_1.default.string()
        .lowercase()
        .valid('capsule', 'cosmetic', 'grocery', 'syrup', 'tablet'),
    unitPrice: joi_1.default.number(),
    quantity: joi_1.default.number(),
    reorder: joi_1.default.boolean(),
});
exports.editProductSchema = editProductSchema;
