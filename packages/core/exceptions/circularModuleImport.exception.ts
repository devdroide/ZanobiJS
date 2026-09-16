import { RuntimeException } from '@zanobijs/common/exceptions/runtime.exception';
import { CIRCULAR_MODULE_IMPORT_ERROR } from './constant.message';

/**
 * Excepción lanzada cuando el grafo de `imports` entre módulos contiene un
 * ciclo: un módulo importa, directa o indirectamente, a otro módulo que ya
 * lo está importando a él.
 *
 * @remarks
 * Esta clase extiende la base `RuntimeException` de @zanobijs/common
 * para proporcionar detalles adicionales del error.
 */
export class CircularModuleImportException extends RuntimeException {
  constructor(chain: string) {
    super(CIRCULAR_MODULE_IMPORT_ERROR(chain));
  }
}
