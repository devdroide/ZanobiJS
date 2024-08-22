import * as util from "util";
import { ILoggerService, IOptionsLog } from "../interfaces";
import { coerceBooleanProperty, colorPrint } from "../utils/shared.utils";

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
export class LoggerUserService implements ILoggerService {
  /**
   * Instancia única del servicio LoggerService.
   */
  private static instance: LoggerUserService;
  private options: IOptionsLog = {
    withColor: true,
  };
  /**
   * Constructor privado para asegurar que no se pueda instanciar directamente.
   */
  private constructor(options?: IOptionsLog) {
    this.options.withColor = options?.withColor ?? true;
  }

  /**
   * Obtiene la única instancia de LoggerService.
   * @param options - Listado de opciones para aplicar a la instancia.
   * @returns La única instancia de LoggerService.
   */
  static getInstance(options?: IOptionsLog): ILoggerService {
    if (!this.instance) {
      this.instance = new LoggerUserService(options);
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
    const formatedMessage = util.inspect(message, {
      showHidden: false,
      depth: null,
      colors: this.options.withColor,
    });
    return `[${level.toUpperCase()}]: ${formatedMessage}`;
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
    if (coerceBooleanProperty(process.env.ZANOBIJS_LOGGER_USER))
      console.log(
        this.options.withColor ? color : "",
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
}
