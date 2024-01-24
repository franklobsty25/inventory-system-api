"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginateCustomerModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const contant_1 = require("../constants/contant");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const Schema = mongoose_1.default.Schema;
const CustomerSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    middlename: { type: String, required: false },
    phoneNumber: { type: Number, required: true, unique: true },
    email: { type: String, required: true },
    address1: { type: String, required: true },
    address2: { type: String, required: false },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });
CustomerSchema.plugin(mongoose_paginate_v2_1.default);
const PaginateCustomerModel = mongoose_1.default.model(contant_1.CUSTOMER, CustomerSchema);
exports.PaginateCustomerModel = PaginateCustomerModel;
//# sourceMappingURL=customer.model.js.map