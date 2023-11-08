"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = void 0;
require("reflect-metadata");
const awilix_1 = require("awilix");
const shared_utils_1 = require("zanobijs-common/utils/shared.utils");
const utils_1 = require("zanobijs-common/utils");
const injector_1 = require("./injector");
const metadata_1 = require("../metadata");
const exceptions_1 = require("../exceptions");
/**
 * Módulo para gestionar la configuración y el registro de controladores, servicios y dependencias.
 */
class Module {
    config;
    module;
    logger;
    injector;
    registerClass = {};
    dependenciesClass = [];
    metadata;
    types = ["controller", "service"];
    /**
     * Constructor del módulo.
     */
    constructor() {
        this.logger = (0, utils_1.Logger)();
        this.metadata = metadata_1.Metadata.getInstance();
    }
    /**
     * Configura el módulo con la información proporcionada.
     * @param {any} module - Módulo a configurar.
     */
    setup(module) {
        if (this.metadata.isTypeModule(module)) {
            this.module = module;
            this.injector = new injector_1.Injector(module);
        }
        else {
            throw new exceptions_1.InvalidModuleAnnotationException();
        }
    }
    /**
     * Inicializa el módulo extrayendo metadatos y registrando las entidades.
     */
    initialize() {
        this.getMetadataModule();
        this.registerDependencies();
        this.registerDependenciesToAlias();
    }
    /**
     * Extrae los metadatos del módulo usando reflect-metadata.
     * @private
     */
    getMetadataModule() {
        this.config = this.metadata.getMetadataModule(this.module);
    }
    /**
     * Registra las entidades de configuración en el módulo.
     * @private
     */
    registerDependencies() {
        this.registerEntities("controllers");
        this.registerEntities("services");
    }
    /**
     * Registra entidades de configuración (controladores o servicios) del módulo.
     * @param {('controllers' | 'services')} entityType - Tipo de entidad a registrar.
     * @private
     */
    registerEntities(entityType) {
        const entities = this.config[entityType];
        if (entities && entities.length > 0) {
            const registeredEntities = entities
                .filter((target) => (0, shared_utils_1.isClass)(target) &&
                this.types.includes(this.metadata.determineType(target)))
                .map((target) => {
                this.groupDependenciesForAlias(target);
                const targetName = (0, shared_utils_1.unCapitalize)(target.name);
                return { [targetName]: this.injector.getInjector(target) };
            });
            Object.assign(this.registerClass, ...registeredEntities);
        }
    }
    /**
     * Agrupación de dependencias para alias
     *
     * Este método agrupa las dependencias de la clase utilizando el método
     * `getClassDependencies` de la instancia `metadata`. Si la clase
     * tiene dependencias y estas no están vacías, las añade a la propiedad
     * `dependenciesClass` de la instancia actual para luego validar si existe
     * alguna dependencia con un nombre diferente y asiganar un alias.
     *
     * @private
     * @param {Function} target - La clase objetivo de la cual se quieren obtener las dependencias.
     */
    groupDependenciesForAlias(target) {
        const dependencies = this.metadata.getClassDependencies(target);
        if (dependencies && !(0, shared_utils_1.isEmpty)(dependencies)) {
            this.dependenciesClass = [...this.dependenciesClass, ...dependencies];
        }
    }
    /**
     * recorre las dependencias agrupadas y registra con un alias
     * aquellas que tienen nombres diferente a la que esta registrada.
     *
     * @private
     * @example
     * contructor(private serviceA: ServiceA) // parametro con nombre igual
     * contructor(private sA: ServiceA) // parametro con nombre diferente
     */
    registerDependenciesToAlias() {
        this.dependenciesClass.forEach((dependency) => {
            if (!this.registerClass[dependency.nameParameter]) {
                this.registerClass[dependency.nameParameter] = (0, awilix_1.aliasTo)(dependency.nameClassContainer);
            }
        });
    }
    /**
     * Devuelve las importaciones del módulo.
     * @returns {any[] | undefined} - Importaciones del módulo.
     */
    getImports() {
        return this.config.imports;
    }
    /**
     * Devuelve las clases registradas en el módulo.
     * @returns {any} - Clases registradas.
     */
    getRegisterClass() {
        this.logger.debug("Module - register class", this.registerClass);
        return this.registerClass;
    }
}
exports.Module = Module;
