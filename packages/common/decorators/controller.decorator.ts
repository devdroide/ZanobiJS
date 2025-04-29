import "reflect-metadata";
import { IDependenciesClass } from "../interfaces";
import { Logger } from "../utils";
import { unCapitalize, getConstructorParamNames } from "../utils/shared.utils";
import {
  DEPENDENCIES_CONSTRUCTOR,
  DEPENDENCIES_CLASS,
  IS_CONTROLLER,
} from "../utils/constants";
const logger = Logger();
/**
 * Decorador de clase para marcar una clase como controllador.
 *
 * Este decorador es útil para clases que desean ser instanciadas y gestionadas
 * por un contenedor de inyección de dependencias. Al utilizar este decorador,
 * se definen metadatos relacionados con las dependencias que necesita la clase.
 * @decorator
 * @returns {ClassDecorator} Una función de decorador de clase.
 */
export const Controller = (): ClassDecorator => {
  return (target: Function) => {
    logger.debug("@Controller target", target.name);

    /** Obtiene los tipos de dependencias de la clase utilizando los metadatos de diseño.*/
    const dependencies: any[] =
      Reflect.getMetadata(DEPENDENCIES_CONSTRUCTOR, target) || [];
    logger.debug("@Controller dependencies", dependencies);
    /** Obtiene los nombres de los parámetros del constructor de la clase. */
    const paramNames: any[] = getConstructorParamNames(target);
    logger.debug("@Controller paramNames", paramNames);

    /** Representa las dependencias de la clase en un formato específico. */
    const dependenciesClass: Array<IDependenciesClass> = dependencies.map(
      (dependencie, index) => {
        return {
          type: "Controller",
          TargeName: target.name,
          nameClass: dependencie.name,
          nameClassContainer: unCapitalize(dependencie.name),
          nameParameter: paramNames[index],
        };
      },
    );

    /** Define los metadatos para la clase.*/
    Reflect.defineMetadata(DEPENDENCIES_CLASS, dependenciesClass, target);
    Reflect.defineMetadata(IS_CONTROLLER, true, target);
  };
};
