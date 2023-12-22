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
exports.deleteTransaction = exports.editTransaction = exports.createTransaction = exports.getTransactions = exports.getTransaction = void 0;
const transaction_model_1 = require("../models/transaction.model");
const response_service_1 = require("../utils/response.service");
const dayjs_1 = __importDefault(require("dayjs"));
const transaction_schema_1 = require("../schemas/transaction.schema");
const contants_1 = require("../constants/contants");
const getTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactionId = req.params.transaction;
        const transaction = (yield transaction_model_1.PaginateTransactionModel.findOne({
            _id: transactionId,
            isDeleted: { $ne: true },
        }));
        if (!transaction)
            return response_service_1.ResponseService.json(res, 400, 'Transaction information not found.');
        response_service_1.ResponseService.json(res, 200, 'Transaction information retrieved successfully.', transaction);
    }
    catch (error) {
        response_service_1.ResponseService.json(res, error);
    }
});
exports.getTransaction = getTransaction;
const getTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 20, all, search, date } = req.query;
        const query = {
            isDeleted: { $ne: true },
        };
        if (search)
            query.$or = [{ type: { $regex: search, $options: 'i' } }];
        if (Number(search) >= 0)
            query.$or = [{ quantity: Number(search) }];
        if (date)
            query.$or = [
                { date: { $gte: (0, dayjs_1.default)(search).toDate() } },
                { createdAt: { $gte: (0, dayjs_1.default)(search).toDate() } },
            ];
        const transactions = yield transaction_model_1.PaginateTransactionModel.paginate(query, {
            sort: '-1',
            page: Number(page),
            limit: Number(limit),
            pagination: all === 'false' ? true : false,
        });
        response_service_1.ResponseService.json(res, 200, 'Transactions retrieved successfully.', transactions);
    }
    catch (error) {
        response_service_1.ResponseService.json(res, error);
    }
});
exports.getTransactions = getTransactions;
const createTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.params.product;
        const { error, value } = transaction_schema_1.createTransactionSchema.validate(req.body);
        if (error)
            return response_service_1.ResponseService.json(res, error);
        if (value.type) {
            const isValid = Object.values(contants_1.TransactionTypeEnum).includes(value.type);
            if (!isValid)
                return response_service_1.ResponseService.json(res, 400, 'Invalid transaction type.');
        }
        value.product = product;
        const transaction = yield transaction_model_1.PaginateTransactionModel.create(value);
        response_service_1.ResponseService.json(res, 201, 'Transaction created successfully.', transaction);
    }
    catch (error) {
        response_service_1.ResponseService.json(res, error);
    }
});
exports.createTransaction = createTransaction;
const editTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transaction = req.params.transaction;
        const { error, value } = transaction_schema_1.editTransactionSchema.validate(req.body);
        if (error)
            return response_service_1.ResponseService.json(res, error);
        if (value.type) {
            const isValid = Object.values(contants_1.TransactionTypeEnum).includes(value.type);
            if (!isValid)
                return response_service_1.ResponseService.json(res, 400, 'Invalid transaction type.');
        }
        const updatedTransaction = (yield transaction_model_1.PaginateTransactionModel.findOneAndUpdate({ _id: transaction, isDeleted: { $ne: true } }, value, { new: true }));
        if (!updatedTransaction)
            return response_service_1.ResponseService.json(res, 400, 'Transaction information not found.');
        response_service_1.ResponseService.json(res, 200, 'Transaction updated successfully.', updatedTransaction);
    }
    catch (error) {
        response_service_1.ResponseService.json(res, error);
    }
});
exports.editTransaction = editTransaction;
const deleteTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transaction = req.params.transaction;
        const deletedTransaction = (yield transaction_model_1.PaginateTransactionModel.findOneAndUpdate({ _id: transaction, isDeleted: { $ne: true } }, { $set: { isDeleted: true } }, { new: true }));
        if (!deletedTransaction)
            return response_service_1.ResponseService.json(res, 400, 'Transaction to be deleted not found.');
        response_service_1.ResponseService.json(res, 200, 'Transaction deleted successfully.');
    }
    catch (error) {
        response_service_1.ResponseService.json(res, error);
    }
});
exports.deleteTransaction = deleteTransaction;
