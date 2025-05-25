import { ILoggerService } from '@zanobijs/common';
import { Metadata } from '../metadata';
import { Logger } from '@zanobijs/common/utils';
import { isEmpty } from '@zanobijs/common/utils/shared.utils';
import { asClass, asFunction, asValue } from 'awilix';
import { TClass } from '../interfaces';

export type Constructor<T> = { new (...args: any[]): T };

/**
 * La clase `Injector` es la encargada de manejar la inyección de dependencias
 * solo para parametros tipo objecto { provider, useValue }
 */
export class Injector {
  private module: TClass;
  private listProviders: Map<string, any>;
  private metadata: Metadata;
  private logger: ILoggerService;
  private moduleName: string = '';

  /**
   * En Constructor de la clase Injector obtenermos las instancias
   * de Metadata y Logger e inciamos el escaneo de proveedores.
   * @param {Module} module - El módulo debe tener el decorador `@Module`
   * para poderlo procesar.
   */
  constructor(module: TClass, listProviders: Map<string, any>) {
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
    this.logger.debug('Injector - Scan provider to module:', this.moduleName);
    const { services } = this.metadata.getMetadataModule(this.module);

    services.forEach((service) => {
      if (typeof service === 'object' && typeof service.provider === 'string') {
        const key = service.provider;
        let value: any;
        if (service.useValue) {
          value = asValue(service.useValue);
        } else if (service.useFactory) {
          value = asFunction(service.useFactory).scoped();
        }

        this.listProviders.set(key, value);
      }
    });

    this.logger.debug('Injector - list provider', this.listProviders);
  }

  /**
   * Método para obtener un objeto con los parámetros(key) y valores(useValue, useClass, useFactory)
   * que se inyectarán en la clase (target).
   *
   * @param { TClass} target - La clase objetivo.
   * @returns {object} - Objeto con datos a inyectar.
   */
  getInjectData(target: TClass): object {
    const injectData = {};
    const dInject = this.metadata.getInjectionDependencies(target);
    if (dInject.size > 0) {
      for (const key of dInject.keys()) {
        if (this.listProviders.has(key)) {
          const paramName = dInject.get(key);
          const provider = this.listProviders.get(key);
          injectData[paramName] = provider;
        } else {
          this.logger.important(
            `You are trying to inject @INJECT('${key}') into '${target.name}'`,
            `but the provider '${key}' and its value are not registered in '${this.moduleName}' or any other previously loaded modules`,
          );
        }
      }
    }
    return injectData;
  }

  /**
   * Método para obtener el injector apropiado para la clase objetivo
   * e inyectar los parametros del constructor encontrados en getInjectData
   *
   * Al hacer asClass().inject() evita que los busque en el contenedor ya que
   * se registran de forma local en la clase objetivo
   *
   * @param {any} target - La clase objetivo.
   * @returns - El injector configurado.
   */
  getInjectorClass(target: TClass) {
    const injectData = this.getInjectData(target);
    let injector = asClass(target).scoped();
    if (!isEmpty(injectData)) {
      this.logger.debug(
        `Inject - list dependencies to inject of ${target.name}:`,
        injectData,
      );
      injector = injector.inject(() => injectData);
    }

    return {
      ...injector,
      interface: target,
    };
  }

  getAllProvider() {
    return this.listProviders;
  }
}
