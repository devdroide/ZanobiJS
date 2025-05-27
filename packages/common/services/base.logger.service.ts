import * as util from 'util';
import { IOptionsLog } from '../interfaces';
import { colorPrint } from '../utils/shared.utils';

/**
 * Clase base abstracta para implementaciones de loggers
 */
export abstract class ABSBaseLoggerService {
  protected readonly options: IOptionsLog = {
    withColor: true,
  };

  protected constructor(options?: IOptionsLog) {
    this.options.withColor = options?.withColor ?? true;
    this.options.activeMasker = options?.activeMasker ?? false;
    this.options.configSchemaMasker = options?.configSchemaMasker ?? {};
  }

  /**
   * Formatea el mensaje a ser registrado.
   *
   * @param level - Nivel del mensaje (info, error, etc.).
   * @param message - Mensaje a ser formateado.
   * @returns Mensaje formateado.
   */
  protected formatMessage(level: string, message: any) {
    return `[${level.toUpperCase()}]: ${message}`;
  }

  /**
   * Formatea el argumento que se va a imprimir.
   *
   * @param arg - argumento a formatear para imprimir.
   * @returns argumentos formateado.
   */
  protected formatArg(arg: any) {
    return util.inspect(arg, {
      showHidden: false,
      depth: null,
      colors: this.options.withColor,
    });
  }

  /**
   * Método abstracto para registrar mensajes - cada implementación concreta
   * debe proporcionar su propia lógica específica
   *
   * @param color - Color asociado al nivel de mensaje.
   * @param level - Nivel del mensaje.
   * @param message - Mensaje a ser registrado.
   * @param arg - Argumentos adicionales.
   */
  protected abstract log(
    color: string,
    level: string,
    message: any,
    arg: any,
    ...otherArg: any
  ): void;

  /**
   * Registra un mensaje informativo.
   *
   * @param message - Mensaje informativo.
   * @param arg - Argumentos principal a imprimir.
   * @param otherArgs - Argumentos adicionales.
   */
  info(message: string, arg: any, ...otherArgs: any) {
    this.log(colorPrint.blue, 'info', message, arg, ...otherArgs);
  }

  /**
   * Registra una advertencia.
   *
   * @param message - Mensaje de advertencia.
   * @param arg - Argumentos principal a imprimir.
   * @param otherArgs - Argumentos adicionales.
   */
  warn(message: string, arg: any, ...otherArgs: any) {
    this.log(colorPrint.orange, 'warn', message, arg, ...otherArgs);
  }

  /**
   * Registra un mensaje de error.
   *
   * @param message - Mensaje de error.
   * @param arg - Argumentos principal a imprimir.
   * @param otherArgs - Argumentos adicionales.
   */
  error(message: string, arg: any, ...otherArgs: any) {
    this.log(colorPrint.red, 'error', message, arg, ...otherArgs);
  }

  /**
   * Registra un mensaje de éxito.
   *
   * @param message - Mensaje de éxito.
   * @param arg - Argumentos principal a imprimir.
   * @param otherArgs - Argumentos adicionales.
   */
  success(message: string, arg: any, ...otherArgs: any) {
    this.log(colorPrint.green, 'success', message, arg, ...otherArgs);
  }

  /**
   * Registra un mensaje de depuración.
   *
   * @param message - Mensaje de depuración.
   * @param arg - Argumentos principal a imprimir.
   * @param otherArgs - Argumentos adicionales.
   */
  debug(message: string, arg: any, ...otherArgs: any) {
    this.log(colorPrint.white, 'debug', message, arg, ...otherArgs);
  }

  /**
   * Registra un mensaje de depuración.
   *
   * @param message - Mensaje de depuración.
   * @param arg - Argumentos principal a imprimir.
   * @param otherArgs - Argumentos adicionales.
   */
  important(message: string, arg: any, ...otherArgs: any) {
    this.log(colorPrint.BgRed, 'important', message, arg, ...otherArgs);
  }
}
