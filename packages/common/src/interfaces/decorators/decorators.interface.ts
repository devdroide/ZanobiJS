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
