import { ILoggerService, IOptionsLog } from '../interfaces';
import { coerceBooleanProperty, colorPrint } from '../utils/shared.utils';
import { ABSBaseLoggerService } from './base.logger.service';

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
export class LoggerService
  extends ABSBaseLoggerService
  implements ILoggerService
{
  /**
   * Instancia única del servicio LoggerService.
   */
  private static instance: LoggerService;

  /**
   * Constructor privado para asegurar que no se pueda instanciar directamente.
   */
  private constructor(options?: IOptionsLog) {
    super(options);
  }

  /**
   * Obtiene la única instancia de LoggerService.
   * @param options - Listado de opciones para aplicar a la instancia.
   * @returns La única instancia de LoggerService.
   */
  static getInstance(options?: IOptionsLog): ILoggerService {
    if (!this.instance) {
      this.instance = new LoggerService(options);
    }
    return this.instance;
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
    if (!coerceBooleanProperty(process.env.ZANOBIJS_LOGGER)) {
      return;
    }
    const colorToUse = this.options.withColor ? color : '';
    const whiteColor = this.options.withColor ? colorPrint.white : '';
    const formattedMessage = this.formatMessage(level, message);

    if (arg) {
      console.log(
        colorToUse,
        formattedMessage,
        whiteColor,
        this.formatArg(arg),
        ...otherArg,
      );
    } else {
      console.log(colorToUse, formattedMessage, ...otherArg);
    }
  }
}
