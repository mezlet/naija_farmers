import Joi from 'joi';

export const userSchema = Joi.object().keys({
  username: Joi.string().min(3).max(15).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: Joi.string().min(6).required(),
  group_id: Joi.number().integer().required(),
  role_id: Joi.number().integer().required(),
  permissions: Joi.array().items(Joi.string()).required()
});

export const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.required()
});

export const permissionSchema = Joi.object().keys({
  email: Joi.string().email().required(),
});

export const tokenSchema = Joi.object().keys({
  token: Joi.string().required(),
});
