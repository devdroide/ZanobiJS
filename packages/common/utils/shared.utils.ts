/**
 * Verifica si el valor proporcionado es una función.
 *
 * @param value - El valor a verificar.
 * @returns Verdadero si el valor es una función; falso de lo contrario.
 */
export function isFunction(value: any): boolean {
  return typeof value === "function" && isEmpty(value.prototype);
}

/**
 * Verifica si la función proporcionada es una clase.
 *
 * @param func - La función a verificar.
 * @returns Verdadero si es una clase; falso de lo contrario.
 */
export function isClass(func: any): boolean {
  if (typeof func !== "function") return false;

  const funcAsString = Function.prototype.toString.call(func);
  return /^class\s/.test(funcAsString);
}

/**
 * Verifica si el valor proporcionado es un objeto.
 *
 * @param value - El valor a verificar.
 * @returns Verdadero si el valor es un objeto; falso de lo contrario.
 */
export function isObject(value: any): boolean {
  return (
    value !== null &&
    !Array.isArray(value) &&
    typeof value === "object" &&
    !(value instanceof Map)
  );
}

/**
 * Verifica si el valor proporcionado es un array.
 *
 * @param value - El valor a verificar.
 * @returns Verdadero si el valor es un array; falso de lo contrario.
 */
export function isArray(value: any): boolean {
  return Array.isArray(value);
}

/**
 * Verifica si el valor proporcionado es un Map.
 *
 * @param value - El valor a verificar.
 * @returns Verdadero si el valor es un Map; falso de lo contrario.
 */
export function isMap(value: any): boolean {
  return value instanceof Map;
}

/**
 * Verifica si el valor proporcionado es un posible objeto transformado en cadena.
 *
 * @param value - El valor a verificar.
 * @returns Verdadero si el valor es un posible objeto; falso de lo contrario.
 */
export function isObjectString(value: string) {
  const trimmed = value.trim();
  return trimmed.startsWith("{") && trimmed.endsWith("}");
}

/**
 * Verifica si el valor proporcionado es un posible array transformado en cadena.
 *
 * @param value - El valor a verificar.
 * @returns Verdadero si el valor es un posible array; falso de lo contrario.
 */
export function isArrayString(value: string) {
  const trimmed = value.trim();
  return trimmed.startsWith("[") && trimmed.endsWith("]");
}

/**
 * Verifica si el valor proporcionado es null.
 *
 * @param value - El valor a verificar.
 * @returns Verdadero si el valor es null; falso de lo contrario.
 */
export function isNull(value: any): boolean {
  return value === null;
}

/**
 * Verifica si el valor proporcionado es undefined.
 *
 * @param value - El valor a verificar.
 * @returns Verdadero si el valor es undefined; falso de lo contrario.
 */
export function isUndefined(value: any): boolean {
  return typeof value === "undefined";
}

/**
 * Verifica si el valor (objeto o array) proporcionado está vacío.
 *
 * @param val - El objeto o array a verificar.
 * @returns Verdadero si el objeto o array está vacío; falso de lo contrario.
 */
export const isEmpty = (val: object | any[]): boolean => {
  if (Array.isArray(val)) {
    return val.length === 0;
  } else if (typeof val === "object") {
    return Object.keys(val).length === 0;
  }
  return false;
};

/**
 * Convierte el valor proporcionado en booleano.
 *
 * @param value - El valor a convertir.
 * @returns Verdadero si el valor es distinto de null y no es "false"; falso de lo contrario.
 */
export function coerceBooleanProperty(value: any): boolean {
  return value != null && `${value}` !== "false";
}

/**
 * Devuelve una palabra con la primera letra en minúsculas.
 * @param {string} word Palabra a formatear
 * @returns {string} Palabra formateada
 *
 * @example
 * ControllerExample ===> controllerExample
 */
export const unCapitalize = (word: string): string =>
  word.charAt(0).toLowerCase() + word.slice(1);

/**
 * Obtiene los nombres de los parámetros del constructor de una función o clase.
 *
 * Esta función es útil cuando se quiere inspeccionar y/o manipular los argumentos
 * de un constructor o función sin tener que ejecutarlo.
 *
 * @param {Function} func Función o constructor de la que se quieren obtener los nombres de los parámetros.
 * @returns {string[]} Array de nombres de parámetros.
 *
 * @example
 * function exampleFunc(arg1, arg2) {}
 * getConstructorParamNames(exampleFunc) // Devuelve ["arg1", "arg2"]
 */
export const getConstructorParamNames = (func: Function | object): string[] => {
  const ctorString = func.toString();
  /** Encuentra lo que está dentro de los paréntesis del constructor. */
  const ctorRegex = /constructor\s*\(([^)]*)\)/;
  const ctorParamsMatch = ctorRegex.exec(ctorString);
  /** Verifica si paramsString está vacío */
  if (!ctorParamsMatch) return [];

  const paramsString = ctorParamsMatch[1].trim();
  /** Verifica si paramsString está vacío */
  if (!paramsString) return [];

  return paramsString.split(",").map((param) => {
    /** Elimina los catacteres incluyendo ":" o "=" para manejar anotaciones de tipo y valores predeterminados */
    return param.split(":")[0].split("=")[0].trim();
  });
};

/**
 * Objeto con los colores a usar en servicio de registro de logs
 */
export const colorPrint = Object.freeze({
  red: "\x1b[31m",
  green: "\x1b[32m",
  orange: "\x1b[33m",
  blue: "\x1b[34m",
  white: "\x1b[37m",
  BgRed: "\x1b[41m",
  BgGreen: "\x1b[42m",
  BgOrange: "\x1b[43m",
  BgBlue: "\x1b[44m",
  BgWhite: "\x1b[47m",
});
