import Joi from 'joi';

const createTransactionSchema = Joi.object({
  quantity: Joi.number(),
  type: Joi.string(),
  date: Joi.date(),
});

const editTransactionSchema = Joi.object({
  quantity: Joi.number(),
  type: Joi.string(),
  date: Joi.date(),
});

export { createTransactionSchema, editTransactionSchema };
