"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inject = void 0;
const shared_utils_1 = require("../utils/shared.utils");
const constants_1 = require("../utils/constants");
/**
 * Decorador que permite inyectar dependencias en un parámetro de constructor.
 * Asocia un token de dependencia con un parámetro del constructor para su
 * posterior resolución mediante un contenedor de inyección de dependencias.
 *
 * @param {string} token - El token de la dependencia a inyectar.
 *
 * @returns {ParameterDecorator} - Un decorador de parámetro que aplica la lógica de inyección.
 *
 * @example
 * class MyService {
 *   constructor(@Inject('TOKEN_NAME') private dependency: DependencyType) {}
 * }
 */
function Inject(token) {
    return (target, propertyKey, parameterIndex) => {
        /** Intentar obtener el Map existente o crear uno nuevo si no existe */
        const existingParameters = Reflect.getMetadata(constants_1.DEPENDENCIES_INJECT, target) || new Map();
        /** Obtener el nombre del parámetro */
        const paramNames = (0, shared_utils_1.getConstructorParamNames)(target);
        const paramName = paramNames[parameterIndex];
        /** Agregar o actualizar el valor en el Map */
        existingParameters.set(token, paramName);
        /** Define los metadatos para el parametro.*/
        Reflect.defineMetadata(constants_1.DEPENDENCIES_INJECT, existingParameters, target);
        Reflect.defineMetadata(constants_1.HAS_INJECT, true, target);
    };
}
exports.Inject = Inject;
