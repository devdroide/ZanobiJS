"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importsSchema = void 0;
const exceptions_1 = require("../exceptions");
const base_schema_1 = require("./base.schema");
/**
 * Mensajes que se usaran para explicar la falla del esquema
 */
exports.importsSchema = base_schema_1.baseSchema.messages({
    "object.base": (0, exceptions_1.MODULE_INVALID_ENTITY)("imports"),
    "any.required": (0, exceptions_1.MODULE_MISSING_ENTITY)("imports"),
});