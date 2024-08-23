"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metadata = void 0;
const constants_1 = require("@zanobijs/common/utils/constants");
/**
 * La clase `Metadata` proporciona métodos para acceder y manipular
 * metadatos relacionados con diversos componentes y módulos.
 */
class Metadata {
    static instance;
    metadataMap = {
        [constants_1.IS_MODULE]: "module",
        [constants_1.IS_IMPORTS]: "import",
        [constants_1.IS_CONTROLLER]: "controller",
        [constants_1.IS_SERVICE]: "service",
        [constants_1.IS_EXPORT]: "export",
    };
    constructor() { }
    /**
     * Obtiene la instancia única (singleton) de `Metadata`.
     *
     * @returns La instancia única de `Metadata`.
     */
    static getInstance() {
        if (!this.instance) {
            this.instance = new Metadata();
        }
        return this.instance;
    }
    /**
     * Obtiene los metadatos de un módulo específico.
     *
     * @param module - El módulo del cual obtener los metadatos.
     * @returns Un objeto con los metadatos del módulo {imports, controllers ,services, exports }.
     */
    getMetadataModule(module) {
        return {
            imports: Reflect.getMetadata(constants_1.MODULE_IMPORTS, module),
            controllers: Reflect.getMetadata(constants_1.MODULE_CONTROLLERS, module),
            services: Reflect.getMetadata(constants_1.MODULE_SERVICES, module),
            exports: Reflect.getMetadata(constants_1.MODULE_EXPORTS, module),
        };
    }
    /**
     * Obtiene todas las dependencias asociadas con una clase.
     *
     * @param target - La función/clase objetivo.
     * @returns Un objeto con las dependencias del target.
     */
    getAllDependencies(target) {
        return {
            dClass: this.getClassDependencies(target),
            dParam: this.getParameterDependencies(target),
            dInject: this.getInjectionDependencies(target),
        };
    }
    /**
     * Obtiene las dependencias de clase asociadas con una clase.
     *
     * @param target - La función/clase objetivo.
     * @returns Las dependencias de clase de la clase.
     */
    getClassDependencies(target) {
        return Reflect.getMetadata(constants_1.DEPENDENCIES_CLASS, target);
    }
    /**
     * Obtiene las dependencias de parámetro asociadas con una clase.
     *
     * @param target - La función/clase objetivo.
     * @returns Las dependencias de parámetro de la clase.
     */
    getParameterDependencies(target) {
        return Reflect.getMetadata(constants_1.DEPENDENCIES_PARAMETERS, target);
    }
    /**
     * Obtiene las dependencias a inyectar asociadas con una clase.
     *
     * @param target - La función/clase objetivo.
     * @returns Un Map con las dependencias a inyectar de la clase.
     */
    getInjectionDependencies(target) {
        return Reflect.getMetadata(constants_1.DEPENDENCIES_INJECT, target) || new Map();
    }
    /**
     * Determina el tipo de una clase basado en sus metadatos.
     *
     * @param target - La función/clase objetivo.
     * @returns Una cadena de texto que indica el tipo del clase segun el mapa de metadata.
     * @throws {Error} Lanza un error si el tipo de la clase es desconocido.
     */
    determineType(target) {
        for (const key in this.metadataMap) {
            if (this.hasMetadata(key, target)) {
                return this.metadataMap[key];
            }
        }
        throw new Error(`${target.name} type is unknown`);
    }
    /**
     * Verifica si una clase tiene un metadato específico.
     *
     * @param metadataKey - La llave del metadato a verificar.
     * @param target - La función/clase objetivo.
     * @returns Verdadero si el target tiene el metadato, falso en caso contrario.
     */
    hasMetadata(metadataKey, target) {
        return !!Reflect.getMetadata(metadataKey, target);
    }
    /**
     * Verifica si una clase es de tipo "module".
     *
     * @param target - La función/clase objetivo.
     * @returns Verdadero si el target es de tipo "module", falso en caso contrario.
     */
    isTypeModule(target) {
        return this.hasMetadata(constants_1.IS_MODULE, target);
    }
    /**
     * Verifica si una clase es de tipo "import".
     *
     * @param target - La función/clase objetivo.
     * @returns Verdadero si el target es de tipo "import", falso en caso contrario.
     */
    isTypeImport(target) {
        return this.hasMetadata(constants_1.IS_IMPORTS, target);
    }
    /**
     * Verifica si una clase es de tipo "controller".
     *
     * @param target - La función/clase objetivo.
     * @returns Verdadero si el target es de tipo "controller", falso en caso contrario.
     */
    isTypeController(target) {
        return this.hasMetadata(constants_1.IS_CONTROLLER, target);
    }
    /**
     * Verifica si una clase es de tipo "service".
     *
     * @param target - La función/clase objetivo.
     * @returns Verdadero si el target es de tipo "service", falso en caso contrario.
     */
    isTypeService(target) {
        return this.hasMetadata(constants_1.IS_SERVICE, target);
    }
    /**
     * Verifica si una clase es de tipo "export".
     *
     * @param target - La función/clase objetivo.
     * @returns Verdadero si el target es de tipo "export", falso en caso contrario.
     */
    isTypeExports(target) {
        return this.hasMetadata(constants_1.IS_EXPORT, target);
    }
}
exports.Metadata = Metadata;
