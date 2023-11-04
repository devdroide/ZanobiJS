import {
  MODULE_INVALID_PROPERTY,
  MODULE_INVALID_TYPE_PROPERTY,
  MODULE_MISSING_PROPERTY,
} from "../exceptions";
import { baseSchema } from "./base.schema";

/**
 * Mensajes que se usaran para explicar la falla del esquema
 */
export const servicesSchema = baseSchema.messages({
  "object.base": MODULE_INVALID_PROPERTY("services"),
  "any.required": MODULE_MISSING_PROPERTY("services"),
  "array.includes": MODULE_INVALID_TYPE_PROPERTY(),
});
