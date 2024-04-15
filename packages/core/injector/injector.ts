import { ILoggerService, IModuleConfig } from "@zanobijs/common";
import { Metadata } from "../metadata";
import { Logger } from "@zanobijs/common/utils";
import { isEmpty } from "@zanobijs/common/utils/shared.utils";
import { aliasTo, asClass, asFunction, asValue } from "awilix";
// import { ContainerInjectResolutionException } from "../exceptions/resolution.exception";

export type Constructor<T> = { new (...args: any[]): T };

/**
 * La clase `Injector` es la encargada de manejar la inyección de dependencias
 * solo para parametros tipo objecto { provider, useValue }
 */
export class Injector {
  private module: IModuleConfig;
  private listProviders: Map<string, any>;
  private metadata: Metadata;
  private logger: ILoggerService;
  private moduleName: string = "";

  /**
   * En Constructor de la clase Injector obtenermos las instancias
   * de Metadata y Logger e inciamos el escaneo de proveedores.
   * @param {Module} module - El módulo debe tener el decorador `@Module`
   * para poderlo procesar.
   */
  constructor(module: any, listProviders: Map<string, any>) {
    this.metadata = Metadata.getInstance();
    this.logger = Logger();
    this.moduleName = module.name;
    this.module = module;
    this.listProviders = listProviders;
    this.scanProviders();
  }

  /**
   * Este método privado recorre el array de los servicios del modulo para
   * buscar los proveedores tipo objeto a injectar y los almacena en una
   * lista de proveedores.
   * @private
   */
  private scanProviders() {
    this.logger.debug("Injector - Scan provider to module:", this.moduleName);
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
          const paramName = dInject.get(key);
          const useValue = this.listProviders.get(key);
          injectData[paramName] = useValue;
        } else {
          this.logger.important(
            `It is injecting @INJECT('${key}') provider in '${target.name}' but is not registered in '${this.moduleName}' or in previously loaded @modules`,
          );
          // throw new ContainerInjectResolutionException(key, target.name);
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
  getInjectorClass(target) {
    const injectData = this.getInjectData(target);
    let injector = asClass(target).scoped();
    if (!isEmpty(injectData)) {
      this.logger.debug(
        `Inject - list dependencies to inject of ${target.name}:`,
        injectData,
      );
      injector = injector.inject(this.funtionInjectData(injectData));
    }

    return {
      ...injector,
      interface: target,
    };
  }

  getAllProvider() {
    return this.listProviders;
  }

  getInjectProvider(provider) {
    return typeof provider.value === "function"
      ? asFunction(provider.value).scoped()
      : asValue(provider.value);
  }

  funtionInjectData(injectData) {
    return () => injectData;
  }
}
