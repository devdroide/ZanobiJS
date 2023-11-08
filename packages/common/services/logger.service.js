"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerService = void 0;
const shared_utils_1 = require("../utils/shared.utils");
/**
 * Servicio para manejar el registro de mensajes con diferentes niveles de importancia.
 * Implementa el patrón Singleton para garantizar una única instancia del servicio.
 *
 * @example
 * ```typescript
 * const logger = LoggerService.getInstance();
 * logger.info('Mensaje informativo');
 * logger.error('Mensaje de error');
 * ```
 */
class LoggerService {
    /**
     * Instancia única del servicio LoggerService.
     */
    static instance;
    /**
     * Constructor privado para asegurar que no se pueda instanciar directamente.
     */
    constructor() { }
    /**
     * Obtiene la única instancia de LoggerService.
     *
     * @returns La única instancia de LoggerService.
     */
    static getInstance() {
        if (!this.instance) {
            this.instance = new LoggerService();
        }
        return this.instance;
    }
    /**
     * Formatea el mensaje a ser registrado.
     *
     * @param level - Nivel del mensaje (info, error, etc.).
     * @param message - Mensaje a ser formateado.
     * @returns Mensaje formateado.
     */
    formatMessage(level, message) {
        return `[${level.toUpperCase()}]: ${message}`;
    }
    /**
     * Registra el mensaje en la consola.
     *
     * @param color - Color asociado al nivel de mensaje.
     * @param level - Nivel del mensaje.
     * @param message - Mensaje a ser registrado.
     * @param arg - Argumentos adicionales.
     */
    log(color, level, message, ...arg) {
        if ((0, shared_utils_1.coerceBooleanProperty)(process.env.ZANOBI_DEBUG))
            console.log(color, this.formatMessage(level, message), shared_utils_1.colorPrint.white, ...arg);
    }
    /**
     * Registra un mensaje informativo.
     *
     * @param message - Mensaje informativo.
     * @param arg - Argumentos adicionales.
     */
    info(message, ...arg) {
        this.log(shared_utils_1.colorPrint.blue, "info", message, ...arg);
    }
    /**
     * Registra una advertencia.
     *
     * @param message - Mensaje de advertencia.
     * @param arg - Argumentos adicionales.
     */
    warn(message, ...arg) {
        this.log(shared_utils_1.colorPrint.orange, "warn", message, ...arg);
    }
    /**
     * Registra un mensaje de error.
     *
     * @param message - Mensaje de error.
     * @param arg - Argumentos adicionales.
     */
    error(message, ...arg) {
        this.log(shared_utils_1.colorPrint.red, "error", message, ...arg);
    }
    /**
     * Registra un mensaje de éxito.
     *
     * @param message - Mensaje de éxito.
     * @param arg - Argumentos adicionales.
     */
    success(message, ...arg) {
        this.log(shared_utils_1.colorPrint.green, "success", message, ...arg);
    }
    /**
     * Registra un mensaje de depuración.
     *
     * @param message - Mensaje de depuración.
     * @param arg - Argumentos adicionales.
     */
    debug(message, ...arg) {
        this.log(shared_utils_1.colorPrint.white, "debug", message, ...arg);
    }
}
exports.LoggerService = LoggerService;
