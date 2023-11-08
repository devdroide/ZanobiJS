import * as Joi from "joi";
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
export declare const modulesSchema: Joi.ObjectSchema<any>;
