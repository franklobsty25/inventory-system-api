"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const body_parser_1 = __importDefault(require("body-parser"));
const auth_1 = require("../utils/auth");
const order_detail_controller_1 = require("../controllers/order-detail.controller");
const router = (0, express_1.Router)();
router.use(body_parser_1.default.json());
router.get('/list', auth_1.authenticate, order_detail_controller_1.getOrderDetails);
router.get('/:detail', auth_1.authenticate, order_detail_controller_1.getOrderDetail);
router.post('/:order/create/:product', auth_1.authenticate, order_detail_controller_1.createOrderDetail);
router.put('/:detail/edit', auth_1.authenticate, order_detail_controller_1.editOrderDetail);
router.delete('/:detail/delete', auth_1.authenticate, order_detail_controller_1.deleteOrderDetail);
exports.default = router;
//# sourceMappingURL=order-detail.route.js.map