"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const body_parser_1 = __importDefault(require("body-parser"));
const auth_1 = require("../utils/auth");
const transaction_controller_1 = require("../controllers/transaction.controller");
const router = (0, express_1.Router)();
router.use(body_parser_1.default.json());
router.get('/list', auth_1.authenticate, transaction_controller_1.getTransactions);
router.get('/:transaction', auth_1.authenticate, transaction_controller_1.getTransaction);
router.post('/:product/create', auth_1.authenticate, transaction_controller_1.createTransaction);
router.put('/:transaction/edit', auth_1.authenticate, transaction_controller_1.editTransaction);
router.delete('/:transaction/delete', auth_1.authenticate, transaction_controller_1.deleteTransaction);
exports.default = router;
//# sourceMappingURL=transaction.route.js.map