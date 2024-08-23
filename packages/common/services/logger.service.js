"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerService = void 0;
const util = require("util");
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
    options = {
        withColor: true,
    };
    /**
     * Constructor privado para asegurar que no se pueda instanciar directamente.
     */
    constructor(options) {
        this.options.withColor = options?.withColor ?? true;
    }
    /**
     * Obtiene la única instancia de LoggerService.
     * @param options - Listado de opciones para aplicar a la instancia.
     * @returns La única instancia de LoggerService.
     */
    static getInstance(options) {
        if (!this.instance) {
            this.instance = new LoggerService(options);
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
     * Formatea el argumento que se va a imprimir.
     *
     * @param arg - argumento a formatear para imprimir.
     * @returns argumentos formateado.
     */
    formatArg(arg) {
        return util.inspect(arg, {
            showHidden: false,
            depth: null,
            colors: this.options.withColor,
        });
    }
    /**
     * Registra el mensaje en la consola.
     *
     * @param color - Color asociado al nivel de mensaje.
     * @param level - Nivel del mensaje.
     * @param message - Mensaje a ser registrado.
     * @param arg - Argumentos principal a imprimir.
     * @param otherArgs - Argumentos adicionales.
     */
    log(color, level, message, arg, ...otherArg) {
        if ((0, shared_utils_1.coerceBooleanProperty)(process.env.ZANOBIJS_LOGGER))
            console.log(this.options.withColor ? color : "", this.formatMessage(level, message), this.options.withColor ? shared_utils_1.colorPrint.white : "", this.formatArg(arg), ...otherArg);
    }
    /**
     * Registra un mensaje informativo.
     *
     * @param message - Mensaje informativo.
     * @param arg - Argumentos principal a imprimir.
     * @param otherArgs - Argumentos adicionales.
     */
    info(message, arg, ...otherArgs) {
        this.log(shared_utils_1.colorPrint.blue, "info", message, arg, ...otherArgs);
    }
    /**
     * Registra una advertencia.
     *
     * @param message - Mensaje de advertencia.
     * @param arg - Argumentos principal a imprimir.
     * @param otherArgs - Argumentos adicionales.
     */
    warn(message, arg, ...otherArgs) {
        this.log(shared_utils_1.colorPrint.orange, "warn", message, arg, ...otherArgs);
    }
    /**
     * Registra un mensaje de error.
     *
     * @param message - Mensaje de error.
     * @param arg - Argumentos principal a imprimir.
     * @param otherArgs - Argumentos adicionales.
     */
    error(message, arg, ...otherArgs) {
        this.log(shared_utils_1.colorPrint.red, "error", message, arg, ...otherArgs);
    }
    /**
     * Registra un mensaje de éxito.
     *
     * @param message - Mensaje de éxito.
     * @param arg - Argumentos principal a imprimir.
     * @param otherArgs - Argumentos adicionales.
     */
    success(message, arg, ...otherArgs) {
        this.log(shared_utils_1.colorPrint.green, "success", message, arg, ...otherArgs);
    }
    /**
     * Registra un mensaje de depuración.
     *
     * @param message - Mensaje de depuración.
     * @param arg - Argumentos principal a imprimir.
     * @param otherArgs - Argumentos adicionales.
     */
    debug(message, arg, ...otherArgs) {
        this.log(shared_utils_1.colorPrint.white, "debug", message, arg, ...otherArgs);
    }
    /**
     * Registra un mensaje de depuración.
     *
     * @param message - Mensaje de depuración.
     * @param arg - Argumentos principal a imprimir.
     * @param otherArgs - Argumentos adicionales.
     */
    important(message, arg, ...otherArgs) {
        this.log(shared_utils_1.colorPrint.BgRed, "important", message, arg, ...otherArgs);
    }
}
exports.LoggerService = LoggerService;
