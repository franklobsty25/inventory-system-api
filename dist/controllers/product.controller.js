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
exports.deleteProduct = exports.editProduct = exports.createProduct = exports.getProducts = exports.getProduct = void 0;
const response_service_1 = require("../utils/response.service");
const product_schema_1 = require("../schemas/product.schema");
const product_model_1 = require("../models/product.model");
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.product;
        const product = (yield product_model_1.PaginateProductModel.findOne({
            _id: productId,
            isDeleted: { $ne: true },
        }));
        if (!product) {
            return response_service_1.ResponseService.json(res, 400, 'Product not found');
        }
        response_service_1.ResponseService.json(res, 200, 'Product retrieved successfully', product);
    }
    catch (error) {
        response_service_1.ResponseService.json(res, error);
    }
});
exports.getProduct = getProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 20, all, search } = req.query;
        const query = {
            isDeleted: { $ne: true },
        };
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { category: { $regex: search, $options: 'i' } },
            ];
        }
        if (Number(search) >= 0) {
            query.$or = [{ unitPrice: Number(search) }, { quantity: Number(search) }];
        }
        const products = yield product_model_1.PaginateProductModel.paginate(query, {
            sort: '-1',
            page: Number(page),
            limit: Number(limit),
            pagination: all === 'false',
        });
        response_service_1.ResponseService.json(res, 200, 'Products retrieved successfully', products);
    }
    catch (error) {
        response_service_1.ResponseService.json(res, error);
    }
});
exports.getProducts = getProducts;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const supplier = req.params.supplier;
        const { error, value } = product_schema_1.createProductSchema.validate(req.body);
        if (error) {
            return response_service_1.ResponseService.json(res, error);
        }
        value.supplier = supplier;
        const product = yield product_model_1.PaginateProductModel.create(value);
        response_service_1.ResponseService.json(res, 201, 'Product created successfully', product);
    }
    catch (error) {
        response_service_1.ResponseService.json(res, error);
    }
});
exports.createProduct = createProduct;
const editProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.product;
        const { error, value } = product_schema_1.editProductSchema.validate(req.body);
        if (error) {
            return response_service_1.ResponseService.json(res, error);
        }
        const updatedProduct = yield product_model_1.PaginateProductModel.findOneAndUpdate({ _id: productId, isDeleted: { $ne: true } }, value, { new: true });
        if (!updatedProduct) {
            return response_service_1.ResponseService.json(res, 400, 'Product not found to be updated.');
        }
        response_service_1.ResponseService.json(res, 200, 'Product updated successfully', updatedProduct);
    }
    catch (error) {
        response_service_1.ResponseService.json(res, error);
    }
});
exports.editProduct = editProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.product;
    const deletedProduct = yield product_model_1.PaginateProductModel.findOneAndUpdate({ _id: productId, isDeleted: { $ne: true } }, { $set: { isDeleted: true } }, { new: true });
    if (!deletedProduct) {
        return response_service_1.ResponseService.json(res, 400, 'Product not found to be deleted.');
    }
    response_service_1.ResponseService.json(res, 200, 'Product deleted successfully');
});
exports.deleteProduct = deleteProduct;
