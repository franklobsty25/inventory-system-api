import * as Joi from 'joi';
import { RolesEnum } from '../constants/contant';

const signupSchema = Joi.object({
  firstname: Joi.string().min(3).max(30).trim().required(),
  lastname: Joi.string().min(3).max(30).trim().required(),
  middlename: Joi.string().min(3).trim().max(30),
  phoneNumber: Joi.string().trim().required(),
  email: Joi.string().email().trim().required(),
  password: Joi.string().min(8).required(),
  repeatPassword: Joi.string().min(8).required(),
  role: Joi.string().lowercase().valid('user', 'admin', 'superadmin'),
}).with('password', 'repeatPassword');

const loginSchema = Joi.object({
  email: Joi.string().email().trim().required(),
  password: Joi.string().min(8).required(),
});

const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().min(8).required(),
  newPassword: Joi.string().min(8).required(),
  repeatPassword: Joi.string().min(8).required(),
});

const forgotSchema = Joi.object({
  email: Joi.string().email().trim().required(),
});

const resetSchema = Joi.object({
  email: Joi.string().email().trim().required(),
  password: Joi.string().min(8).required(),
  repeatPassword: Joi.string().min(8).required(),
});

const editSchema = Joi.object({
  firstname: Joi.string().min(3).max(30).trim(),
  lastname: Joi.string().min(3).max(30).trim(),
  phoneNumber: Joi.string().trim(),
  middlename: Joi.string().min(3).max(30).trim(),
  email: Joi.string().email(),
});

const setRoleSchema = Joi.object({
  role: Joi.string()
    .lowercase()
    .valid('user', 'admin', 'superadmin')
    .required(),
});

export {
  signupSchema,
  loginSchema,
  changePasswordSchema,
  forgotSchema,
  resetSchema,
  editSchema,
  setRoleSchema,
};
