"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContainerResolutionEntityException = exports.ContainerResolutionException = void 0;
const runtime_exception_1 = require("@zanobijs/common/exceptions/runtime.exception");
const constant_message_1 = require("./constant.message");
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
class ContainerResolutionException extends runtime_exception_1.RuntimeException {
    constructor(entity, resolutionError, detail) {
        super((0, constant_message_1.CONTAINER_RESOLUTION_ERROR)(entity, resolutionError), detail);
    }
}
exports.ContainerResolutionException = ContainerResolutionException;
/**
 * Excepción lanzada cuando se intenta obtener una entidad
 * (importar, controlador, servicio o exportar) que no fue
 * declarada en `@Module` de @zanobijs/common
 *
 * @remarks
 * Esta clase extiende la base `RuntimeException`de @zanobijs/core
 * para proporcionar detalles adicionales del error.
 */
class ContainerResolutionEntityException extends runtime_exception_1.RuntimeException {
    constructor(entity, detail) {
        super((0, constant_message_1.CONTAINER_RESOLUTION_ENTITY_ERROR)(entity), detail);
    }
}
exports.ContainerResolutionEntityException = ContainerResolutionEntityException;
