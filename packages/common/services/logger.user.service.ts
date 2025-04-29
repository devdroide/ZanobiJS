/* eslint-disable no-console */
import * as util from "util";
import { ILoggerUserService, IOptionsLog } from "../interfaces";
import { coerceBooleanProperty, colorPrint } from "../utils/shared.utils";
import { ProcessDataService } from "./masker/process/processData.service";
import { ProviderPatternService } from "./masker/process/providerPattern.service";

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
export class LoggerUserService implements ILoggerUserService {
  /**
   * Instancia única del servicio LoggerService.
   */
  private static instance: LoggerUserService;
  private options: IOptionsLog = {
    withColor: true,
    activeMasker: false,
    configSchemaMasker: {},
  };
  private providerPattern: ProviderPatternService =
    ProviderPatternService.getInstance();
  private processData: ProcessDataService = ProcessDataService.getInstance();
  private enableDeselectSchema: boolean = true;
  /**
   * Constructor privado para asegurar que no se pueda instanciar directamente.
   */
  private constructor(options?: IOptionsLog) {
    this.options.withColor = options?.withColor ?? true;
    this.options.activeMasker = options?.activeMasker ?? false;
    this.options.configSchemaMasker = options?.configSchemaMasker ?? {};
    this.initializeMasker();
  }

  /**
   * Obtiene la única instancia de LoggerService.
   * @param options - Listado de opciones para aplicar a la instancia.
   * @returns La única instancia de LoggerService.
   */
  static getInstance(options?: IOptionsLog): ILoggerUserService {
    if (!this.instance) {
      this.instance = new LoggerUserService(options);
    }
    return this.instance;
  }

  private initializeMasker() {
    if (this.options.activeMasker && this.options.configSchemaMasker) {
      this.providerPattern.setupSchema(this.options.configSchemaMasker);
      const keys = Object.keys(this.options.configSchemaMasker);
      if (keys.length === 1) {
        this.enableDeselectSchema = false;
        this.masker(keys[0]);
      }
    }
  }

  private deselectSchema() {
    if (this.enableDeselectSchema) {
      this.processData.deselectSchema();
    }
  }

  masker(schemaName: string): this {
    this.processData.selectSchema(schemaName);
    return this;
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
   * Formatea el argumento que se va a imprimir.
   *
   * @param arg - argumento a formatear para imprimir.
   * @returns argumentos formateado.
   */
  private formatArg(arg: any) {
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
   * @param arg - Argumentos adicionales.
   */
  private log(
    color: string,
    level: string,
    message: any,
    arg: any,
    ...otherArg: any
  ) {
    let messageProcess = message;
    let argProcess = arg;
    if (coerceBooleanProperty(process.env.ZANOBIJS_LOGGER_USER)) {
      if (this.options.activeMasker) {
        messageProcess = this.processData.process(messageProcess);
        argProcess = argProcess ? this.processData.process(argProcess) : "";
      }
      if (arg) {
        console.log(
          this.options.withColor ? color : "",
          this.formatMessage(level, messageProcess),
          this.options.withColor ? colorPrint.white : "",
          this.formatArg(argProcess),
          ...otherArg,
        );
      } else {
        console.log(
          this.options.withColor ? color : "",
          this.formatMessage(level, messageProcess),
          ...otherArg,
        );
      }
      this.deselectSchema();
    }
  }

  /**
   * Registra un mensaje informativo.
   *
   * @param message - Mensaje informativo.
   * @param arg - Argumentos principal a imprimir.
   * @param otherArgs - Argumentos adicionales.
   */
  info(message: string, arg: any, ...otherArgs: any) {
    this.log(colorPrint.blue, "info", message, arg, ...otherArgs);
  }

  /**
   * Registra una advertencia.
   *
   * @param message - Mensaje de advertencia.
   * @param arg - Argumentos principal a imprimir.
   * @param otherArgs - Argumentos adicionales.
   */
  warn(message: string, arg: any, ...otherArgs: any) {
    this.log(colorPrint.orange, "warn", message, arg, ...otherArgs);
  }

  /**
   * Registra un mensaje de error.
   *
   * @param message - Mensaje de error.
   * @param arg - Argumentos principal a imprimir.
   * @param otherArgs - Argumentos adicionales.
   */
  error(message: string, arg: any, ...otherArgs: any) {
    this.log(colorPrint.red, "error", message, arg, ...otherArgs);
  }

  /**
   * Registra un mensaje de éxito.
   *
   * @param message - Mensaje de éxito.
   * @param arg - Argumentos principal a imprimir.
   * @param otherArgs - Argumentos adicionales.
   */
  success(message: string, arg: any, ...otherArgs: any) {
    this.log(colorPrint.green, "success", message, arg, ...otherArgs);
  }

  /**
   * Registra un mensaje de depuración.
   *
   * @param message - Mensaje de depuración.
   * @param arg - Argumentos principal a imprimir.
   * @param otherArgs - Argumentos adicionales.
   */
  debug(message: string, arg: any, ...otherArgs: any) {
    this.log(colorPrint.white, "debug", message, arg, ...otherArgs);
  }

  /**
   * Registra un mensaje de depuración.
   *
   * @param message - Mensaje de depuración.
   * @param arg - Argumentos principal a imprimir.
   * @param otherArgs - Argumentos adicionales.
   */
  important(message: string, arg: any, ...otherArgs: any) {
    this.log(colorPrint.BgRed, "important", message, arg, ...otherArgs);
  }
}
