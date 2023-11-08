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
export declare function Inject(token: string): ParameterDecorator;
