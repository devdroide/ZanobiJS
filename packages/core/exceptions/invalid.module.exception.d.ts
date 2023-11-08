import { RuntimeException } from "zanobijs-common/exceptions/runtime.exception";
/**
 * Excepción lanzada cuando una clase Modulo no tiene el decorador `@Module`
 * de zanobijs-common
 *
 * @remarks
 * Esta clase extiende la base `RuntimeException`de zanobijs-common
 * para proporcionar detalles adicionales específicos a esquemas de módulos inválidos.
 */
export declare class InvalidModuleAnnotationException extends RuntimeException {
    constructor(detail?: any);
}
