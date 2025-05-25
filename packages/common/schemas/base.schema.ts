import * as Joi from 'joi';

const itemService = Joi.object({
  provider: Joi.alternatives().try(Joi.string(), Joi.func()).required(),
  useValue: Joi.any(),
  useClass: Joi.func(),
  useFactory: Joi.func(),
}).xor('useValue', 'useClass', 'useFactory');

export const baseSchema = Joi.array()
  .required()
  .items(Joi.function())
  .required();

export const baseSchemaInject = Joi.array()
  .required()
  .items(Joi.function(), itemService)
  .required();
