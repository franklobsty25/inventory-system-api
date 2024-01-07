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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setOrChangeRole = exports.deleteUser = exports.editUser = exports.reset = exports.changePassword = exports.login = exports.signup = exports.getUsers = exports.currentUser = void 0;
const argon2 = __importStar(require("argon2"));
const user_model_1 = require("../models/user.model");
const user_schemas_1 = require("../schemas/user.schemas");
const response_service_1 = require("../utils/response.service");
const auth_1 = require("../utils/auth");
const currentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    const u = (yield user_model_1.PaginateUserModel.findOne({
        _id: user.id,
        isDeleted: { $ne: true },
    }).select('firstname lastname middlename email role'));
    response_service_1.ResponseService.json(res, 200, 'User retrieved successfully.', u);
});
exports.currentUser = currentUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 20, search, all } = req.query;
    const query = {
        isDeleted: { $ne: true },
    };
    if (search) {
        query.$or = [
            { firstname: { $regex: search, $options: 'i' } },
            { lastname: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { phoneNumber: { $regex: search, $options: 'i' } },
        ];
    }
    const users = yield user_model_1.PaginateUserModel.paginate(query, {
        sort: '-1',
        page: Number(page),
        limit: Number(limit),
        pagination: all === 'false',
        select: '-password',
    });
    response_service_1.ResponseService.json(res, 200, 'Users retrieved successfully.', users);
});
exports.getUsers = getUsers;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = user_schemas_1.signupSchema.validate(req.body);
        if (error) {
            return response_service_1.ResponseService.json(res, error);
        }
        if (value) {
            const { password, repeatPassword } = value;
            if (password !== repeatPassword) {
                return response_service_1.ResponseService.json(res, 400, 'Password mismatch.');
            }
            value.password = yield argon2.hash(value.password);
            const user = new user_model_1.PaginateUserModel(value);
            const token = (0, auth_1.getToken)({ id: user.id, email: user.email });
            yield user.save();
            response_service_1.ResponseService.json(res, 201, 'User created successfully.', { token });
        }
    }
    catch (error) {
        response_service_1.ResponseService.json(res, error);
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = user_schemas_1.loginSchema.validate(req.body);
        if (error) {
            return response_service_1.ResponseService.json(res, error);
        }
        const { email, password } = value;
        const user = (yield user_model_1.PaginateUserModel.findOne({
            email,
            isDeleted: { $ne: true },
        }));
        if (!user) {
            return response_service_1.ResponseService.json(res, 400, `User with ${email} not found.`);
        }
        const isValid = yield argon2.verify(user.password, password);
        if (!isValid) {
            return response_service_1.ResponseService.json(res, 401, 'Password invalid.');
        }
        const token = (0, auth_1.getToken)({ id: user.id, email: user.email });
        response_service_1.ResponseService.json(res, 200, 'User logged in successfully.', { token });
    }
    catch (error) {
        response_service_1.ResponseService.json(res, error);
    }
});
exports.login = login;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = user_schemas_1.changePasswordSchema.validate(req.body);
        const { user } = req;
        if (error)
            return response_service_1.ResponseService.json(res, error);
        const { oldPassword, newPassword, repeatPassword } = value;
        if (newPassword !== repeatPassword) {
            return response_service_1.ResponseService.json(res, 400, 'Password mismatch.');
        }
        const userDoc = (yield user_model_1.PaginateUserModel.findOne({
            _id: user.id,
            isDeleted: { $ne: true },
        }));
        if (!user) {
            return response_service_1.ResponseService.json(res, 400, 'User not found for password changes.');
        }
        const isValid = yield argon2.verify(userDoc.password, oldPassword);
        if (!isValid) {
            return response_service_1.ResponseService.json(res, 403, 'Old password mismatch');
        }
        userDoc.password = yield argon2.hash(newPassword);
        yield userDoc.save();
        response_service_1.ResponseService.json(res, 200, 'User password changed successfully.');
    }
    catch (error) {
        response_service_1.ResponseService.json(res, error);
    }
});
exports.changePassword = changePassword;
/**
 * @TODO: forget implementation
 */
// const forget = (req: Request, res: Response) => {}
const reset = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = user_schemas_1.resetSchema.validate(req.body);
        if (error) {
            return response_service_1.ResponseService.json(res, error);
        }
        const { email, password, repeatPassword } = value;
        const user = (yield user_model_1.PaginateUserModel.findOne({
            email,
            isDeleted: { $ne: true },
        }));
        if (!user) {
            return response_service_1.ResponseService.json(res, 400, 'User not found for password reset.');
        }
        if (password !== repeatPassword) {
            return response_service_1.ResponseService.json(res, 400, 'Password mismatch.');
        }
        user.password = yield argon2.hash(password);
        yield user.save();
        response_service_1.ResponseService.json(res, 200, 'User password reset successfully.');
    }
    catch (error) {
        response_service_1.ResponseService.json(res, error);
    }
});
exports.reset = reset;
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req;
        const { error, value } = user_schemas_1.editSchema.validate(req.body);
        if (error) {
            return response_service_1.ResponseService.json(res, error);
        }
        const updatedUser = yield user_model_1.PaginateUserModel.findOneAndUpdate({ _id: user.id, isDeleted: { $ne: true } }, value, {
            new: true,
        }).select('-password');
        response_service_1.ResponseService.json(res, 200, 'User profile updated successfully.', updatedUser);
    }
    catch (error) {
        response_service_1.ResponseService.json(res, error);
    }
});
exports.editUser = editUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    yield user_model_1.PaginateUserModel.findOneAndUpdate({ _id: user.id, isDeleted: { $ne: true } }, { $set: { isDeleted: true } }, { new: true });
    response_service_1.ResponseService.json(res, 200, 'User profile deleted successfully.');
});
exports.deleteUser = deleteUser;
const setOrChangeRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.user;
        const { error, value } = user_schemas_1.setRoleSchema.validate(req.body);
        if (error) {
            return response_service_1.ResponseService.json(res, error);
        }
        const user = (yield user_model_1.PaginateUserModel.findOneAndUpdate({ _id: userId, isDeleted: { $ne: true } }, value, { new: true }).select('-password'));
        if (!user) {
            return response_service_1.ResponseService.json(res, 400, 'User not found.');
        }
        response_service_1.ResponseService.json(res, 200, 'User role updated successfully.', user);
    }
    catch (error) {
        response_service_1.ResponseService.json(res, error);
    }
});
exports.setOrChangeRole = setOrChangeRole;
