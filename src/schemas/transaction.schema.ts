import Joi from 'joi';

const createTransactionSchema = Joi.object({
  quantity: Joi.number(),
  type: Joi.string().lowercase().valid('receipt', 'shipment', 'adjustment'),
  date: Joi.date(),
});

const editTransactionSchema = Joi.object({
  quantity: Joi.number(),
  type: Joi.string().lowercase().valid('receipt', 'shipment', 'adjustment'),
  date: Joi.date(),
});

export { createTransactionSchema, editTransactionSchema };
