import { MODULE_INVALID_PROPERTY, MODULE_MISSING_PROPERTY } from "../exceptions";
import { baseSchema } from "./base.schema";

/**
 * Mensajes que se usaran para explicar la falla del esquema
 */
export const exportsSchema = baseSchema.messages({
  "object.base": MODULE_INVALID_PROPERTY("exports"),
  "any.required": MODULE_MISSING_PROPERTY("exports"),
});
