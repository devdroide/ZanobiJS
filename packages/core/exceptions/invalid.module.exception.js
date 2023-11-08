"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidModuleAnnotationException = void 0;
const runtime_exception_1 = require("zanobijs-common/exceptions/runtime.exception");
const constant_message_1 = require("./constant.message");
/**
 * Excepción lanzada cuando una clase Modulo no tiene el decorador `@Module`
 * de zanobijs-common
 *
 * @remarks
 * Esta clase extiende la base `RuntimeException`de zanobijs-common
 * para proporcionar detalles adicionales específicos a esquemas de módulos inválidos.
 */
class InvalidModuleAnnotationException extends runtime_exception_1.RuntimeException {
    constructor(detail = ``) {
        super((0, constant_message_1.MODULE_INVALID_ANNOTATION_ERROR)(), detail);
    }
}
exports.InvalidModuleAnnotationException = InvalidModuleAnnotationException;
