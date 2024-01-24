"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const body_parser_1 = __importDefault(require("body-parser"));
const auth_1 = require("../utils/auth");
const location_controller_1 = require("../controllers/location.controller");
const router = (0, express_1.Router)();
router.use(body_parser_1.default.json());
router.get('/list', auth_1.authenticate, location_controller_1.getLocations);
router.get('/:location', auth_1.authenticate, location_controller_1.getLocation);
router.post('/create', auth_1.authenticate, location_controller_1.createLocation);
router.put('/:location/edit', auth_1.authenticate, location_controller_1.editLocation);
router.delete('/:location/delete', auth_1.authenticate, location_controller_1.deleteLocation);
exports.default = router;
//# sourceMappingURL=location.route.js.map