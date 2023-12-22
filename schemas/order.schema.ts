import Joi from 'joi'

const createOrderSchema = Joi.object({
  amount: Joi.number().required(),
  date: Joi.date()
})

const editOrderSchema = Joi.object({
  amount: Joi.number(),
  status: Joi.string().trim(),
  date: Joi.date()
})

export { createOrderSchema, editOrderSchema }
