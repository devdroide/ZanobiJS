/**
 * Interfaz que representa la estructura dela metadata para las dependencias.
 * - type: Tipo de dependencia Service | Controller
 * - nameClass: Nombre de la dependencia directa desde constructor.name
 * - nameClassContainer: Nombre que tendra la dependencia en el contenedor (CamelCase)
 * - nameParameter: Nombre de el parametro que usara esa dependecia
 */
export interface IDependenciesClass {
  type: string;
  nameClass: string;
  nameClassContainer: string;
  nameParameter: string;
}

/**
 * Ciclo de vida de una clase dentro del contenedor de inyección de dependencias.
 * - singleton: una sola instancia para toda la vida del proceso (default).
 * - request: una instancia nueva por cada `factory.createRequestScope()`.
 * - transient: una instancia nueva en cada resolución.
 */
export type ClassLifetime = 'singleton' | 'request' | 'transient';

/**
 * Opciones aceptadas por `@Injectable` y `@Controller`.
 */
export interface IClassDecoratorOptions {
  lifetime?: ClassLifetime;
}
