import Joi from 'joi';

const createProductSchema = Joi.object({
  name: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  category: Joi.string()
    .lowercase()
    .valid('capsule', 'cosmetic', 'grocery', 'syrup', 'tablet')
    .trim()
    .required(),
  unitPrice: Joi.number().required(),
  quantity: Joi.number().required(),
  reorder: Joi.boolean(),
});

const editProductSchema = Joi.object({
  name: Joi.string().trim(),
  description: Joi.string().trim(),
  category: Joi.string()
    .lowercase()
    .valid('capsule', 'cosmetic', 'grocery', 'syrup', 'tablet'),
  unitPrice: Joi.number(),
  quantity: Joi.number(),
  reorder: Joi.boolean(),
});

export { createProductSchema, editProductSchema };
