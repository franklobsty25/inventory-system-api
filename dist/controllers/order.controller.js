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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.editOrder = exports.createOrder = exports.getOrders = exports.getOrder = void 0;
const order_model_1 = require("../models/order.model");
const response_service_1 = require("../utils/response.service");
const order_schema_1 = require("../schemas/order.schema");
const dayjs_1 = __importDefault(require("dayjs"));
const contants_1 = require("../constants/contants");
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = req.params.order;
        const order = (yield order_model_1.PaginateOrderModel.findOne({
            _id: orderId,
            isDeleted: { $ne: true },
        }));
        if (!order) {
            return response_service_1.ResponseService.json(res, 400, 'Order not found.');
        }
        response_service_1.ResponseService.json(res, 200, 'Order retrieved successfully.', order);
    }
    catch (error) {
        response_service_1.ResponseService.json(res, error);
    }
});
exports.getOrder = getOrder;
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 20, all, search, date } = req.query;
        const query = {
            isDeleted: { $ne: true },
        };
        if (search)
            query.$or = [{ status: { $regex: search, $options: 'i' } }];
        if (Number(search) >= 0)
            query.$or = [{ amount: Number(search) }];
        if (date) {
            query.$or = [
                { date: { $gte: (0, dayjs_1.default)(search).toDate() } },
                { completedDate: { $gte: (0, dayjs_1.default)(search).toDate() } },
            ];
        }
        const orders = yield order_model_1.PaginateOrderModel.paginate(query, {
            sort: '-1',
            page: Number(page),
            limit: Number(limit),
            pagination: all === 'false',
        });
        response_service_1.ResponseService.json(res, 200, 'Orders retrieved successfully', orders);
    }
    catch (error) {
        response_service_1.ResponseService.json(res, error);
    }
});
exports.getOrders = getOrders;
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = req.params.customer;
        const { error, value } = order_schema_1.createOrderSchema.validate(req.body);
        if (error) {
            return response_service_1.ResponseService.json(res, error);
        }
        value.customer = customer;
        const order = yield order_model_1.PaginateOrderModel.create(value);
        response_service_1.ResponseService.json(res, 201, 'Order created successfully', order);
    }
    catch (error) {
        response_service_1.ResponseService.json(res, error);
    }
});
exports.createOrder = createOrder;
const editOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = req.params.order;
        const { error, value } = order_schema_1.editOrderSchema.validate(req.body);
        if (error) {
            return response_service_1.ResponseService.json(res, error);
        }
        if (value.status) {
            const isValid = Object.values(contants_1.OrderStatusEnum).includes(value.status);
            if (!isValid) {
                return response_service_1.ResponseService.json(res, 400, 'Invalid order status.');
            }
        }
        const updatedOrder = (yield order_model_1.PaginateOrderModel.findOneAndUpdate({ _id: orderId, isDeleted: { $ne: true } }, { $set: Object.assign(Object.assign({}, value), { completedDate: new Date() }) }, { new: true }));
        if (!updatedOrder) {
            return response_service_1.ResponseService.json(res, 400, 'Order not found to be updated.');
        }
        response_service_1.ResponseService.json(res, 200, 'Order updated successfully.', updatedOrder);
    }
    catch (error) {
        response_service_1.ResponseService.json(res, error);
    }
});
exports.editOrder = editOrder;
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.order;
    const deletedOrder = (yield order_model_1.PaginateOrderModel.findOneAndUpdate({ _id: orderId, isDeleted: { $ne: true } }, { $set: { isDeleted: true } }, { new: true }));
    if (!deletedOrder) {
        return response_service_1.ResponseService.json(res, 400, 'Order not found to be deleted.');
    }
    response_service_1.ResponseService.json(res, 200, 'Order deleted successfully.');
});
exports.deleteOrder = deleteOrder;
