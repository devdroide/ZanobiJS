import * as Joi from "joi";
import { importsSchema } from "./imports.schema";
import { controllersSchema } from "./controllers.schema";
import { servicesSchema } from "./services.schema";
import { exportsSchema } from "./exports.schema";

/**
 * Esquema de validación para un módulo usando Joi.
 *
 * El esquema define las siguientes propiedades:
 * - `imports`: Valida usando el esquema `importsSchema`.
 * - `controllers`: Valida usando el esquema `controllersSchema`.
 * - `services`: Valida usando el esquema `servicesSchema`.
 * - `exports`: Valida usando el esquema `exportsSchema`.
 *
 * Este esquema se utiliza para asegurar que la configuración del módulo cumple con los criterios de
 * validación especificados para cada propiedad.
 */
export const modulesSchema = Joi.object({
  imports: importsSchema,
  controllers: controllersSchema,
  services: servicesSchema,
  exports: exportsSchema,
});
