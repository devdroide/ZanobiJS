import "reflect-metadata";
import { AwilixContainer, InjectionMode, createContainer } from "awilix";
import { Module } from "./injector/module";
import { unCapitalize } from "@zanobijs/common/utils/shared.utils";
import { ContainerResolutionEntityException, ContainerResolutionException } from "./exceptions/resolution.exception";
import { ILoggerService } from "@zanobijs/common";
import { Logger } from "@zanobijs/common/utils";
import { IFactoryOptions } from "./interfaces";

/**
 * Factory es una clase que facilita la creación y configuración de
 * contenedores de inyección de dependencias utilizando metadatos y
 * la librería `awilix` para registrar y resolver controladores y
 * servicios.
 */
export class Factory {
  private moduleHandler: Module;
  private registeredClasses = {};
  private container: AwilixContainer<any>;
  private logger: ILoggerService;
  private options: IFactoryOptions;

  constructor(appModule: any, options: IFactoryOptions  = {}) {
    process.env.ZANOBIJS_LOGGER = "false";
    process.env.ZANOBIJS_LOGGER_USER = "false";
    this.options = options;
    this.evaluateOptions();
    this.logger = Logger();
    this.moduleHandler = new Module();
    this.registerClassesFromModule(appModule);
  }

  /**
   * Este método registra clases desde el módulo proporcionado
   * y recorre sus importaciones de forma recursiva para registrar
   * las clases necesarias de importación.
   * @private
   */
  private registerClassesFromModule(module: any): void {
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
  private registerFromModule(module: any): void {
    this.logger.debug("Factory - Setup:", module.name);
    this.moduleHandler.setup(module);
    this.logger.debug("Factory - Initialize:", module.name);
    this.moduleHandler.initialize();
    Object.assign(
      this.registeredClasses,
      this.moduleHandler.getRegisterClass(),
    );
    this.logger.success("Factory - Completion of module ", module.name);
    this.logger.debug("===================================================");
  }

  /**
   * Crea el contenedor de inyección de dependencias y registra las clases.
   * @returns {Factory} - Instancia actual de la fábrica.
   */
  create(): Factory {
    this.container = createContainer({ injectionMode: InjectionMode.CLASSIC });
    this.container.register(this.registeredClasses);
    this.logger.info(
      "Factory - classes and providers registered in the container",
      Object.keys(this.registeredClasses),
    );
    return this;
  }

  /**
   * Resuelve y devuelve una instancia del contenedor basado en la entidad proporcionada.
   * @param {string} entity - Nombre de la entidad a resolver.
   * @returns {any} - Instancia resuelta.
   */
  get<T>(entity: string): T {
    try {
      return this.container.resolve(entity);
    } catch (error) {
      this.logger.info("Error resolving entity: ", error.message + "\n");
      const resolutionError = error.message.split("\n");
      const EntityFound = resolutionError[0].match(/'([^']+)'/);
      if (EntityFound[1] === entity) {
        throw new ContainerResolutionEntityException(entity, error.message);
      }
      throw new ContainerResolutionException(
        entity,
        resolutionError[0],
        error.message,
      );
    }
  }

  private evaluateOptions(){
    if (this.options.activeLoggerSystem) process.env.ZANOBIJS_LOGGER = "true";
    if (this.options.activeLoggerUser) process.env.ZANOBIJS_LOGGER_USER = "true";
  }
}
