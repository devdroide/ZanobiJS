"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const logger_service_1 = require("../services/logger.service");
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
const Logger = () => logger_service_1.LoggerService.getInstance();
exports.Logger = Logger;
