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
exports.deleteSupplier = exports.editSupplier = exports.createSupplier = exports.getSuppliers = exports.getSupplier = void 0;
const supplier_model_1 = require("../models/supplier.model");
const response_service_1 = require("../utils/response.service");
const supplier_schema_1 = require("../schemas/supplier.schema");
const getSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const supplierId = req.params.supplier;
        const supplier = (yield supplier_model_1.PaginateSupplierModel.findOne({
            _id: supplierId,
            isDeleted: { $ne: true },
        }));
        if (!supplier) {
            return response_service_1.ResponseService.json(res, 400, 'Supplier not found.');
        }
        response_service_1.ResponseService.json(res, 200, 'Supplier retrieved successfully.', supplier);
    }
    catch (error) {
        response_service_1.ResponseService.json(res, error);
    }
});
exports.getSupplier = getSupplier;
const getSuppliers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 20, all, search } = req.query;
        const query = {
            isDeleted: { $ne: true },
        };
        if (search) {
            query.$or = [
                { firstname: { $regex: search, $options: 'i' } },
                { lastname: { $regex: search, $options: 'i' } },
                { phoneNumber: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
            ];
        }
        const suppliers = yield supplier_model_1.PaginateSupplierModel.paginate(query, {
            sort: '-1',
            page: Number(page),
            limit: Number(limit),
            pagination: all === 'false',
        });
        response_service_1.ResponseService.json(res, 200, 'Suppliers retrieved successfully.', suppliers);
    }
    catch (error) {
        response_service_1.ResponseService.json(res, error);
    }
});
exports.getSuppliers = getSuppliers;
const createSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = supplier_schema_1.createSupplierSchema.validate(req.body);
        if (error) {
            return response_service_1.ResponseService.json(res, error);
        }
        const supplier = yield supplier_model_1.PaginateSupplierModel.create(value);
        response_service_1.ResponseService.json(res, 201, 'Supplier created successfully.', supplier);
    }
    catch (error) {
        response_service_1.ResponseService.json(res, error);
    }
});
exports.createSupplier = createSupplier;
const editSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const supplierId = req.params.supplier;
        const { error, value } = supplier_schema_1.editSupplierSchema.validate(req.body);
        if (error) {
            return response_service_1.ResponseService.json(res, error);
        }
        const updateSupplier = yield supplier_model_1.PaginateSupplierModel.findOneAndUpdate({ _id: supplierId, isDeleted: { $ne: true } }, value, { new: true });
        if (!updateSupplier) {
            return response_service_1.ResponseService.json(res, 400, 'Supplier not found to be updated.');
        }
        response_service_1.ResponseService.json(res, 200, 'Supplier updated successfully.', updateSupplier);
    }
    catch (error) {
        response_service_1.ResponseService.json(res, error);
    }
});
exports.editSupplier = editSupplier;
const deleteSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const supplierId = req.params.supplier;
    const deletedSupplier = yield supplier_model_1.PaginateSupplierModel.findOneAndUpdate({ _id: supplierId, isDeleted: { $ne: true } }, { $set: { isDeleted: true } }, { new: true });
    if (!deletedSupplier) {
        return response_service_1.ResponseService.json(res, 400, 'Supplier not found to be deleted.');
    }
    response_service_1.ResponseService.json(res, 200, 'Supplier deleted successfully.');
});
exports.deleteSupplier = deleteSupplier;
