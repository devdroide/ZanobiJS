import "reflect-metadata";
import { IDependenciesClass } from "../interfaces";
import { Logger } from "../utils/logger.utils";
import { unCapitalize, getConstructorParamNames } from "../utils/shared.utils";
import {
  DEPENDENCIES_CONSTRUCTOR,
  DEPENDENCIES_CLASS,
  IS_SERVICE,
} from "../utils/constants";
const logger = Logger();
/**
 * Decorador de clase para marcar una clase como inyectable.
 *
 * Este decorador es útil para clases que desean ser instanciadas y gestionadas
 * por un contenedor de inyección de dependencias.  * Al utilizar este decorador,
 * se definen metadatos relacionados con las dependencias que necesita la clase.
 * @decorator
 * @returns {ClassDecorator} Una función de decorador de clase.
 */
export const Injectable = (): ClassDecorator => {
  return (target: Function) => {
    logger.debug("@Service target", target.name);

    /** Obtiene los tipos de dependencias de la clase utilizando los metadatos de diseño.*/
    const dependencies: any[] =
      Reflect.getMetadata(DEPENDENCIES_CONSTRUCTOR, target) || [];
    logger.debug("@Service dependencies", dependencies);

    /** Obtiene los nombres de los parámetros del constructor de la clase.*/
    const paramNames: any[] = getConstructorParamNames(target);
    logger.debug("@Service paramNames", paramNames);

    /** Representa las dependencias de la clase en un formato específico.*/
    const dependenciesClass: Array<IDependenciesClass> = dependencies.map(
      (dependencie, index) => {
        return {
          type: "Service",
          TargeName: target.name,
          nameClass: dependencie.name,
          nameClassContainer: unCapitalize(dependencie.name),
          nameParameter: paramNames[index],
        };
      },
    );

    /** Define los metadatos de dependencias en la clase. */
    Reflect.defineMetadata(DEPENDENCIES_CLASS, dependenciesClass, target);
    Reflect.defineMetadata(IS_SERVICE, true, target);
  };
};
