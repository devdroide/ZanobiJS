"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllersSchema = void 0;
const exceptions_1 = require("../exceptions");
const base_schema_1 = require("./base.schema");
/**
 * Mensajes que se usaran para explicar la falla del esquema
 */
exports.controllersSchema = base_schema_1.baseSchema.messages({
    "object.base": (0, exceptions_1.MODULE_INVALID_PROPERTY)("controllers"),
    "any.required": (0, exceptions_1.MODULE_MISSING_PROPERTY)("controllers"),
});
