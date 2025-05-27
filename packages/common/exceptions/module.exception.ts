import { MODULE_ERROR } from './constant.message';
import { RuntimeException } from './runtime.exception';

/**
 * Excepción lanzada cuando un esquema de módulo es inválido.
 *
 * @remarks
 * Esta clase extiende la base `RuntimeException` para proporcionar detalles
 * adicionales específicos a esquemas de módulos inválidos.
 */
export class InvalidModuleSchemaException extends RuntimeException {
  /**
   * @param detail - Mensaje que detallada mejor la causa la excepción.
   */
  constructor(detail: any) {
    super(MODULE_ERROR(), detail);
  }
}
