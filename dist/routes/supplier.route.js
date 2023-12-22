"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const body_parser_1 = __importDefault(require("body-parser"));
const auth_1 = require("../utils/auth");
const supplier_controller_1 = require("../controllers/supplier.controller");
const router = (0, express_1.Router)();
router.use(body_parser_1.default.json());
router.get('/list', auth_1.authenticate, supplier_controller_1.getSuppliers);
router.get('/:supplier', auth_1.authenticate, supplier_controller_1.getSupplier);
router.post('/create', auth_1.authenticate, supplier_controller_1.createSupplier);
router.put('/:supplier/edit', auth_1.authenticate, supplier_controller_1.editSupplier);
router.delete('/:supplier/delete', auth_1.authenticate, supplier_controller_1.deleteSupplier);
exports.default = router;
