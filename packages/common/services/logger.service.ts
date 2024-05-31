import { ILoggerService } from "../interfaces";
import { coerceBooleanProperty, colorPrint } from "../utils/shared.utils";

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
export class LoggerService implements ILoggerService {
  /**
   * Instancia única del servicio LoggerService.
   */
  private static instance: LoggerService;

  /**
   * Constructor privado para asegurar que no se pueda instanciar directamente.
   */
  private constructor() {}

  /**
   * Obtiene la única instancia de LoggerService.
   *
   * @returns La única instancia de LoggerService.
   */
  static getInstance(): ILoggerService {
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
  private formatMessage(level: string, message: any) {
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
  private log(color: string, level: string, message: any, ...arg: any) {
    if(level === "important")
      console.log(
        color,
        this.formatMessage(level, message),
        colorPrint.white,
        ...arg,
      );
    if (level !== "important" && coerceBooleanProperty(process.env.ZANOBIJS_LOGGER))
      console.log(
        color,
        this.formatMessage(level, message),
        colorPrint.white,
        ...arg,
      );
  }

  /**
   * Registra un mensaje informativo.
   *
   * @param message - Mensaje informativo.
   * @param arg - Argumentos adicionales.
   */
  info(message: string, ...arg: any) {
    this.log(colorPrint.blue, "info", message, ...arg);
  }

  /**
   * Registra una advertencia.
   *
   * @param message - Mensaje de advertencia.
   * @param arg - Argumentos adicionales.
   */
  warn(message: string, ...arg: any) {
    this.log(colorPrint.orange, "warn", message, ...arg);
  }

  /**
   * Registra un mensaje de error.
   *
   * @param message - Mensaje de error.
   * @param arg - Argumentos adicionales.
   */
  error(message: string, ...arg: any) {
    this.log(colorPrint.red, "error", message, ...arg);
  }

  /**
   * Registra un mensaje de éxito.
   *
   * @param message - Mensaje de éxito.
   * @param arg - Argumentos adicionales.
   */
  success(message: string, ...arg: any) {
    this.log(colorPrint.green, "success", message, ...arg);
  }

  /**
   * Registra un mensaje de depuración.
   *
   * @param message - Mensaje de depuración.
   * @param arg - Argumentos adicionales.
   */
  debug(message: string, ...arg: any) {
    this.log(colorPrint.white, "debug", message, ...arg);
  }

  /**
   * Registra un mensaje de depuración.
   *
   * @param message - Mensaje de depuración.
   * @param arg - Argumentos adicionales.
   */
  important(message: string, ...arg: any) {
    this.log(colorPrint.red, "important", message, ...arg);
  }
}
