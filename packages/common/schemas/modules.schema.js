"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modulesSchema = void 0;
const Joi = require("joi");
const imports_schema_1 = require("./imports.schema");
const controllers_schema_1 = require("./controllers.schema");
const services_schema_1 = require("./services.schema");
const exports_schema_1 = require("./exports.schema");
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
exports.modulesSchema = Joi.object({
    imports: imports_schema_1.importsSchema,
    controllers: controllers_schema_1.controllersSchema,
    services: services_schema_1.servicesSchema,
    exports: exports_schema_1.exportsSchema,
});
