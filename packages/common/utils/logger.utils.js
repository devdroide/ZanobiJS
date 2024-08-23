"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerUser = exports.Logger = void 0;
const logger_service_1 = require("../services/logger.service");
const logger_user_service_1 = require("../services/logger.user.service");
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
const Logger = (options) => logger_service_1.LoggerService.getInstance(options);
exports.Logger = Logger;
const LoggerUser = (options) => logger_user_service_1.LoggerUserService.getInstance(options);
exports.LoggerUser = LoggerUser;
