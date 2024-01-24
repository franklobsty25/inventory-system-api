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
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRoleSchema = exports.editSchema = exports.resetSchema = exports.forgotSchema = exports.changePasswordSchema = exports.loginSchema = exports.signupSchema = void 0;
const Joi = __importStar(require("joi"));
const signupSchema = Joi.object({
    firstname: Joi.string().min(3).max(30).trim().required(),
    lastname: Joi.string().min(3).max(30).trim().required(),
    middlename: Joi.string().min(3).trim().max(30),
    phoneNumber: Joi.string().trim().required(),
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(8).required(),
    repeatPassword: Joi.string().min(8).required(),
    role: Joi.string().lowercase().valid('user', 'admin', 'superadmin'),
}).with('password', 'repeatPassword');
exports.signupSchema = signupSchema;
const loginSchema = Joi.object({
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(8).required(),
});
exports.loginSchema = loginSchema;
const changePasswordSchema = Joi.object({
    oldPassword: Joi.string().min(8).required(),
    newPassword: Joi.string().min(8).required(),
    repeatPassword: Joi.string().min(8).required(),
});
exports.changePasswordSchema = changePasswordSchema;
const forgotSchema = Joi.object({
    email: Joi.string().email().trim().required(),
});
exports.forgotSchema = forgotSchema;
const resetSchema = Joi.object({
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(8).required(),
    repeatPassword: Joi.string().min(8).required(),
});
exports.resetSchema = resetSchema;
const editSchema = Joi.object({
    firstname: Joi.string().min(3).max(30).trim(),
    lastname: Joi.string().min(3).max(30).trim(),
    phoneNumber: Joi.string().trim(),
    middlename: Joi.string().min(3).max(30).trim(),
    email: Joi.string().email(),
});
exports.editSchema = editSchema;
const setRoleSchema = Joi.object({
    role: Joi.string()
        .lowercase()
        .valid('user', 'admin', 'superadmin')
        .required(),
});
exports.setRoleSchema = setRoleSchema;
//# sourceMappingURL=user.schemas.js.map