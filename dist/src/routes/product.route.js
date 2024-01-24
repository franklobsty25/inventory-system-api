"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const body_parser_1 = __importDefault(require("body-parser"));
const auth_1 = require("../utils/auth");
const product_controller_1 = require("../controllers/product.controller");
const router = (0, express_1.Router)();
router.use(body_parser_1.default.json());
router.get('/list', auth_1.authenticate, product_controller_1.getProducts);
router.get('/:product', auth_1.authenticate, product_controller_1.getProduct);
router.post('/:supplier/create', auth_1.authenticate, product_controller_1.createProduct);
router.put('/:product/edit', auth_1.authenticate, product_controller_1.editProduct);
router.delete('/:product/delete', auth_1.authenticate, product_controller_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=product.route.js.map