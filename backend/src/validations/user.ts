import Joi from 'joi';

const userSchema = Joi.object({
  nombre: Joi.string().min(4).max(30).required(),
  contrasena: Joi.string().min(8).max(72).required(),
  email: Joi.string().email().required(),
});

const userUpdateSchema = Joi.object({
  nombre: Joi.string().min(4).max(30).required(),
  contrasena: Joi.string().min(8).max(72),
  confirmContrasena: Joi.string().min(8).max(72),
  email: Joi.string().email().required(),
});

const userLoginSchema = Joi.object({
  contrasena: Joi.string().min(8).max(72).required(),
  email: Joi.string().email().required(),
});

const userIdSchema = Joi.object({
  id: Joi.number().positive().min(1).required()
});

export { userSchema, userIdSchema, userLoginSchema, userUpdateSchema };