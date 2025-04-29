import { RuntimeException } from "./runtime.exception";

/**
 * Excepción lanzada cuando un esquema de módulo es inválido.
 *
 * @remarks
 * Esta clase extiende la base `RuntimeException` para proporcionar detalles
 * adicionales específicos a esquemas de módulos inválidos.
 */
export class PatternException extends RuntimeException {
  /**
   * @param detail - Mensaje que detallada mejor la causa la excepción.
   */
  constructor(message: any, cause?: any) {
    super(message);
    this.cause = cause ?? "";
  }
}
