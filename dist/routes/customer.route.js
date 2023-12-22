"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const body_parser_1 = __importDefault(require("body-parser"));
const auth_1 = require("../utils/auth");
const customer_controller_1 = require("../controllers/customer.controller");
const router = (0, express_1.Router)();
router.use(body_parser_1.default.json());
router.get('/list', auth_1.authenticate, customer_controller_1.getCustomers);
router.get('/:customer', auth_1.authenticate, customer_controller_1.getCustomer);
router.post('/create', auth_1.authenticate, customer_controller_1.createCustomer);
router.put('/:customer/edit', auth_1.authenticate, customer_controller_1.editCustomer);
router.delete('/:customer/delete', auth_1.authenticate, customer_controller_1.deleteCustomer);
exports.default = router;
