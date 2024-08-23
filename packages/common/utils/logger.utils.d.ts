import { ILoggerService, IOptionsLog } from "../interfaces";
/**
 * Función de fábrica que proporciona acceso a la única instancia del servicio `LoggerService`.
 *
 * @example
 * ```typescript
 * const logger = Logger();
 * logger.info('Este es un mensaje informativo');
 * const logger = Logger({ withColor: false });
 * logger.info('Este es un mensaje informativo'); // print without color in console
 * ```
 *
 * @returns La única instancia de `LoggerService` que implementa la interfaz `ILoggerService`.
 */
export declare const Logger: (options?: IOptionsLog) => ILoggerService;
export declare const LoggerUser: (options?: IOptionsLog) => ILoggerService;
