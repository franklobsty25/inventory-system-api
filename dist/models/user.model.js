"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginateUserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const contants_1 = require("../constants/contants");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const Schema = mongoose_1.default.Schema;
const UserSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    middlename: { type: String, required: false },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: contants_1.RolesEnum.SUPERADMIN },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });
UserSchema.plugin(mongoose_paginate_v2_1.default);
const PaginateUserModel = mongoose_1.default.model(contants_1.USER, UserSchema);
exports.PaginateUserModel = PaginateUserModel;
