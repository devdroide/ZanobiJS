import 'reflect-metadata';
import { ILoggerService } from '@zanobijs/common';
import { Logger } from '@zanobijs/common/utils';
import { AwilixAdapter } from './adapters/awilix.adapter';
import { Module } from './injector/module';
import { IContainerAdapter, IFactoryOptions, TClass } from './interfaces';

/**
 * Factory es una clase que facilita la creación y configuración del
 * contenedor de inyección de dependencias utilizando metadatos y
 * la librería `awilix`
 */
export class Factory {
  private moduleHandler: Module;
  private container: IContainerAdapter;
  private logger: ILoggerService;
  private options: IFactoryOptions;
  private allRegisteredClasses = {};

  constructor(appModule: TClass, options: IFactoryOptions = {}) {
    this.options = options;
    this.setupEnvironment();
    this.logger = Logger();
    this.moduleHandler = new Module();
    this.container = new AwilixAdapter();
    this.bootstrap(appModule);
  }

  /**
   * Se encarga de configurar las variables de entorno necesarias para el
   * del log de la aplicacion
   */
  private setupEnvironment(): void {
    process.env.ZANOBIJS_LOGGER = this.options.activeLoggerSystem
      ? 'true'
      : 'false';
    process.env.ZANOBIJS_LOGGER_USER = this.options.activeLoggerUser
      ? 'true'
      : 'false';
  }

  /**
   * Procesa los modulos registrandos los controladores, servicios y proveedores,
   * estos se le irá inyectando sus dependecias resueltas para ser usados por el usuario
   * @param {TClass} module - Módulo desde el que se registrarán las clases.
   * @private
   */
  private bootstrap(module: TClass): void {
    this.logger.debug('Factory - Bootstrapping Module:', module.name);

    // 1. Configurar y Escanear (Metadata + Providers)
    this.moduleHandler.setup(module);
    this.moduleHandler.scan();

    // 2. Inicializar (Dependencies + Alias)
    this.moduleHandler.initialize();

    // 3. Registrar Proveedores del modulo actual
    this.moduleHandler.registerAllProviders();

    // 4. Acumular clases candidatas
    Object.assign(
      this.allRegisteredClasses,
      this.moduleHandler.getRegisterClass(),
    );

    // 5. Recursión sobre importaciones
    const imports = this.moduleHandler.getImports();
    if (imports?.length) {
      imports.forEach((m) => this.bootstrap(m));
    }
  }

  /**
   * Registra el listado de controladores, servicio y proveedores
   * que se ha venido creando a parti de escaneos y registros de clases.
   * @returns {Factory} - Instancia actual de la fábrica.
   */
  create(): Factory {
    this.logger.info('Factory - Finalizing container registration...');
    this.container.register(this.allRegisteredClasses);
    return this;
  }

  /**
   * Resuelve y devuelve una instancia del contenedor
   * teniendo en cuenta el nombre de la entidad proporcionada.
   * @param {string} className - Nombre de la entidad a resolver.
   * @returns {T} - Instancia resuelta.
   */
  get<T>(className: string): T {
    return this.container.resolve<T>(className);
  }
}
