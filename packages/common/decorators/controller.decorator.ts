import { IS_CONTROLLER } from '../utils/constants';
import { createClassDecorator } from './create.decorator';
import { IClassDecoratorOptions } from '../interfaces';

/**
 * Decorador de clase para marcar una clase como controllador.
 *
 * Este decorador es útil para clases que desean ser instanciadas y gestionadas
 * por un contenedor de inyección de dependencias. Al utilizar este decorador,
 * se definen metadatos relacionados con las dependencias que necesita la clase.
 * @decorator
 * @param {IClassDecoratorOptions} [options] - Opciones, ej. `{ lifetime: 'request' }`.
 * Por defecto `lifetime` es `'singleton'`.
 * @returns {ClassDecorator} Una función de decorador de clase.
 */
export const Controller = (options?: IClassDecoratorOptions): ClassDecorator =>
  createClassDecorator('Controller', IS_CONTROLLER, options);
