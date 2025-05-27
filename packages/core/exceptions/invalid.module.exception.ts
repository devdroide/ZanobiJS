import { RuntimeException } from '@zanobijs/common/exceptions/runtime.exception';
import { MODULE_INVALID_ANNOTATION_ERROR } from './constant.message';

/**
 * Excepción lanzada cuando una clase Modulo no tiene el decorador `@Module`
 * de @zanobijs/common
 *
 * @remarks
 * Esta clase extiende la base `RuntimeException`de @zanobijs/common
 * para proporcionar detalles adicionales específicos a esquemas de módulos inválidos.
 */
export class InvalidModuleAnnotationException extends RuntimeException {
  constructor(detail: any = '') {
    super(MODULE_INVALID_ANNOTATION_ERROR(), detail);
  }
}
