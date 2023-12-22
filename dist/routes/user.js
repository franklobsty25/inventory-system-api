"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const body_parser_1 = __importDefault(require("body-parser"));
const user_controller_1 = require("../controllers/user.controller");
const auth_1 = require("../utils/auth");
const router = (0, express_1.Router)();
router.use(body_parser_1.default.json());
router.post('/sign-up', user_controller_1.signup);
router.post('/login', user_controller_1.login);
router.put('/:user/change-password', user_controller_1.changePassword);
router.post('/forgot', user_controller_1.forgot);
router.put('/reset', user_controller_1.reset);
router.get('/list', auth_1.verify, user_controller_1.getUsers);
router.get('/', auth_1.verify, user_controller_1.currentUser);
exports.default = router;
