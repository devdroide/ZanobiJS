import { RuntimeException } from '@zanobijs/common/exceptions/runtime.exception';
import { MISSING_INJECT_TOKEN_ERROR } from './constant.message';

/**
 * Excepción lanzada cuando un `@Inject(token)` no encuentra su provider
 * registrado, ni en el módulo actual ni en ninguno de los módulos importados.
 *
 * @remarks
 * Esta clase extiende la base `RuntimeException` de @zanobijs/common
 * para proporcionar detalles adicionales del error.
 */
export class MissingInjectTokenException extends RuntimeException {
  constructor(token: string, targetName: string, moduleName: string) {
    super(MISSING_INJECT_TOKEN_ERROR(token, targetName, moduleName));
  }
}
