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
router.get('/', auth_1.authenticate, user_controller_1.currentUser);
router.get('/list', auth_1.authenticate, user_controller_1.getUsers);
router.post('/sign-up', user_controller_1.signup);
router.post('/login', user_controller_1.login);
router.put('/change-password', auth_1.authenticate, user_controller_1.changePassword);
router.put('/reset', user_controller_1.reset);
router.put('/edit', auth_1.authenticate, user_controller_1.editUser);
router.put('/:user/change-role', auth_1.authenticate, user_controller_1.setOrChangeRole);
router.delete('/delete', auth_1.authenticate, user_controller_1.deleteUser);
exports.default = router;
//# sourceMappingURL=user.route.js.map