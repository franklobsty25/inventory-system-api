"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importStar(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const customer_route_1 = __importDefault(require("./routes/customer.route"));
const supplier_route_1 = __importDefault(require("./routes/supplier.route"));
const product_route_1 = __importDefault(require("./routes/product.route"));
const order_route_1 = __importDefault(require("./routes/order.route"));
const order_detail_route_1 = __importDefault(require("./routes/order-detail.route"));
const location_route_1 = __importDefault(require("./routes/location.route"));
const transaction_route_1 = __importDefault(require("./routes/transaction.route"));
const contants_1 = require("./constants/contants");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const express_rate_limit_1 = require("express-rate-limit");
const swaggerJsdoc = require('swagger-jsdoc');
dotenv_1.default.config();
const app = (0, express_1.default)();
app.set('trust proxy', 1);
const port = Number(process.env.PORT) || 3000;
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 20 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use((0, express_1.urlencoded)({ extended: true }));
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerJsdoc(contants_1.SWAGGER_DOCS), { explorer: true }));
app.use(limiter);
app.use('/api/v1/user', user_route_1.default);
app.use('/api/v1/customer', customer_route_1.default);
app.use('/api/v1/supplier', supplier_route_1.default);
app.use('/api/v1/product', product_route_1.default);
app.use('/api/v1/order', order_route_1.default);
app.use('/api/v1/order-detail', order_detail_route_1.default);
app.use('/api/v1/location', location_route_1.default);
app.use('/api/v1/transaction', transaction_route_1.default);
app.use('/', (req, res) => {
    res.status(200).send('Welcome to Inventory Management System API.');
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
    mongoose_1.default
        .connect(process.env.MONGODB_URL || '')
        .then(() => { console.log('[database]: Database connected successfully'); })
        .catch((error) => {
        console.error(`[error]: Error connecting to database: ${error.message}`);
    });
});
module.exports = app;
