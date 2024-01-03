"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editSupplierSchema = exports.createSupplierSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const createSupplierSchema = joi_1.default.object({
    firstname: joi_1.default.string().min(3).max(30).trim().required(),
    lastname: joi_1.default.string().min(3).max(30).trim().required(),
    middlename: joi_1.default.string().min(3).max(30).trim(),
    phoneNumber: joi_1.default.string().trim().required(),
    email: joi_1.default.string().email().trim(),
    address1: joi_1.default.string().required().trim(),
    address2: joi_1.default.string().trim(),
});
exports.createSupplierSchema = createSupplierSchema;
const editSupplierSchema = joi_1.default.object({
    firstname: joi_1.default.string().min(3).max(30).trim(),
    lastname: joi_1.default.string().min(3).max(30).trim(),
    middlename: joi_1.default.string().min(3).max(30).trim(),
    phoneNumber: joi_1.default.string().trim(),
    email: joi_1.default.string().email().trim(),
    address1: joi_1.default.string().trim(),
    address2: joi_1.default.string().trim(),
});
exports.editSupplierSchema = editSupplierSchema;
