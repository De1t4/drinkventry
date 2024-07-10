import Joi from 'joi';

const supplierSchema = Joi.object({
  nombre: Joi.string().min(4).max(30).required(),
  direccion: Joi.string().min(4).max(30).required(),
  telefono: Joi.string().alphanum().min(4).max(30).required(),
  
});

const supplierIdSchema = Joi.object({
  id: Joi.number().positive().min(1).required()
});

export { supplierSchema, supplierIdSchema };