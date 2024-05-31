import { MODULE_INVALID_ENTITY, MODULE_MISSING_ENTITY } from "../exceptions";
import { baseSchema } from "./base.schema";

/**
 * Mensajes que se usaran para explicar la falla del esquema
 */
export const exportsSchema = baseSchema.messages({
  "object.base": MODULE_INVALID_ENTITY("exports"),
  "any.required": MODULE_MISSING_ENTITY("exports"),
});
