import { RuntimeException } from "@zanobijs/common/exceptions/runtime.exception";
/**
 * Excepción lanzada cuando se intenta obtener una dependencia
 * de un controlador o servicio y esta no fue registrada
 * en un modulo
 *
 * @remarks
 * Esta clase extiende la base `RuntimeException`de @zanobijs/core
 * para proporcionar detalles adicionales del error.
 *
 * @example
 * private service1: Service1
 * @Module{... services:["otherService"]}
 */
export declare class ContainerResolutionException extends RuntimeException {
    constructor(entity: string, resolutionError: string, detail: any);
}
/**
 * Excepción lanzada cuando se intenta obtener una entidad
 * (importar, controlador, servicio o exportar) que no fue
 * declarada en `@Module` de @zanobijs/common
 *
 * @remarks
 * Esta clase extiende la base `RuntimeException`de @zanobijs/core
 * para proporcionar detalles adicionales del error.
 */
export declare class ContainerResolutionEntityException extends RuntimeException {
    constructor(entity: string, detail: any);
}
