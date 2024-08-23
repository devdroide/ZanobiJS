"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuntimeException = void 0;
/**
 * Excepción base para manejar errores en tiempo de ejecución.
 *
 * @remarks
 * Esta clase extiende el objeto nativo `Error` y proporciona una estructura adicional
 * para incluir detalles sobre el error.
 *
 */
class RuntimeException extends Error {
    /**
     * Detalle adicional sobre el error.
     */
    detail;
    /**
     * Crea una nueva instancia de `RuntimeException`.
     *
     * @param message - El mensaje principal de la excepción.
     * @param detail - Mensaje adicional que detallada mejor la causa la excepción.
     */
    constructor(message = ``, detail = ``) {
        super(message);
        this.detail = detail;
    }
    /**
     * Proporciona un resumen del error, incluido el mensaje principal y los detalles.
     *
     * @returns Un objeto que contiene el mensaje de error y los detalles.
     */
    whatHappened() {
        return {
            message: this.message,
            detail: this.detail,
        };
    }
}
exports.RuntimeException = RuntimeException;
