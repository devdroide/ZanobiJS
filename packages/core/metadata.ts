import { IModuleConfig } from "@zanobijs/common";
import {
  DEPENDENCIES_CLASS,
  DEPENDENCIES_INJECT,
  DEPENDENCIES_PARAMETERS,
  IS_CONTROLLER,
  IS_EXPORT,
  IS_IMPORTS,
  IS_MODULE,
  IS_SERVICE,
  MODULE_CONTROLLERS,
  MODULE_EXPORTS,
  MODULE_IMPORTS,
  MODULE_SERVICES,
} from "@zanobijs/common/utils/constants";
import { TClass } from "./interfaces";

/**
 * La clase `Metadata` proporciona métodos para acceder y manipular
 * metadatos relacionados con diversos componentes y módulos.
 */
export class Metadata {
  private static instance: Metadata;
  private readonly metadataMap: { [key: string]: string } = {
    [IS_MODULE]: "module",
    [IS_IMPORTS]: "import",
    [IS_CONTROLLER]: "controller",
    [IS_SERVICE]: "service",
    [IS_EXPORT]: "export",
  };
  private constructor() {}

  /**
   * Obtiene la instancia única (singleton) de `Metadata`.
   *
   * @returns La instancia única de `Metadata`.
   */
  static getInstance(): Metadata {
    if (!this.instance) {
      this.instance = new Metadata();
    }
    return this.instance;
  }

  /**
   * Obtiene los metadatos de un módulo específico.
   *
   * @param { IModuleConfig } module - El módulo del cual obtener los metadatos.
   * @returns Un objeto con los metadatos del módulo
   * {imports, controllers ,services, exports }.
   */
  getMetadataModule(module: TClass ): IModuleConfig {
    return {
      imports: Reflect.getMetadata(MODULE_IMPORTS, module),
      controllers: Reflect.getMetadata(MODULE_CONTROLLERS, module),
      services: Reflect.getMetadata(MODULE_SERVICES, module),
      exports: Reflect.getMetadata(MODULE_EXPORTS, module),
    };
  }

  /**
   * Obtiene todas las dependencias asociadas con una clase.
   *
   * @param { TClass } target - La función/clase objetivo.
   * @returns Un objeto con las dependencias del target.
   */
  getAllDependencies(target: TClass) {
    return {
      dClass: this.getClassDependencies(target),
      dParam: this.getParameterDependencies(target),
      dInject: this.getInjectionDependencies(target),
    };
  }

  /**
   * Obtiene las dependencias de clase asociadas con una clase.
   *
   * @param { TClass } target - La función/clase objetivo.
   * @returns Las dependencias de clase de la clase.
   */
  getClassDependencies(target: TClass) {
    return Reflect.getMetadata(DEPENDENCIES_CLASS, target);
  }

  /**
   * Obtiene las dependencias de parámetro asociadas con una clase.
   *
   * @param { TClass } target - La función/clase objetivo.
   * @returns Las dependencias de parámetro de la clase.
   */
  getParameterDependencies(target: TClass) {
    return Reflect.getMetadata(DEPENDENCIES_PARAMETERS, target);
  }

  /**
   * Obtiene las dependencias a inyectar asociadas con una clase.
   *
   * @param { TClass } target - La función/clase objetivo.
   * @returns Un Map con las dependencias a inyectar de la clase.
   */
  getInjectionDependencies(target: TClass): Map<string, string> {
    return Reflect.getMetadata(DEPENDENCIES_INJECT, target) || new Map();
  }

  /**
   * Determina el tipo de una clase basado en sus metadatos.
   *
   * @param { TClass } target - La función/clase objetivo.
   * @returns Una cadena de texto que indica el tipo del clase segun el mapa de metadata.
   * @throws {Error} Lanza un error si el tipo de la clase es desconocido.
   */
  determineType(target: TClass): string {
    for (const key in this.metadataMap) {
      if (this.hasMetadata(key, target)) {
        return this.metadataMap[key];
      }
    }
    throw new Error(`${target.name} type is unknown`);
  }

  /**
   * Verifica si una clase tiene un metadato específico.
   *
   * @param metadataKey - La llave del metadato a verificar.
   * @param { TClass } target - La función/clase objetivo.
   * @returns Verdadero si el target tiene el metadato, falso en caso contrario.
   */
  private hasMetadata(metadataKey: string, target: TClass): boolean {
    return !!Reflect.getMetadata(metadataKey, target);
  }
  /**
   * Verifica si una clase es de tipo "module".
   *
   * @param { TClass } target - La función/clase objetivo.
   * @returns Verdadero si el target es de tipo "module", falso en caso contrario.
   */
  isTypeModule(target: TClass): boolean {
    return this.hasMetadata(IS_MODULE, target);
  }

  /**
   * Verifica si una clase es de tipo "import".
   *
   * @param { TClass } target - La función/clase objetivo.
   * @returns Verdadero si el target es de tipo "import", falso en caso contrario.
   */
  isTypeImport(target: TClass): boolean {
    return this.hasMetadata(IS_IMPORTS, target);
  }

  /**
   * Verifica si una clase es de tipo "controller".
   *
   * @param { TClass } target - La función/clase objetivo.
   * @returns Verdadero si el target es de tipo "controller", falso en caso contrario.
   */
  isTypeController(target: TClass): boolean {
    return this.hasMetadata(IS_CONTROLLER, target);
  }

  /**
   * Verifica si una clase es de tipo "service".
   *
   * @param { TClass } target - La función/clase objetivo.
   * @returns Verdadero si el target es de tipo "service", falso en caso contrario.
   */
  isTypeService(target: TClass): boolean {
    return this.hasMetadata(IS_SERVICE, target);
  }

  /**
   * Verifica si una clase es de tipo "export".
   *
   * @param { TClass } target - La función/clase objetivo.
   * @returns Verdadero si el target es de tipo "export", falso en caso contrario.
   */
  isTypeExports(target: TClass): boolean {
    return this.hasMetadata(IS_EXPORT, target);
  }
}
