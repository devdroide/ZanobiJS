/**
 * Verifica si el valor proporcionado es una función.
 *
 * @param value - El valor a verificar.
 * @returns Verdadero si el valor es una función; falso de lo contrario.
 */
export declare function isFunction(value: any): boolean;
/**
 * Verifica si la función proporcionada es una clase.
 *
 * @param func - La función a verificar.
 * @returns Verdadero si es una clase; falso de lo contrario.
 */
export declare function isClass(func: any): boolean;
/**
 * Verifica si el valor proporcionado es un objeto.
 *
 * @param value - El valor a verificar.
 * @returns Verdadero si el valor es un objeto; falso de lo contrario.
 */
export declare function isObject(value: any): boolean;
/**
 * Verifica si el valor proporcionado es un array.
 *
 * @param value - El valor a verificar.
 * @returns Verdadero si el valor es un array; falso de lo contrario.
 */
export declare function isArray(value: any): boolean;
/**
 * Verifica si el valor proporcionado es un Map.
 *
 * @param value - El valor a verificar.
 * @returns Verdadero si el valor es un Map; falso de lo contrario.
 */
export declare function isMap(value: any): boolean;
/**
 * Verifica si el valor proporcionado es null.
 *
 * @param value - El valor a verificar.
 * @returns Verdadero si el valor es null; falso de lo contrario.
 */
export declare function isNull(value: any): boolean;
/**
 * Verifica si el valor proporcionado es undefined.
 *
 * @param value - El valor a verificar.
 * @returns Verdadero si el valor es undefined; falso de lo contrario.
 */
export declare function isUndefined(value: any): boolean;
/**
 * Verifica si el valor (objeto o array) proporcionado está vacío.
 *
 * @param val - El objeto o array a verificar.
 * @returns Verdadero si el objeto o array está vacío; falso de lo contrario.
 */
export declare const isEmpty: (val: object | any[]) => boolean;
/**
 * Convierte el valor proporcionado en booleano.
 *
 * @param value - El valor a convertir.
 * @returns Verdadero si el valor es distinto de null y no es "false"; falso de lo contrario.
 */
export declare function coerceBooleanProperty(value: any): boolean;
/**
 * Devuelve una palabra con la primera letra en minúsculas.
 * @param {string} word Palabra a formatear
 * @returns {string} Palabra formateada
 */
export declare const unCapitalize: (word: string) => string;
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
export declare const getConstructorParamNames: (func: Function | Object) => string[];
/**
 * Objeto con los colores a usar en servicio de registro de logs
 */
export declare const colorPrint: Readonly<{
    red: "\u001B[31m";
    green: "\u001B[32m";
    orange: "\u001B[33m";
    blue: "\u001B[34m";
    white: "\u001B[37m";
    BgRed: "\u001B[41m";
    BgGreen: "\u001B[42m";
    BgOrange: "\u001B[43m";
    BgBlue: "\u001B[44m";
    BgWhite: "\u001B[47m";
}>;
