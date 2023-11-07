import { ILoggerService, IModuleConfig } from "zanobijs-common";
import { Metadata } from "../metadata";
import { Logger } from "zanobijs-common/utils";
import { isEmpty } from "zanobijs-common/utils/shared.utils";
import { asClass } from "awilix";

export type Constructor<T> = { new (...args: any[]): T }

/**
 * La clase `Injector` es la encargada de manejar la inyección de dependencias
 * solo para parametros tipo objecto { provider, useValue }
 */
export class Injector {
  private module: IModuleConfig;
  private listProviders = new Map();
  private metadata: Metadata;
  private logger: ILoggerService;

  /**
   * En Constructor de la clase Injector obtenermos las instancias
   * de Metadata y Logger e inciamos el escaneo de proveedores.
   * @param {Module} module - El módulo debe tener el decorador `@Module`
   * para poderlo procesar.
   */
  constructor(module: any) {
    this.metadata = Metadata.getInstance();
    this.logger = Logger();
    this.module = module;
    this.scanProviders();
  }

  /**
   * Este método privado recorre el array de los servicios del modulo para
   * buscar los proveedores tipo objeto a injectar y los almacena en una
   * lista de proveedores.
   * @private
   */
  private scanProviders() {
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
  getInjectData(target: Function): object {
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
    let injector = asClass(target).scoped();

    if (!isEmpty(injectData)) {
      injector = injector.inject(() => injectData);
    }

    return {
      ...injector,
      interface: target,
    };
  }
}
