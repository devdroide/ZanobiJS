import { ILoggerService, IOptionsLog } from "../interfaces";
/**
 * Servicio para manejar el registro de mensajes con diferentes niveles de importancia.
 * Implementa el patrón Singleton para garantizar una única instancia del servicio.
 *
 * @example
 * ```typescript
 * const logger = LoggerUserService.getInstance();
 * logger.info('Mensaje informativo');
 * logger.error('Mensaje de error');
 * ```
 */
export declare class LoggerUserService implements ILoggerService {
    /**
     * Instancia única del servicio LoggerService.
     */
    private static instance;
    private options;
    /**
     * Constructor privado para asegurar que no se pueda instanciar directamente.
     */
    private constructor();
    /**
     * Obtiene la única instancia de LoggerService.
     * @param options - Listado de opciones para aplicar a la instancia.
     * @returns La única instancia de LoggerService.
     */
    static getInstance(options?: IOptionsLog): ILoggerService;
    /**
     * Formatea el mensaje a ser registrado.
     *
     * @param level - Nivel del mensaje (info, error, etc.).
     * @param message - Mensaje a ser formateado.
     * @returns Mensaje formateado.
     */
    private formatMessage;
    /**
     * Formatea el argumento que se va a imprimir.
     *
     * @param arg - argumento a formatear para imprimir.
     * @returns argumentos formateado.
     */
    private formatArg;
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
     * @param arg - Argumentos principal a imprimir.
     * @param otherArgs - Argumentos adicionales.
     */
    info(message: string, arg: any, ...otherArgs: any): void;
    /**
     * Registra una advertencia.
     *
     * @param message - Mensaje de advertencia.
     * @param arg - Argumentos principal a imprimir.
     * @param otherArgs - Argumentos adicionales.
     */
    warn(message: string, arg: any, ...otherArgs: any): void;
    /**
     * Registra un mensaje de error.
     *
     * @param message - Mensaje de error.
     * @param arg - Argumentos principal a imprimir.
     * @param otherArgs - Argumentos adicionales.
     */
    error(message: string, arg: any, ...otherArgs: any): void;
    /**
     * Registra un mensaje de éxito.
     *
     * @param message - Mensaje de éxito.
     * @param arg - Argumentos principal a imprimir.
     * @param otherArgs - Argumentos adicionales.
     */
    success(message: string, arg: any, ...otherArgs: any): void;
    /**
     * Registra un mensaje de depuración.
     *
     * @param message - Mensaje de depuración.
     * @param arg - Argumentos principal a imprimir.
     * @param otherArgs - Argumentos adicionales.
     */
    debug(message: string, arg: any, ...otherArgs: any): void;
    /**
     * Registra un mensaje de depuración.
     *
     * @param message - Mensaje de depuración.
     * @param arg - Argumentos principal a imprimir.
     * @param otherArgs - Argumentos adicionales.
     */
    important(message: string, arg: any, ...otherArgs: any): void;
}
