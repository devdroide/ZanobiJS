"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
require("reflect-metadata");
const utils_1 = require("../utils");
const shared_utils_1 = require("../utils/shared.utils");
const constants_1 = require("../utils/constants");
const logger = (0, utils_1.Logger)();
/**
 * Decorador de clase para marcar una clase como controllador.
 *
 * Este decorador es útil para clases que desean ser instanciadas y gestionadas
 * por un contenedor de inyección de dependencias. Al utilizar este decorador,
 * se definen metadatos relacionados con las dependencias que necesita la clase.
 * @decorator
 * @returns {ClassDecorator} Una función de decorador de clase.
 */
const Controller = () => {
    return (target) => {
        logger.debug("@Controller target", target.name);
        /** Obtiene los tipos de dependencias de la clase utilizando los metadatos de diseño.*/
        const dependencies = Reflect.getMetadata(constants_1.DEPENDENCIES_CONSTRUCTOR, target) || [];
        logger.debug("@Controller dependencies", dependencies);
        /** Obtiene los nombres de los parámetros del constructor de la clase. */
        const paramNames = (0, shared_utils_1.getConstructorParamNames)(target);
        logger.debug("@Controller paramNames", paramNames);
        /** Representa las dependencias de la clase en un formato específico. */
        const dependenciesClass = dependencies.map((dependencie, index) => {
            return {
                type: "Controller",
                TargeName: target.name,
                nameClass: dependencie.name,
                nameClassContainer: (0, shared_utils_1.unCapitalize)(dependencie.name),
                nameParameter: paramNames[index],
            };
        });
        /** Define los metadatos para la clase.*/
        Reflect.defineMetadata(constants_1.DEPENDENCIES_CLASS, dependenciesClass, target);
        Reflect.defineMetadata(constants_1.IS_CONTROLLER, true, target);
    };
};
exports.Controller = Controller;
