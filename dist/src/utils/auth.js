"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = exports.getToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_service_1 = require("./response.service");
const getToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, process.env.SECRET || '', { expiresIn: '24h' });
};
exports.getToken = getToken;
const authenticate = (req, res, next) => {
    var _a;
    try {
        const token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) || '';
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET || '');
        if (!decoded) {
            response_service_1.ResponseService.json(res, 401, 'Unathorized access');
            return;
        }
        req.user = { id: decoded.id, email: decoded.email };
        next();
    }
    catch (error) {
        response_service_1.ResponseService.json(res, error);
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=auth.js.map