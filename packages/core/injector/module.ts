import 'reflect-metadata';
import { aliasTo } from 'awilix';
import { IModuleConfig, ILoggerService } from '@zanobijs/common';
import {
  unCapitalize,
  isEmpty,
  isClass,
} from '@zanobijs/common/utils/shared.utils';
import { Logger } from '@zanobijs/common/utils';
import { Injector } from './injector';
import { Metadata } from '../metadata';
import { InvalidModuleAnnotationException } from '../exceptions';
import { TClass } from '../interfaces';
import { InvalidProviderModuleException } from '../exceptions/invalidProvider.module.exception';

/**
 * Módulo para gestionar la configuración y el registro de
 * controladores, servicios, proveedores y dependencias.
 */
export class Module {
  private config: IModuleConfig;
  private module: any;
  private logger: ILoggerService;
  private injector: Injector;
  private registerClass: any = {};
  private dependenciesClass: any[] = [];
  private metadata: Metadata;
  private types: string[] = ['controller', 'service'];
  private readonly listProviders: Map<string, any> = new Map();
  private readonly listProvidersClass: Map<string, any> = new Map();

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
      this.logger.debug(
        'Module - Setup - Create Injector to module:',
        module.name,
      );
      this.injector = new Injector(
        this.module,
        this.listProviders,
        this.listProvidersClass,
      );
    } else {
      throw new InvalidModuleAnnotationException();
    }
  }

  /** Metodo de exposicion para escarnear proveedores y obtener
   * la metadata del modulo que esta confirgurado(Setup) en ese momento
   * @public
   */
  scan() {
    this.injector.scanProviders();
    this.getMetadataModule();
  }

  /**
   * Este metodo incializa una serie de pasos dentro de los cuales son:
   * obtener la metada del modulo configurado actualmente, busca y registra
   * las dependencias de las entidades (controladores y servicios), registra
   * las dependencias de los proveedores que son tipo entidad (clase abst a clase)
   * y registra las dependecias con alias cuando sus nombres no son iguales
   * @public
   */
  initialize(): void {
    this.logger.debug('Module - Initialize:', this.module.name);
    this.getMetadataModule();
    this.registerDependenciesFromEntity();
    this.registerEntitiesFromProvider();
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
  private registerDependenciesFromEntity(): void {
    this.registerEntities('controllers');
    this.registerEntities('services');
  }

  /**
   * se encarga de filtrar los metadatos del modulo buscando si es controlador o servicio
   * para luego buscar en los metadatos el nombre de la dependecia y de quien depende
   * para se agrupado y agregarlos a la lista de clases a registrar en el contenedor.
   * @param {('controllers' | 'services')} entityType - Tipo de entidad a registrar.
   * @private
   */
  private registerEntities(entityType: 'controllers' | 'services'): void {
    const entities = this.config[entityType];
    this.logger.debug('Module - searching for entities type:', entityType);

    if (entities && entities.length > 0) {
      const registeredEntities = entities
        .filter((target) => {
          return (
            isClass(target) &&
            this.types.includes(this.metadata.determineType(target))
          );
        })
        .map((target) => {
          this.logger.debug('Module - Entity', `<<< ${target.name} >>>`);
          this.groupDependenciesForAlias(target);
          const targetName = unCapitalize(target.name);
          return {
            [target.name]: this.injector.getInjectorClass(target),
            [targetName]: aliasTo(target.name),
          };
        });
      Object.assign(this.registerClass, ...registeredEntities);
    } else {
      this.logger.debug(
        'Module - Does not have entities of that type',
        entityType,
      );
    }
  }

  /**
   * Se encarga de recorrer la lista de proveedores que son tipo clase para
   * luego buscar en los metadatos el nombre de la dependecia y de quien depende
   * para se agrupado y agregarlos a la lista de clases a registrar en el contenedor.
   * toma el proveedor que es nombre la clase o un token (nombre de pendencia)
   * que va ser sustituida por la clase de useClass
   * @private
   */
  private registerEntitiesFromProvider(): void {
    this.logger.debug('Module - searching for entities from provider');
    for (const [key, value] of this.listProvidersClass) {
      try {
        this.logger.debug('Module - Entity provider', `<<< ${key} >>>`);
        const type = this.metadata.determineType(value);
        if (!this.types.includes(type)) {
          throw new Error(
            'The type used in the provider useClass property is not valid',
          );
        }
        this.groupDependenciesForAlias(value);
        const targetName = unCapitalize(value.name);
        const targetProviderName = unCapitalize(key);
        const registerProviderWithEntities: any = {
          [value.name]: this.injector.getInjectorClass(value),
          [targetName]: aliasTo(value.name),
          [key]: aliasTo(value.name),
          [targetProviderName]: aliasTo(value.name),
        };
        Object.assign(this.registerClass, registerProviderWithEntities);
      } catch (error) {
        throw new InvalidProviderModuleException(
          value.name,
          this.module.name,
          error.message,
        );
      }
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
  private groupDependenciesForAlias(target: TClass): void {
    const dependencies: any[] = this.metadata.getClassDependencies(target);
    this.logger.debug(
      `Module - List dependecies to group by ${target.name}`,
      dependencies,
    );
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
    this.logger.debug(
      'Module - dependencies to register as candidates ',
      this.dependenciesClass,
    );
    this.dependenciesClass.forEach((dependency) => {
      if (!this.registerClass[dependency.nameParameter]) {
        this.registerClass[dependency.nameParameter] = aliasTo(
          dependency.nameClassContainer,
        );
      }
    });
  }

  /**
   * Toma el listado proveedores y los une al listado de clases que van
   * a registrar en el contenedor (asValue y asFunction) para ser resueltos
   */
  registerAllProviders(): void {
    this.logger.debug('Module - Register list provider:', this.module.name);
    const listProviders = this.injector.getAllProvider();
    listProviders.forEach((value, key) => {
      this.registerClass[key] = value;
    });
  }

  /**
   * Devuelve las importaciones del módulo.
   * @returns {TClass[] | undefined} - Importaciones del módulo.
   */
  getImports(): TClass[] | undefined {
    return this.config.imports;
  }

  /**
   * Devuelve las clases registradas en el módulo.
   * @returns {any} - Clases registradas.
   */
  getRegisterClass(): any {
    this.logger.debug(
      `Module ${this.module.name} - List of candidate classes to register in container.`,
      this.registerClass,
    );
    return this.registerClass;
  }
}
