import { InvalidModuleSchemaException } from '../exceptions';
import { IModuleConfig } from '../interfaces';
import { modulesSchema } from '../schemas';

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
export function validateModuleKey(keys: IModuleConfig) {
  const { error } = modulesSchema.validate(keys);
  if (error) throw new InvalidModuleSchemaException(error.message);
}
