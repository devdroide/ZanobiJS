"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Injectable = void 0;
require("reflect-metadata");
const logger_utils_1 = require("../utils/logger.utils");
const shared_utils_1 = require("../utils/shared.utils");
const constants_1 = require("../utils/constants");
const logger = (0, logger_utils_1.Logger)();
/**
 * Decorador de clase para marcar una clase como inyectable.
 *
 * Este decorador es útil para clases que desean ser instanciadas y gestionadas
 * por un contenedor de inyección de dependencias.  * Al utilizar este decorador,
 * se definen metadatos relacionados con las dependencias que necesita la clase.
 * @decorator
 * @returns {ClassDecorator} Una función de decorador de clase.
 */
const Injectable = () => {
    return (target) => {
        logger.debug("@Service target", target.name);
        /** Obtiene los tipos de dependencias de la clase utilizando los metadatos de diseño.*/
        const dependencies = Reflect.getMetadata(constants_1.DEPENDENCIES_CONSTRUCTOR, target) || [];
        logger.debug("@Service dependencies", dependencies);
        /** Obtiene los nombres de los parámetros del constructor de la clase.*/
        const paramNames = (0, shared_utils_1.getConstructorParamNames)(target);
        logger.debug("@Service paramNames", paramNames);
        /** Representa las dependencias de la clase en un formato específico.*/
        const dependenciesClass = dependencies.map((dependencie, index) => {
            return {
                type: "Service",
                TargeName: target.name,
                nameClass: dependencie.name,
                nameClassContainer: (0, shared_utils_1.unCapitalize)(dependencie.name),
                nameParameter: paramNames[index],
            };
        });
        /** Define los metadatos de dependencias en la clase. */
        Reflect.defineMetadata(constants_1.DEPENDENCIES_CLASS, dependenciesClass, target);
        Reflect.defineMetadata(constants_1.IS_SERVICE, true, target);
    };
};
exports.Injectable = Injectable;
