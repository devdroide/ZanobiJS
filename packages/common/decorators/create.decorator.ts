import 'reflect-metadata';
import { IDependenciesClass } from '../interfaces';
import { Logger } from '../utils';
import { unCapitalize, getConstructorParamNames } from '../utils/shared.utils';
import {
  DEPENDENCIES_CONSTRUCTOR,
  DEPENDENCIES_CLASS,
} from '../utils/constants';
const logger = Logger();
// Función auxiliar que contiene la lógica común
export function createClassDecorator(
  type: 'Service' | 'Controller',
  metadataKey: string,
): ClassDecorator {
  return (target: Function) => {
    logger.debug(`@${type} target`, target.name);

    /** Obtiene los tipos de dependencias de la clase utilizando los metadatos de diseño.*/
    const dependencies: any[] =
      Reflect.getMetadata(DEPENDENCIES_CONSTRUCTOR, target) ?? [];
    logger.debug(`@${type} dependencies`, dependencies);

    /** Obtiene los nombres de los parámetros del constructor de la clase.*/
    const paramNames: any[] = getConstructorParamNames(target);
    logger.debug(`@${type} paramNames`, paramNames);

    /** Representa las dependencias de la clase en un formato específico.*/
    const dependenciesClass: Array<IDependenciesClass> = dependencies.map(
      (dependencie, index) => {
        return {
          type,
          TargeName: target.name,
          nameClass: dependencie.name,
          nameClassContainer: unCapitalize(dependencie.name),
          nameParameter: paramNames[index],
        };
      },
    );

    /** Define los metadatos de dependencias en la clase. */
    Reflect.defineMetadata(DEPENDENCIES_CLASS, dependenciesClass, target);
    Reflect.defineMetadata(metadataKey, true, target);
  };
}
