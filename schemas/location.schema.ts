import Joi from 'joi';

const createLocationSchema = Joi.object({
  name: Joi.string().trim().required(),
  description: Joi.string().trim(),
  type: Joi.string().trim(),
});

const editLocationSchema = Joi.object({
  name: Joi.string().trim(),
  description: Joi.string().trim(),
  type: Joi.string().trim(),
});

export { createLocationSchema, editLocationSchema };
