/* eslint-disable no-console */
import { ABSBaseLoggerService } from "./base.logger.service";
import { ProcessDataService } from "./masker/process/processData.service";
import { ProviderPatternService } from "./masker/process/providerPattern.service";
import { ILoggerUserService, IOptionsLog } from "../interfaces";
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
export class LoggerUserService
  extends ABSBaseLoggerService
  implements ILoggerUserService
{
  /**
   * Instancia única del servicio LoggerUserService.
   */
  private static instance: LoggerUserService;
  private readonly providerPattern: ProviderPatternService =
    ProviderPatternService.getInstance();
  private readonly processData: ProcessDataService =
    ProcessDataService.getInstance();
  private enableDeselectSchema: boolean = true;
  /**
   * Constructor privado para asegurar que no se pueda instanciar directamente.
   */
  private constructor(options?: IOptionsLog) {
    super(options);
    this.initializeMasker();
  }

  /**
   * Obtiene la única instancia de LoggerUserService.
   * @param options - Listado de opciones para aplicar a la instancia.
   * @returns La única instancia de LoggerUserService.
   */
  static getInstance(options?: IOptionsLog): ILoggerUserService {
    if (!this.instance) {
      this.instance = new LoggerUserService(options);
    }
    return this.instance;
  }

  protected initializeMasker() {
    if (this.options.activeMasker && this.options.configSchemaMasker) {
      this.providerPattern.setupSchema(this.options.configSchemaMasker);
      const keys = Object.keys(this.options.configSchemaMasker);
      if (keys.length === 1) {
        this.enableDeselectSchema = false;
        this.masker(keys[0]);
      }
    }
  }

  protected deselectSchema() {
    if (this.enableDeselectSchema) {
      this.processData.deselectSchema();
    }
  }

  masker(schemaName: string): this {
    this.processData.selectSchema(schemaName);
    return this;
  }

  /**
   * Registra el mensaje en la consola.
   *
   * @param color - Color asociado al nivel de mensaje.
   * @param level - Nivel del mensaje.
   * @param message - Mensaje a ser registrado.
   * @param arg - Argumentos adicionales.
   */
  protected log(
    color: string,
    level: string,
    message: any,
    arg: any,
    ...otherArg: any
  ): void {
    // Si el logger no está activo, salir temprano
    if (!coerceBooleanProperty(process.env.ZANOBIJS_LOGGER_USER)) {
      return;
    }

    let messageProcess = message;
    let argProcess = arg;

    // Procesar los datos si el enmascarador está activo
    if (this.options.activeMasker) {
      messageProcess = this.processData.process(messageProcess);
      argProcess = arg ? this.processData.process(arg) : "";
    }

    // Determinar el color a usar
    const colorToUse = this.options.withColor ? color : "";
    const whiteColor = this.options.withColor ? colorPrint.white : "";

    // Formatear el mensaje principal
    const formattedMessage = this.formatMessage(level, messageProcess);

    // Imprimir el mensaje con o sin argumentos
    if (arg) {
      console.log(
        colorToUse,
        formattedMessage,
        whiteColor,
        this.formatArg(argProcess),
        ...otherArg,
      );
    } else {
      console.log(colorToUse, formattedMessage, ...otherArg);
    }

    this.deselectSchema();
  }

}
