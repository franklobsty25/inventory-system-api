"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editLocationSchema = exports.createLocationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const createLocationSchema = joi_1.default.object({
    name: joi_1.default.string().trim().required(),
    description: joi_1.default.string().trim(),
    type: joi_1.default.string().trim()
});
exports.createLocationSchema = createLocationSchema;
const editLocationSchema = joi_1.default.object({
    name: joi_1.default.string().trim(),
    description: joi_1.default.string().trim(),
    type: joi_1.default.string().trim()
});
exports.editLocationSchema = editLocationSchema;
