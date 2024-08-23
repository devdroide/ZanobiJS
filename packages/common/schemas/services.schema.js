"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.servicesSchema = void 0;
const exceptions_1 = require("../exceptions");
const base_schema_1 = require("./base.schema");
/**
 * Mensajes que se usaran para explicar la falla del esquema
 */
exports.servicesSchema = base_schema_1.baseSchemaInject
    .messages({
    "object.base": (0, exceptions_1.MODULE_INVALID_ENTITY)("services"),
    "any.required": (0, exceptions_1.MODULE_MISSING_ENTITY)("services"),
    "array.includes": (0, exceptions_1.MODULE_INVALID_TYPE_ENTITY)("services"),
    "array.sparse": (0, exceptions_1.MODULE_SOMETHING_WRONG)("services"),
})
    .label("@Module.service");
