import { IModuleConfig } from "../interfaces";
/**
 * Valida el nombre de las propiedades (keys) del módulo utilizando el esquema `modulesSchema`.
 *
 * Si las claves no son válidas según el esquema, la función lanzará un error
 * con el mensaje detallando la validación fallida.
 *
 * @param {IModuleConfig} keys Las propiedades del módulo a validar.
 * @throws {Error} Lanza un error si la validación falla.
 *
 * @example
 * const keys = { imports: ..., controllers: ..., services: ..., exports: ... };
 * validateModuleKey(keys);
 */
export declare function validateModuleKey(keys: IModuleConfig): void;
