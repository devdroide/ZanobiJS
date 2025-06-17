import 'reflect-metadata';
import { AwilixContainer, InjectionMode, createContainer } from 'awilix';
import { Module } from './injector/module';
import {
  ContainerResolutionEntityException,
  ContainerResolutionException,
} from './exceptions/resolution.exception';
import { ILoggerService } from '@zanobijs/common';
import { Logger } from '@zanobijs/common/utils';
import { IFactoryOptions } from './interfaces';
import { TClass } from './interfaces/globals.interface';

/**
 * Factory es una clase que facilita la creación y configuración de
 * contenedores de inyección de dependencias utilizando metadatos y
 * la librería `awilix` para registrar y resolver entidades como:
 * controladores y servicios.
 */
export class Factory {
  private moduleHandler: Module;
  private registeredClasses = {};
  private container: AwilixContainer<any>;
  private logger: ILoggerService;
  private options: IFactoryOptions;

  constructor(appModule: TClass, options: IFactoryOptions = {}) {
    process.env.ZANOBIJS_LOGGER = 'false';
    process.env.ZANOBIJS_LOGGER_USER = 'false';
    this.options = options;
    this.evaluateOptions();
    this.logger = Logger();
    this.moduleHandler = new Module();
    this.scanProviderModule(appModule);
    this.registerProviderScanedModules();
    this.processClassModule(appModule);
  }
  /**
   * Se encarga de escaenear modulo por modulo los proveedores con el fin de luego
   * poder ser registrados e inyectados en quien depende de ese proveedor
   * @param {TClass} module - Módulo desde el que se escanearan los proveedores.
   * @private
   */
  private scanProviderModule(module: TClass): void {
    this.logger.debug('Factory - Scan Module:', module.name);
    this.moduleHandler.setup(module);
    this.moduleHandler.scan();
    this.logger.debug('===================================================');
    const importedModules = this.moduleHandler.getImports();
    if (importedModules && importedModules.length) {
      importedModules.forEach((moduleImport) => {
        this.scanProviderModule(moduleImport);
      });
    }
  }

  /**
   * Se encarga tomar la lista de proveedores y registralos para luego se resueltos
   * cuando el usuario lo solicite
   * @private
   */
  private registerProviderScanedModules() {
    this.moduleHandler.registerAllProviders();
  }

  /**
   * Procesa modulo por modulos registrando los controladores, servicios y proveedores,
   * estos se le irá inyectando sus dependecias resueltas para ser usados por el usuario
   * @param {TClass} module - Módulo desde el que se registrarán las clases.
   * @private
   */
  private processClassModule(module: TClass): void {
    this.logger.debug('Factory - Process Class Module:', module.name);
    this.moduleHandler.setup(module);
    this.moduleHandler.initialize();
    Object.assign(
      this.registeredClasses,
      this.moduleHandler.getRegisterClass(),
    );
    this.logger.success(
      'Factory - Process Class Module - Completion!!!',
      module.name,
    );
    const importedModules = this.moduleHandler.getImports();
    if (importedModules && importedModules.length) {
      importedModules.forEach((moduleImport) => {
        this.processClassModule(moduleImport);
      });
    }
    this.logger.debug('===================================================');
  }

  /**
   * Crea el contenedor de inyección de dependencias y registra el listado de
   * controladores, servicio y proveedores que se ha venido creando a parti de escaneos
   * y registros de clases.
   * @returns {Factory} - Instancia actual de la fábrica.
   */
  create(): Factory {
    this.container = createContainer({ injectionMode: InjectionMode.CLASSIC });
    this.container.register(this.registeredClasses);
    this.logger.info(
      'Factory - classes and providers registered in the container',
      Object.keys(this.registeredClasses),
    );
    return this;
  }

  /**
   * Resuelve y devuelve una instancia del contenedor
   * teniendo en cuenta el nombre de la entidad proporcionada.
   * @param {string} className - Nombre de la entidad a resolver.
   * @returns {T} - Instancia resuelta.
   */
  get<T>(className: string): T {
    try {
      return this.container.resolve(className);
    } catch (error) {
      this.logger.info('Error resolving entity: ', error.message + '\n');
      const resolutionError = error.message.split('\n');
      const classNameFound = resolutionError[0].match(/'([^']+)'/);
      if (classNameFound[1] === className) {
        throw new ContainerResolutionEntityException(className, error.message);
      }
      throw new ContainerResolutionException(
        className,
        resolutionError[0],
        error.message,
      );
    }
  }

  /**
   * Se encarga de evaluar las opciones para ver si o no aplica y realizar lo correspondiente
   */
  private evaluateOptions(): void {
    if (this.options.activeLoggerSystem) process.env.ZANOBIJS_LOGGER = 'true';
    if (this.options.activeLoggerUser)
      process.env.ZANOBIJS_LOGGER_USER = 'true';
  }
}
