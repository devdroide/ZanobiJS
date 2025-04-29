import "reflect-metadata";
import { validateModuleKey } from "../validations";
import { IModuleConfig } from "../interfaces";
import { IS_MODULE } from "../utils/constants";
/**
 * Decorador de clase para marcar una clase como módulo y agregar metadatos relacionados con la configuración del módulo.
 *
 * @decorator
 * @param {IModuleConfig} config Configuración del módulo que define propiedades y metadatos relacionados.
 * @returns {ClassDecorator} Una función de decorador de clase que añade los metadatos configurados a la clase.
 */
export function Module(config: IModuleConfig): ClassDecorator {

  /** Validar las claves del módulo en la configuración proporcionada.*/
  validateModuleKey(config);
  return (target: Function) => {
    /** Define los metadatos para la clase.*/
    Reflect.defineMetadata(IS_MODULE, true, target);
    for (const property in config) {
      Reflect.defineMetadata(
        `module:${property}`,
        (config)[property],
        target,
      );
    }

  };
}

