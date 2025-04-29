import { getConstructorParamNames } from "../utils/shared.utils";
import { DEPENDENCIES_INJECT, HAS_INJECT } from "../utils/constants";

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
export function Inject(token: string): ParameterDecorator {
  return (
    target: object,
    propertyKey: string | symbol,
    parameterIndex: number,
  ) => {
    /** Intentar obtener el Map existente o crear uno nuevo si no existe */
    const existingParameters: Map<string, string> =
      Reflect.getMetadata(DEPENDENCIES_INJECT, target) ?? new Map();

    /** Obtener el nombre del parámetro */
    const paramNames = getConstructorParamNames(target);
    const paramName = paramNames[parameterIndex];


    /** Agregar o actualizar el valor en el Map */
    existingParameters.set(token, paramName);
    /** Define los metadatos para el parametro.*/
    Reflect.defineMetadata(DEPENDENCIES_INJECT, existingParameters, target);
    Reflect.defineMetadata(HAS_INJECT, true, target);
  };
}
