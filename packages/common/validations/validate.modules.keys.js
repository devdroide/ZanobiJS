"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateModuleKey = void 0;
const exceptions_1 = require("../exceptions");
const schemas_1 = require("../schemas");
/**
 * Valida el nombre de las propiedades (keys) del módulo utilizando el esquema `modulesSchema`.
 *
 * Si las claves no son válidas según el esquema, la función lanzará un error
 * con el mensaje detallando la validación fallida.
 *
 * @param {IModuleConfig} keys Las propiedades del módulo a validar.
 * @throws {Error} Lanza un error si la validación falla.
 *
 * @example
 * const keys = { imports: ..., controllers: ..., services: ..., exports: ... };
 * validateModuleKey(keys);
 */
function validateModuleKey(keys) {
    const { error } = schemas_1.modulesSchema.validate(keys);
    if (error)
        throw new exceptions_1.InvalidModuleSchemaException(error.message);
    return;
}
exports.validateModuleKey = validateModuleKey;
