"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidModuleSchemaException = void 0;
const constant_message_1 = require("./constant.message");
const runtime_exception_1 = require("./runtime.exception");
/**
 * Excepción lanzada cuando un esquema de módulo es inválido.
 *
 * @remarks
 * Esta clase extiende la base `RuntimeException` para proporcionar detalles
 * adicionales específicos a esquemas de módulos inválidos.
 */
class InvalidModuleSchemaException extends runtime_exception_1.RuntimeException {
    /**
     * @param detail - Mensaje que detallada mejor la causa la excepción.
     */
    constructor(detail) {
        super((0, constant_message_1.MODULE_ERROR)(), detail);
    }
}
exports.InvalidModuleSchemaException = InvalidModuleSchemaException;
