import {
  InvalidModuleSchemaException,
  MODULE_INVALID_ENTITY,
  MODULE_INVALID_TYPE_ENTITY,
  MODULE_MISSING_ENTITY,
} from '../exceptions';
import { IModuleConfig } from '../interfaces';

const CLASS_ENTITIES = ['imports', 'controllers', 'exports'] as const;

function isFunction(value: unknown): boolean {
  return typeof value === 'function';
}

function isValidServiceProvider(value: unknown): boolean {
  if (isFunction(value)) return true;
  if (value === null || typeof value !== 'object') return false;
  const item = value as Record<string, unknown>;
  const hasProvider =
    typeof item.provider === 'string' || isFunction(item.provider);
  if (!hasProvider) return false;
  const useKeys = ['useValue', 'useClass', 'useFactory'].filter((key) =>
    Object.prototype.hasOwnProperty.call(item, key),
  );
  return useKeys.length === 1;
}

/**
 * Valida el nombre de las propiedades (keys) del módulo utilizando validación manual.
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
  for (const entity of CLASS_ENTITIES) {
    const value = keys[entity];
    if (value === undefined) {
      throw new InvalidModuleSchemaException(MODULE_MISSING_ENTITY(entity));
    }
    if (!Array.isArray(value) || !value.every(isFunction)) {
      throw new InvalidModuleSchemaException(MODULE_INVALID_ENTITY(entity));
    }
  }

  if (keys.services === undefined) {
    throw new InvalidModuleSchemaException(MODULE_MISSING_ENTITY('services'));
  }
  if (!Array.isArray(keys.services)) {
    throw new InvalidModuleSchemaException(MODULE_INVALID_ENTITY('services'));
  }
  if (!keys.services.every(isValidServiceProvider)) {
    throw new InvalidModuleSchemaException(
      MODULE_INVALID_TYPE_ENTITY('services'),
    );
  }
}
