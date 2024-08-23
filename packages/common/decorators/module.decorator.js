"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = void 0;
require("reflect-metadata");
const validations_1 = require("../validations");
const constants_1 = require("../utils/constants");
/**
 * Decorador de clase para marcar una clase como módulo y agregar metadatos relacionados con la configuración del módulo.
 *
 * @decorator
 * @param {IModuleConfig} config Configuración del módulo que define propiedades y metadatos relacionados.
 * @returns {ClassDecorator} Una función de decorador de clase que añade los metadatos configurados a la clase.
 */
function Module(config) {
    /** Validar las claves del módulo en la configuración proporcionada.*/
    (0, validations_1.validateModuleKey)(config);
    return (target) => {
        /** Define los metadatos para la clase.*/
        Reflect.defineMetadata(constants_1.IS_MODULE, true, target);
        for (const property in config) {
            Reflect.defineMetadata(`module:${property}`, config[property], target);
        }
    };
}
exports.Module = Module;
