import {
  MODULE_INVALID_ENTITY,
  MODULE_INVALID_TYPE_ENTITY,
  MODULE_MISSING_ENTITY,
  MODULE_SOMETHING_WRONG,
} from '../exceptions';
import { baseSchemaInject } from './base.schema';

/**
 * Mensajes que se usaran para explicar la falla del esquema
 */
export const servicesSchema = baseSchemaInject
  .messages({
    'object.base': MODULE_INVALID_ENTITY('services'),
    'any.required': MODULE_MISSING_ENTITY('services'),
    'array.includes': MODULE_INVALID_TYPE_ENTITY('services'),
    'array.sparse': MODULE_SOMETHING_WRONG('services'),
  })
  .label('@Module.service');
