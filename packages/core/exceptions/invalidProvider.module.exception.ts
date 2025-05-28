import { RuntimeException } from '@zanobijs/common/exceptions/runtime.exception';
import { PROVIDER_INVALID_MODULE_ERROR } from './constant.message';

/**
 * Excepción lanzada cuando una clase Modulo no tiene un provedor definido correctamente
 * de @zanobijs/common
 *
 * @remarks
 * Esta clase extiende la base `RuntimeException`de @zanobijs/common
 * para proporcionar detalles adicionales específicos a esquemas de módulos inválidos.
 */
export class InvalidProviderModuleException extends RuntimeException {
  constructor(entity: string, moduleName: string, detail: string) {
    super(PROVIDER_INVALID_MODULE_ERROR(entity, moduleName), detail);
  }
}
