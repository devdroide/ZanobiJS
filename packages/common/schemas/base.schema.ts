import * as Joi from 'joi';

const itemService = Joi.object({
  provider: Joi.string().required(),
  useValue: Joi.any().required(),
});

export const baseSchema = Joi.array()
  .required()
  .items(Joi.function())
  .required();

export const baseSchemaInject = Joi.array()
  .required()
  .items(Joi.function(), itemService)
  .required();
