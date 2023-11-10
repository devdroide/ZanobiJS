import { RuntimeException } from "@zanobijs/common/exceptions/runtime.exception";
import { CONTAINER_RESOLUTION_ERROR } from "./constant.message";

/**
 * Excepción lanzada cuando se intenta obtener una entidad
 * (importar, controlador, servicio o exportar) que no fue
 * declarada en `@Module` de @zanobijs/common
 *
 * @remarks
 * Esta clase extiende la base `RuntimeException`de @zanobijs/core
 * para proporcionar detalles adicionales del error.
 */
export class ContainerResolutionException extends RuntimeException {
  constructor(entity: string, detail: any = ``) {
    super(CONTAINER_RESOLUTION_ERROR(entity), detail);
  }
}
