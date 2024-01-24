"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const body_parser_1 = __importDefault(require("body-parser"));
const auth_1 = require("../utils/auth");
const order_controller_1 = require("../controllers/order.controller");
const router = (0, express_1.Router)();
router.use(body_parser_1.default.json());
router.get('/list', auth_1.authenticate, order_controller_1.getOrders);
router.get('/:order', auth_1.authenticate, order_controller_1.getOrder);
router.post('/:customer/create', auth_1.authenticate, order_controller_1.createOrder);
router.put('/:order/edit', auth_1.authenticate, order_controller_1.editOrder);
router.delete('/:order/delete', auth_1.authenticate, order_controller_1.deleteOrder);
exports.default = router;
//# sourceMappingURL=order.route.js.map