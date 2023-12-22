"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginateSupplierModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const contants_1 = require("../constants/contants");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const Schema = mongoose_1.default.Schema;
const SupplierSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    middlename: { type: String, required: false },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String, required: false, unique: true },
    address1: { type: String, required: true },
    address2: { type: String, required: false },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true });
SupplierSchema.plugin(mongoose_paginate_v2_1.default);
const PaginateSupplierModel = mongoose_1.default.model(contants_1.SUPPLIER, SupplierSchema);
exports.PaginateSupplierModel = PaginateSupplierModel;
