"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Injector = void 0;
const metadata_1 = require("../metadata");
const utils_1 = require("zanobijs-common/utils");
const shared_utils_1 = require("zanobijs-common/utils/shared.utils");
const awilix_1 = require("awilix");
/**
 * La clase `Injector` es la encargada de manejar la inyección de dependencias
 * solo para parametros tipo objecto { provider, useValue }
 */
class Injector {
    module;
    listProviders = new Map();
    metadata;
    logger;
    /**
     * En Constructor de la clase Injector obtenermos las instancias
     * de Metadata y Logger e inciamos el escaneo de proveedores.
     * @param {Module} module - El módulo debe tener el decorador `@Module`
     * para poderlo procesar.
     */
    constructor(module) {
        this.metadata = metadata_1.Metadata.getInstance();
        this.logger = (0, utils_1.Logger)();
        this.module = module;
        this.scanProviders();
    }
    /**
     * Este método privado recorre el array de los servicios del modulo para
     * buscar los proveedores tipo objeto a injectar y los almacena en una
     * lista de proveedores.
     * @private
     */
    scanProviders() {
        const { services } = this.metadata.getMetadataModule(this.module);
        services.forEach((service) => {
            if (typeof service === "object")
                this.listProviders.set(service.provider, service.useValue);
        });
        this.logger.debug("Injector - list provider", this.listProviders);
    }
    /**
     * Método para obtener un objeto con los parámetros y valores
     * que se inyectarán en la clase (target).
     *
     * @param {Class} target - La clase objetivo.
     * @returns {object} - Objeto con datos a inyectar.
     */
    getInjectData(target) {
        const injectData = {};
        const dInject = this.metadata.getInjectionDependencies(target);
        if (dInject.size > 0) {
            for (const key of dInject.keys()) {
                if (this.listProviders.has(key)) {
                    this.logger.info(`"${key}" is on providers list.`);
                    const paramName = dInject.get(key);
                    const useValue = this.listProviders.get(key);
                    injectData[paramName] = useValue;
                }
            }
        }
        return injectData;
    }
    /**
     * Método para obtener el injector apropiado para la clase objetivo.
     *
     * @param {any} target - La clase objetivo.
     * @returns - El injector configurado.
     */
    getInjector(target) {
        const injectData = this.getInjectData(target);
        let injector = (0, awilix_1.asClass)(target).scoped();
        if (!(0, shared_utils_1.isEmpty)(injectData)) {
            injector = injector.inject(() => injectData);
        }
        return {
            ...injector,
            interface: target,
        };
    }
}
exports.Injector = Injector;
