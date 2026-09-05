import 'reflect-metadata';
import {
  AwilixContainer,
  AwilixResolutionError,
  InjectionMode,
  createContainer,
} from 'awilix';
import { Module } from './injector/module';
import {
  ContainerResolutionEntityException,
  ContainerResolutionException,
} from './exceptions/resolution.exception';
import { CircularModuleImportException } from './exceptions/circularModuleImport.exception';
import { ILoggerService } from '@zanobijs/common';
import { Logger } from '@zanobijs/common/utils';
import { IFactoryOptions } from './interfaces';
import { TClass } from './interfaces/globals.interface';

/**
 * Resuelve `className` desde `container` traduciendo los errores de `awilix`
 * al vocabulario de excepciones de `ZanobiJS`. Compartido entre `Factory.get()`
 * y `RequestScope.get()` para no duplicar el manejo de `AwilixResolutionError`.
 * @throws {ContainerResolutionEntityException | ContainerResolutionException}
 * Si `awilix` no logra resolver la entidad o alguna de sus dependencias.
 * @throws Propaga sin modificar cualquier otro error (p. ej. uno lanzado por
 * el propio constructor de la clase que se está resolviendo).
 */
function resolveEntity<T>(
  container: AwilixContainer<any>,
  className: string,
  logger: ILoggerService,
): T {
  try {
    return container.resolve(className);
  } catch (error) {
    if (!(error instanceof AwilixResolutionError)) {
      throw error;
    }
    logger.info('Error resolving entity: ', error.message + '\n');
    const resolutionError = error.message.split('\n');
    const classNameFound = resolutionError[0].match(/'([^']+)'/);
    if (classNameFound?.[1] === className) {
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
 * Handle atado a un scope de `awilix` puntual (una copia liviana del
 * contenedor raíz, ver `Factory.createRequestScope`). Resuelve entidades
 * `singleton` desde el contenedor raíz (reusadas, gratis) y entidades
 * `request` desde este scope (instancia nueva, se descarta con él).
 */
export class RequestScope {
  constructor(
    private readonly container: AwilixContainer<any>,
    private readonly logger: ILoggerService,
  ) {}

  /**
   * Resuelve y devuelve una instancia del scope teniendo en cuenta el
   * nombre de la entidad proporcionada.
   * @param {string} className - Nombre de la entidad a resolver.
   * @returns {T} - Instancia resuelta.
   */
  get<T>(className: string): T {
    return resolveEntity<T>(this.container, className, this.logger);
  }
}

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
  private readonly scannedModules = new Set<TClass>();
  private readonly processedModules = new Set<TClass>();

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
   * @param {TClass[]} path - Cadena de módulos ancestros en la recursión actual,
   * usada para detectar ciclos de imports.
   * @private
   * @throws {CircularModuleImportException} Si `module` ya está en `path`.
   */
  private scanProviderModule(module: TClass, path: TClass[] = []): void {
    if (path.includes(module)) {
      throw new CircularModuleImportException(
        [...path, module].map((m) => m.name).join(' -> '),
      );
    }
    /** Un mismo módulo puede llegar por varias ramas del grafo de imports
     * (ej. un CommonModule importado por varios módulos de feature). No es
     * un error: ya fue escaneado, no hay nada más que hacer aquí. */
    if (this.scannedModules.has(module)) {
      return;
    }
    this.scannedModules.add(module);

    this.logger.debug('Factory - Scan Module:', module.name);
    this.moduleHandler.setup(module);
    this.moduleHandler.scan();
    this.logger.debug('===================================================');
    const importedModules = this.moduleHandler.getImports();
    if (importedModules && importedModules.length) {
      const nextPath = [...path, module];
      importedModules.forEach((moduleImport) => {
        this.scanProviderModule(moduleImport, nextPath);
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
   *
   * @remarks
   * No repite la detección de ciclos: `scanProviderModule` ya recorrió este
   * mismo grafo de imports antes (misma metadata, mismas aristas) y habría
   * lanzado `CircularModuleImportException` si existiera uno. Solo se
   * deduplica por módulo (`processedModules`) para el caso de diamante.
   */
  private processClassModule(module: TClass): void {
    if (this.processedModules.has(module)) {
      return;
    }
    this.processedModules.add(module);

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
    this.container = createContainer({
      injectionMode: InjectionMode.CLASSIC,
      strict: true,
    });
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
   * @throws {ContainerResolutionEntityException | ContainerResolutionException}
   * Si `awilix` no logra resolver la entidad o alguna de sus dependencias.
   * @throws Propaga sin modificar cualquier otro error (p. ej. uno lanzado por
   * el propio constructor de la clase que se está resolviendo).
   */
  get<T>(className: string): T {
    return resolveEntity<T>(this.container, className, this.logger);
  }

  /**
   * Crea una copia liviana del contenedor raíz para usar durante una
   * única invocación/petición (Lambda, Azure Function, request HTTP...).
   *
   * Las entidades `singleton` se reusan tal cual desde el contenedor raíz
   * (cero costo). Las entidades con `lifetime: 'request'` (ver `@Injectable`)
   * se resuelven de cero dentro de este scope y se descartan junto con él.
   *
   * @returns {RequestScope} - Handle atado a este scope puntual.
   */
  createRequestScope(): RequestScope {
    const scope = this.container.createScope();
    return new RequestScope(scope, this.logger);
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
