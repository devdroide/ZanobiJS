"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = void 0;
require("reflect-metadata");
const awilix_1 = require("awilix");
const shared_utils_1 = require("@zanobijs/common/utils/shared.utils");
const utils_1 = require("@zanobijs/common/utils");
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
    listProviders = new Map();
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
            this.logger.debug("Module - Create Injector to module:", module.name);
            this.injector = new injector_1.Injector(module, this.listProviders);
        }
        else {
            throw new exceptions_1.InvalidModuleAnnotationException();
        }
    }
    /**
     * Inicializa el módulo extrayendo metadatos y registrando las entidades.
     */
    initialize() {
        this.logger.debug("Module - Initialize:", this.module.name);
        this.registerAllProviders();
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
        this.logger.debug("Module - ..... searching for entities type ", entityType);
        if (entities && entities.length > 0) {
            const registeredEntities = entities
                .filter((target) => {
                return ((0, shared_utils_1.isClass)(target) &&
                    this.types.includes(this.metadata.determineType(target)));
            })
                .map((target) => {
                this.logger.debug(`Module - Entity <<< ${target.name} >>>`);
                this.groupDependenciesForAlias(target);
                const targetName = (0, shared_utils_1.unCapitalize)(target.name);
                return {
                    [target.name]: this.injector.getInjectorClass(target),
                    [targetName]: (0, awilix_1.aliasTo)(target.name),
                };
            });
            Object.assign(this.registerClass, ...registeredEntities);
        }
        else {
            this.logger.debug("Module - Does not have entities of that type", entityType);
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
        this.logger.debug(`Module - List dependecies of ${target.name}`, dependencies);
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
        this.logger.debug("Module - dependencies to register as candidates ", this.dependenciesClass);
        this.dependenciesClass.forEach((dependency) => {
            if (!this.registerClass[dependency.nameParameter]) {
                this.registerClass[dependency.nameParameter] = (0, awilix_1.aliasTo)(dependency.nameClassContainer);
            }
        });
    }
    registerAllProviders() {
        this.logger.debug("Module - Register list provider:", this.module.name);
        const listProviders = this.injector.getAllProvider();
        listProviders.forEach((value, key) => {
            const providerInject = this.injector.getInjectProvider({
                key,
                value,
            });
            this.registerClass[key] = providerInject;
            // this.registerClass[snakeToCamel(key)] = aliasTo(key);
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
        this.logger.debug("Module - List of candidate classes to register in container.", this.registerClass);
        return this.registerClass;
    }
}
exports.Module = Module;
