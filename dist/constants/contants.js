"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SWAGGER_DOCS = exports.ORDER_DETAIL = exports.ORDER = exports.LOCATION = exports.TRANSACTION = exports.SUPPLIER = exports.PRODUCT = exports.CUSTOMER = exports.USER = exports.CategoryEnum = exports.OrderStatusEnum = exports.RolesEnum = exports.LocationTypeEnum = exports.TransactionTypeEnum = void 0;
var TransactionTypeEnum;
(function (TransactionTypeEnum) {
    TransactionTypeEnum["RECEIPT"] = "receipt";
    TransactionTypeEnum["SHIPMENT"] = "shipment";
    TransactionTypeEnum["ADJUSTMENT"] = "adjustment";
})(TransactionTypeEnum || (exports.TransactionTypeEnum = TransactionTypeEnum = {}));
var LocationTypeEnum;
(function (LocationTypeEnum) {
    LocationTypeEnum["WAREHOUSE"] = "warehouse";
    LocationTypeEnum["SHELVES"] = "shelves";
})(LocationTypeEnum || (exports.LocationTypeEnum = LocationTypeEnum = {}));
var RolesEnum;
(function (RolesEnum) {
    RolesEnum["USER"] = "user";
    RolesEnum["ADMIN"] = "admin";
    RolesEnum["SUPERADMIN"] = "superadmin";
})(RolesEnum || (exports.RolesEnum = RolesEnum = {}));
var OrderStatusEnum;
(function (OrderStatusEnum) {
    OrderStatusEnum["PENDING"] = "pending";
    OrderStatusEnum["PROCESSING"] = "processing";
    OrderStatusEnum["COMPLETED"] = "completed";
})(OrderStatusEnum || (exports.OrderStatusEnum = OrderStatusEnum = {}));
var CategoryEnum;
(function (CategoryEnum) {
    CategoryEnum["CAPSULE"] = "capsule";
    CategoryEnum["COSMETIC"] = "cosmetic";
    CategoryEnum["GROCERY"] = "grocery";
    CategoryEnum["SYRUP"] = "syrup";
    CategoryEnum["TABLET"] = "tablet";
})(CategoryEnum || (exports.CategoryEnum = CategoryEnum = {}));
const USER = 'User';
exports.USER = USER;
const CUSTOMER = 'Customer';
exports.CUSTOMER = CUSTOMER;
const PRODUCT = 'Product';
exports.PRODUCT = PRODUCT;
const SUPPLIER = 'Supplier';
exports.SUPPLIER = SUPPLIER;
const TRANSACTION = 'Transaction';
exports.TRANSACTION = TRANSACTION;
const LOCATION = 'Location';
exports.LOCATION = LOCATION;
const ORDER = 'Order';
exports.ORDER = ORDER;
const ORDER_DETAIL = 'OrderDetail';
exports.ORDER_DETAIL = ORDER_DETAIL;
const SWAGGER_DOCS = {
    definition: {
        failOnErrors: true,
        openapi: '3.0.0',
        info: {
            title: 'Inventory Management System',
            version: '1.0.0',
            description: 'Inventory management systems encompass various fields and functionalities to effectively handle and control the flow of goods and materials within an organization',
            contact: {
                name: 'Colonkoed Enterprise',
                url: 'https://colonkoded.com/',
                email: 'info@colonkoded.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:8000/api/v1',
                description: 'Local Server',
            },
            {
                url: 'https://842b-41-204-44-206.ngrok-free.app/api/v1',
                description: 'Ngrok Service',
            },
        ],
    },
    basePath: '/',
    securityDefinitions: {
        Authorization: {
            type: 'http',
            name: 'authorization',
            in: 'header',
            description: 'Authorization token',
            scheme: 'bearer',
            bearerFormat: 'JWT',
        },
    },
    apis: [
        './swaggers/*.js',
        './swaggers/api/v1/*.js',
        './swaggers/*.ts',
        './swaggers/api/v1/*.ts',
    ],
};
exports.SWAGGER_DOCS = SWAGGER_DOCS;
