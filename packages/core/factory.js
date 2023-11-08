"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Factory = void 0;
require("reflect-metadata");
const awilix_1 = require("awilix");
const module_1 = require("./injector/module");
/**
 * Factory es una clase que facilita la creación y configuración de
 * contenedores de inyección de dependencias utilizando metadatos y
 * la librería `awilix` para registrar y resolver controladores y
 * servicios.
 */
class Factory {
    moduleHandler;
    registeredClasses = {};
    container;
    constructor(appModule) {
        this.moduleHandler = new module_1.Module();
        this.registerClassesFromModule(appModule);
    }
    /**
     * Este método registra clases desde el módulo proporcionado
     * y recorre sus importaciones de forma recursiva para registrar
     * las clases necesarias de importación.
     * @private
     */
    registerClassesFromModule(module) {
        this.registerFromModule(module);
        const importedModules = this.moduleHandler.getImports();
        if (importedModules && importedModules.length) {
            importedModules.forEach((moduleImport) => {
                this.registerClassesFromModule(moduleImport);
            });
        }
    }
    /**
     * Registra clases desde un módulo específico.
     * @param {any} module - Módulo desde el que se registrarán las clases.
     * @private
     */
    registerFromModule(module) {
        this.moduleHandler.setup(module);
        this.moduleHandler.initialize();
        Object.assign(this.registeredClasses, this.moduleHandler.getRegisterClass());
    }
    /**
     * Crea el contenedor de inyección de dependencias y registra las clases.
     * @returns {Factory} - Instancia actual de la fábrica.
     */
    create() {
        this.container = (0, awilix_1.createContainer)({ injectionMode: awilix_1.InjectionMode.CLASSIC });
        this.container.register(this.registeredClasses);
        return this;
    }
    /**
     * Resuelve y devuelve una instancia del contenedor basado en la entidad proporcionada.
     * @param {string} entity - Nombre de la entidad a resolver.
     * @returns {any} - Instancia resuelta.
     */
    get(entity) {
        return this.container.resolve(entity);
    }
}
exports.Factory = Factory;
