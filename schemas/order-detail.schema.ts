import Joi from 'joi'

const createOrderDetailSchema = Joi.object({
  description: Joi.string().trim(),
  quantity: Joi.number(),
  unitPrice: Joi.number().required()
})

const editOrderDetailSchema = Joi.object({
  description: Joi.string(),
  quantity: Joi.number(),
  unitPrice: Joi.number()
})

export { createOrderDetailSchema, editOrderDetailSchema }
