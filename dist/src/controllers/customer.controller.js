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
exports.deleteCustomer = exports.editCustomer = exports.createCustomer = exports.getCustomers = exports.getCustomer = void 0;
const response_service_1 = require("../utils/response.service");
const customer_schema_1 = require("../schemas/customer.schema");
const customer_model_1 = require("../models/customer.model");
const getCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerId = req.params.customer;
        const customer = yield customer_model_1.PaginateCustomerModel.findOne({
            _id: customerId,
            isDeleted: { $ne: true },
        });
        if (!customer) {
            return response_service_1.ResponseService.json(res, 400, 'Customer not found.');
        }
        response_service_1.ResponseService.json(res, 200, 'Customer retrieved successfully', customer);
    }
    catch (error) {
        response_service_1.ResponseService.json(res, error);
    }
});
exports.getCustomer = getCustomer;
const getCustomers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 20, all, search } = req.query;
        const query = {
            isDeleted: { $ne: true },
        };
        if (search) {
            query.$or = [
                { firstname: { $regex: search, $options: 'i' } },
                { lastname: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
            ];
        }
        const customers = yield customer_model_1.PaginateCustomerModel.paginate(query, {
            sort: '-1',
            page: Number(page),
            limit: Number(limit),
            pagination: all === 'false',
        });
        response_service_1.ResponseService.json(res, 200, 'Customers retrieved successfully.', customers);
    }
    catch (error) {
        response_service_1.ResponseService.json(res, error);
    }
});
exports.getCustomers = getCustomers;
const createCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = customer_schema_1.createCustomerSchema.validate(req.body);
        if (error) {
            return response_service_1.ResponseService.json(res, error);
        }
        const customer = yield customer_model_1.PaginateCustomerModel.create(value);
        response_service_1.ResponseService.json(res, 201, 'Customer created successfully.', customer);
    }
    catch (error) {
        response_service_1.ResponseService.json(res, error);
    }
});
exports.createCustomer = createCustomer;
const editCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = customer_schema_1.editCustomerSchema.validate(req.body);
        if (error) {
            return response_service_1.ResponseService.json(res, error);
        }
        const customer = req.params.customer;
        const updatedcustomer = yield customer_model_1.PaginateCustomerModel.findOneAndUpdate({ _id: customer, isDeleted: { $ne: true } }, value, { new: true });
        if (!updatedcustomer) {
            return response_service_1.ResponseService.json(res, 400, 'Customer not found to be updated.');
        }
        response_service_1.ResponseService.json(res, 200, 'Customer updated successfully.', updatedcustomer);
    }
    catch (error) {
        response_service_1.ResponseService.json(res, error);
    }
});
exports.editCustomer = editCustomer;
const deleteCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = req.params.customer;
        const deletedCustomer = yield customer_model_1.PaginateCustomerModel.findOneAndUpdate({ _id: customer, isDeleted: { $ne: true } }, { $set: { isDeleted: true } }, { new: true });
        if (!deletedCustomer) {
            return response_service_1.ResponseService.json(res, 400, 'Customer not found to be deleted.');
        }
        response_service_1.ResponseService.json(res, 200, 'Customer deleted successfully.');
    }
    catch (error) {
        response_service_1.ResponseService.json(res, error);
    }
});
exports.deleteCustomer = deleteCustomer;
//# sourceMappingURL=customer.controller.js.map