import "reflect-metadata";
import { IModuleConfig } from "../interfaces";
/**
 * Decorador de clase para marcar una clase como módulo y agregar metadatos relacionados con la configuración del módulo.
 *
 * @decorator
 * @param {IModuleConfig} config Configuración del módulo que define propiedades y metadatos relacionados.
 * @returns {ClassDecorator} Una función de decorador de clase que añade los metadatos configurados a la clase.
 */
export declare function Module(config: IModuleConfig): ClassDecorator;
