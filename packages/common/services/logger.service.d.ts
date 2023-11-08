import { ILoggerService } from "../interfaces";
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
export declare class LoggerService implements ILoggerService {
    /**
     * Instancia única del servicio LoggerService.
     */
    private static instance;
    /**
     * Constructor privado para asegurar que no se pueda instanciar directamente.
     */
    private constructor();
    /**
     * Obtiene la única instancia de LoggerService.
     *
     * @returns La única instancia de LoggerService.
     */
    static getInstance(): ILoggerService;
    /**
     * Formatea el mensaje a ser registrado.
     *
     * @param level - Nivel del mensaje (info, error, etc.).
     * @param message - Mensaje a ser formateado.
     * @returns Mensaje formateado.
     */
    private formatMessage;
    /**
     * Registra el mensaje en la consola.
     *
     * @param color - Color asociado al nivel de mensaje.
     * @param level - Nivel del mensaje.
     * @param message - Mensaje a ser registrado.
     * @param arg - Argumentos adicionales.
     */
    private log;
    /**
     * Registra un mensaje informativo.
     *
     * @param message - Mensaje informativo.
     * @param arg - Argumentos adicionales.
     */
    info(message: string, ...arg: any): void;
    /**
     * Registra una advertencia.
     *
     * @param message - Mensaje de advertencia.
     * @param arg - Argumentos adicionales.
     */
    warn(message: string, ...arg: any): void;
    /**
     * Registra un mensaje de error.
     *
     * @param message - Mensaje de error.
     * @param arg - Argumentos adicionales.
     */
    error(message: string, ...arg: any): void;
    /**
     * Registra un mensaje de éxito.
     *
     * @param message - Mensaje de éxito.
     * @param arg - Argumentos adicionales.
     */
    success(message: string, ...arg: any): void;
    /**
     * Registra un mensaje de depuración.
     *
     * @param message - Mensaje de depuración.
     * @param arg - Argumentos adicionales.
     */
    debug(message: string, ...arg: any): void;
}
