"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseService = exports.ResponseObject = void 0;
const lodash_1 = require("lodash");
class ResponseObject {
}
exports.ResponseObject = ResponseObject;
const defaultStatus = 400;
class ResponseService {
    static json(res, statusOrError, message, data, meta, code) {
        const error = statusOrError instanceof Error ? statusOrError : null;
        const response = {};
        response.message = message;
        let status = statusOrError;
        if (error) {
            const errorObj = statusOrError;
            response.message = message || errorObj.message;
            status = (0, lodash_1.get)(errorObj, 'status', defaultStatus);
        }
        if (!(0, lodash_1.isNil)(data)) {
            response.data = data;
        }
        if (!(0, lodash_1.isNil)(meta)) {
            response.meta = meta;
        }
        if (!(0, lodash_1.isEmpty)(code)) {
            response.code = code;
        }
        const statusCode = status;
        res.status(statusCode).json(response);
    }
}
exports.ResponseService = ResponseService;
//# sourceMappingURL=response.service.js.map