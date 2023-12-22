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
exports.deleteOrderDetail = exports.editOrderDetail = exports.createOrderDetail = exports.getOrderDetails = exports.getOrderDetail = void 0;
const order_detail_model_1 = require("../models/order-detail.model");
const response_service_1 = require("../utils/response.service");
const order_detail_schema_1 = require("../schemas/order-detail.schema");
const getOrderDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const detailId = req.params.detail;
        const orderDetail = (yield order_detail_model_1.PaginateOrderDetailModel.findOne({
            _id: detailId,
            isDeleted: { $ne: true }
        }));
        if (!orderDetail) {
            response_service_1.ResponseService.json(res, 400, 'Order detail not found.');
            return;
        }
        response_service_1.ResponseService.json(res, 200, 'Order detail retrieved successfully.', orderDetail);
    }
    catch (error) {
        response_service_1.ResponseService.json(res, error);
    }
});
exports.getOrderDetail = getOrderDetail;
const getOrderDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 20, all, search } = req.query;
        const query = {
            isDeleted: { $ne: true }
        };
        if (search) {
            query.$or = [{ description: { $regex: search, $options: 'i' } }];
        }
        if (Number(search) >= 0) {
            query.$or = [{ quantity: Number(search) }, { unitPrice: Number(search) }];
        }
        const orderDetails = yield order_detail_model_1.PaginateOrderDetailModel.paginate(query, {
            sort: '-1',
            page: Number(page),
            limit: Number(limit),
            pagaination: all === 'false'
        });
        response_service_1.ResponseService.json(res, 200, 'Order details retrieved successfully.', orderDetails);
    }
    catch (error) {
        response_service_1.ResponseService.json(res, error);
    }
});
exports.getOrderDetails = getOrderDetails;
const createOrderDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order, product } = req.params;
        const { error, value } = order_detail_schema_1.createOrderDetailSchema.validate(req.body);
        if (error) {
            response_service_1.ResponseService.json(res, error);
            return;
        }
        value.order = order;
        value.product = product;
        const orderDetail = yield order_detail_model_1.PaginateOrderDetailModel.create(value);
        response_service_1.ResponseService.json(res, 201, 'Order detail created successfully.', orderDetail);
    }
    catch (error) {
        response_service_1.ResponseService.json(res, error);
    }
});
exports.createOrderDetail = createOrderDetail;
const editOrderDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const detailId = req.params.detail;
        const { error, value } = order_detail_schema_1.editOrderDetailSchema.validate(req.body);
        if (error) {
            response_service_1.ResponseService.json(res, error);
            return;
        }
        const updatedOrderDetail = (yield order_detail_model_1.PaginateOrderDetailModel.findOneAndUpdate({ _id: detailId, isDeleted: { $ne: true } }, value, { new: true }));
        if (!updatedOrderDetail) {
            response_service_1.ResponseService.json(res, 400, 'Order detail not found to be updated.');
            return;
        }
        response_service_1.ResponseService.json(res, 200, 'Order detail updated successfully.', updatedOrderDetail);
    }
    catch (error) {
        response_service_1.ResponseService.json(res, error);
    }
});
exports.editOrderDetail = editOrderDetail;
const deleteOrderDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const detailId = req.params.detail;
    const deletedOrderDetail = (yield order_detail_model_1.PaginateOrderDetailModel.findOneAndUpdate({ _id: detailId, isDeleted: { $ne: true } }, { $set: { isDeleted: true } }, { new: true }));
    if (!deletedOrderDetail) {
        response_service_1.ResponseService.json(res, 400, 'Order detail not found to be deleted.');
        return;
    }
    response_service_1.ResponseService.json(res, 200, 'Order detail deleted successfully.');
});
exports.deleteOrderDetail = deleteOrderDetail;
