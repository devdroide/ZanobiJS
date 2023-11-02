import "reflect-metadata";
import { aliasTo, asClass } from "awilix";
import { IModuleConfig, ILoggerService } from "zanobijs-common";
import { unCapitalize, isEmpty, isClass } from "zanobijs-common/utils/shared.utils";
import { Logger } from "zanobijs-common/utils";
import { Injector } from "./injector";
import { Metadata } from "../metadata";
import { InvalidModuleAnnotationException } from "../exceptions";

/**
 * Módulo para gestionar la configuración y el registro de controladores, servicios y dependencias.
 */
export class Module {
  private config: IModuleConfig;
  private module: any;
  private logger: ILoggerService;
  private injector: Injector;
  private registerClass = {};
  private dependenciesClass: any[] = [];
  private metadata: Metadata;
  private types: string[] = ["controller", "service"];

  /**
   * Constructor del módulo.
   */
  constructor() {
    this.logger = Logger();
    this.metadata = Metadata.getInstance();
  }

  /**
   * Configura el módulo con la información proporcionada.
   * @param {any} module - Módulo a configurar.
   */
  setup(module: any): void {
    if (this.metadata.isTypeModule(module)) {
      this.module = module;
      this.injector = new Injector(module);
    } else {
      throw new InvalidModuleAnnotationException();
    }
  }

  /**
   * Inicializa el módulo extrayendo metadatos y registrando las entidades.
   */
  initialize(): void {
    this.getMetadataModule();
    this.registerDependencies();
    this.registerDependenciesToAlias();
  }

  /**
   * Extrae los metadatos del módulo usando reflect-metadata.
   * @private
   */
  private getMetadataModule(): void {
    this.config = this.metadata.getMetadataModule(this.module);
  }

  /**
   * Registra las entidades de configuración en el módulo.
   * @private
   */
  private registerDependencies(): void {
    this.registerEntities("controllers");
    this.registerEntities("services");
  }

  /**
   * Registra entidades de configuración (controladores o servicios) del módulo.
   * @param {('controllers' | 'services')} entityType - Tipo de entidad a registrar.
   * @private
   */
  private registerEntities(entityType: "controllers" | "services"): void {
    const entities = this.config[entityType];

    if (entities && entities.length > 0) {
      const registeredEntities = entities
        .filter(
          (target) =>
            isClass(target) &&
            this.types.includes(this.metadata.determineType(target)),
        )
        .map((target) => {
          this.groupDependenciesForAlias(target);
          const targetName = unCapitalize(target.name);
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
  private groupDependenciesForAlias(target: Function): void {
    const dependencies: any[] = this.metadata.getClassDependencies(target);
    if (dependencies && !isEmpty(dependencies)) {
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
  private registerDependenciesToAlias(): void {
    this.dependenciesClass.forEach((dependency) => {
      if (!this.registerClass[dependency.nameParameter]) {
        this.registerClass[dependency.nameParameter] = aliasTo(
          dependency.nameClassContainer,
        );
      }
    });
  }

  /**
   * Devuelve las importaciones del módulo.
   * @returns {any[] | undefined} - Importaciones del módulo.
   */
  getImports(): any[] | undefined {
    return this.config.imports;
  }

  /**
   * Devuelve las clases registradas en el módulo.
   * @returns {any} - Clases registradas.
   */
  getRegisterClass(): any {
    this.logger.debug("Module - register class", this.registerClass);
    return this.registerClass;
  }
}
