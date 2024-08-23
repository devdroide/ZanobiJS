"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Factory = void 0;
require("reflect-metadata");
const awilix_1 = require("awilix");
const module_1 = require("./injector/module");
const resolution_exception_1 = require("./exceptions/resolution.exception");
const utils_1 = require("@zanobijs/common/utils");
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
    logger;
    options;
    constructor(appModule, options = {}) {
        process.env.ZANOBIJS_LOGGER = "false";
        process.env.ZANOBIJS_LOGGER_USER = "false";
        this.options = options;
        this.evaluateOptions();
        this.logger = (0, utils_1.Logger)();
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
        this.logger.debug("Factory - Registering classes for module:", module.name);
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
        this.logger.debug("Factory - Setup:", module.name);
        this.moduleHandler.setup(module);
        this.logger.debug("Factory - Initialize:", module.name);
        this.moduleHandler.initialize();
        Object.assign(this.registeredClasses, this.moduleHandler.getRegisterClass());
        this.logger.success("Factory - Completion of module ", module.name);
        this.logger.debug("===================================================");
    }
    /**
     * Crea el contenedor de inyección de dependencias y registra las clases.
     * @returns {Factory} - Instancia actual de la fábrica.
     */
    create() {
        this.container = (0, awilix_1.createContainer)({ injectionMode: awilix_1.InjectionMode.CLASSIC });
        this.container.register(this.registeredClasses);
        this.logger.info("Factory - classes and providers registered in the container", Object.keys(this.registeredClasses));
        return this;
    }
    /**
     * Resuelve y devuelve una instancia del contenedor basado en la entidad proporcionada.
     * @param {string} entity - Nombre de la entidad a resolver.
     * @returns {any} - Instancia resuelta.
     */
    get(entity) {
        try {
            return this.container.resolve(entity);
        }
        catch (error) {
            this.logger.info("Error resolving entity: ", error.message + "\n");
            const resolutionError = error.message.split("\n");
            const EntityFound = resolutionError[0].match(/'([^']+)'/);
            if (EntityFound[1] === entity) {
                throw new resolution_exception_1.ContainerResolutionEntityException(entity, error.message);
            }
            throw new resolution_exception_1.ContainerResolutionException(entity, resolutionError[0], error.message);
        }
    }
    evaluateOptions() {
        if (this.options.activeLoggerSystem)
            process.env.ZANOBIJS_LOGGER = "true";
        if (this.options.activeLoggerUser)
            process.env.ZANOBIJS_LOGGER_USER = "true";
    }
}
exports.Factory = Factory;
