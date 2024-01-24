"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocation = exports.editLocation = exports.createLocation = exports.getLocations = exports.getLocation = void 0;
const location_model_1 = require("../models/location.model");
const response_service_1 = require("../utils/response.service");
const location_schema_1 = require("../schemas/location.schema");
const getLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const locationId = req.params.location;
        const location = (yield location_model_1.PaginateLocationModel.findOne({
            _id: locationId,
            isDeleted: { $ne: true },
        }));
        if (!location) {
            return response_service_1.ResponseService.json(res, 400, 'Location not found.');
        }
        response_service_1.ResponseService.json(res, 200, 'Location retrieved successfully.', location);
    }
    catch (error) {
        response_service_1.ResponseService.json(res, error);
    }
});
exports.getLocation = getLocation;
const getLocations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 20, all, search } = req.query;
        const query = {
            isDeleted: { $ne: true },
        };
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { type: { $regex: search, $options: 'i' } },
            ];
        }
        const locations = yield location_model_1.PaginateLocationModel.paginate(query, {
            sort: '-1',
            page: Number(page),
            limit: Number(limit),
            pagination: all === 'false',
        });
        response_service_1.ResponseService.json(res, 200, 'Locations retrieved successfully.', locations);
    }
    catch (error) {
        response_service_1.ResponseService.json(res, error);
    }
});
exports.getLocations = getLocations;
const createLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = location_schema_1.createLocationSchema.validate(req.body);
        if (error) {
            return response_service_1.ResponseService.json(res, error);
        }
        const location = yield location_model_1.PaginateLocationModel.create(value);
        response_service_1.ResponseService.json(res, 201, 'Location created successfully.', location);
    }
    catch (error) {
        response_service_1.ResponseService.json(res, error);
    }
});
exports.createLocation = createLocation;
const editLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const location = req.params.location;
        const { error, value } = location_schema_1.editLocationSchema.validate(req.body);
        if (error)
            return response_service_1.ResponseService.json(res, error);
        const updatedLocation = (yield location_model_1.PaginateLocationModel.findOneAndUpdate({ _id: location, isDeleted: { $ne: true } }, value, { new: true }));
        if (!updatedLocation) {
            return response_service_1.ResponseService.json(res, 400, 'Location to be updated not found.');
        }
        response_service_1.ResponseService.json(res, 200, 'Location updated successfully.', updatedLocation);
    }
    catch (error) {
        response_service_1.ResponseService.json(res, error);
    }
});
exports.editLocation = editLocation;
const deleteLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const location = req.params.location;
    const deletedLocation = (yield location_model_1.PaginateLocationModel.findOneAndUpdate({ _id: location, isDeleted: { $ne: true } }, { $set: { isDeleted: true } }, { new: true }));
    if (!deletedLocation) {
        return response_service_1.ResponseService.json(res, 400, 'Location to be deleted not found.');
    }
    response_service_1.ResponseService.json(res, 200, 'Location deleted successfully.');
});
exports.deleteLocation = deleteLocation;
//# sourceMappingURL=location.controller.js.map