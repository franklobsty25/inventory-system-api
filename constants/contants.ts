enum TransactionTypeEnum {
  RECEIPT = 'receipt',
  SHIPMENT = 'shipment',
  ADJUSTMENT = 'adjustment',
}

enum LocationTypeEnum {
  WAREHOUSE = 'warehouse',
  SHELVES = 'shelves',
}

enum RolesEnum {
  USER = 'user',
  ADMIN = 'admin',
  SUPERADMIN = 'superadmin',
}

enum OrderStatusEnum {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
}

const USER = 'User';
const CUSTOMER = 'Customer';
const PRODUCT = 'Product';
const SUPPLIER = 'Supplier';
const TRANSACTION = 'Transaction';
const LOCATION = 'Location';
const ORDER = 'Order';
const ORDER_DETAIL = 'OrderDetail';

const SWAGGER_DOCS = {
  definition: {
    failOnErrors: true,
    openapi: '3.0.0',
    info: {
      title: 'Inventory Management System',
      version: '1.0.0',
      description:
        'Inventory management systems encompass various fields and functionalities to effectively handle and control the flow of goods and materials within an organization',
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
        url: 'https://c199-102-176-94-188.ngrok-free.app/api/v1',
        description: 'Ngrok Service'
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

export {
  TransactionTypeEnum,
  LocationTypeEnum,
  RolesEnum,
  OrderStatusEnum,
  USER,
  CUSTOMER,
  PRODUCT,
  SUPPLIER,
  TRANSACTION,
  LOCATION,
  ORDER,
  ORDER_DETAIL,
  SWAGGER_DOCS,
};
