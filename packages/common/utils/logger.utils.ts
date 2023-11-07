import { ILoggerService } from "../interfaces";
import { LoggerService } from "../services/logger.service";

/**
 * Función de fábrica que proporciona acceso a la única instancia del servicio `LoggerService`.
 *
 * @example
 * ```typescript
 * const logger = Logger();
 * logger.info('Este es un mensaje informativo');
 * ```
 *
 * @returns La única instancia de `LoggerService` que implementa la interfaz `ILoggerService`.
 */
export const Logger = (): ILoggerService => LoggerService.getInstance();

