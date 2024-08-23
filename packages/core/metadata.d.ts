import { IModuleConfig } from "@zanobijs/common";
/**
 * La clase `Metadata` proporciona métodos para acceder y manipular
 * metadatos relacionados con diversos componentes y módulos.
 */
export declare class Metadata {
    private static instance;
    private readonly metadataMap;
    private constructor();
    /**
     * Obtiene la instancia única (singleton) de `Metadata`.
     *
     * @returns La instancia única de `Metadata`.
     */
    static getInstance(): Metadata;
    /**
     * Obtiene los metadatos de un módulo específico.
     *
     * @param module - El módulo del cual obtener los metadatos.
     * @returns Un objeto con los metadatos del módulo {imports, controllers ,services, exports }.
     */
    getMetadataModule(module: any): IModuleConfig;
    /**
     * Obtiene todas las dependencias asociadas con una clase.
     *
     * @param target - La función/clase objetivo.
     * @returns Un objeto con las dependencias del target.
     */
    getAllDependencies(target: Function): {
        dClass: any;
        dParam: any;
        dInject: Map<string, string>;
    };
    /**
     * Obtiene las dependencias de clase asociadas con una clase.
     *
     * @param target - La función/clase objetivo.
     * @returns Las dependencias de clase de la clase.
     */
    getClassDependencies(target: Function): any;
    /**
     * Obtiene las dependencias de parámetro asociadas con una clase.
     *
     * @param target - La función/clase objetivo.
     * @returns Las dependencias de parámetro de la clase.
     */
    getParameterDependencies(target: Function): any;
    /**
     * Obtiene las dependencias a inyectar asociadas con una clase.
     *
     * @param target - La función/clase objetivo.
     * @returns Un Map con las dependencias a inyectar de la clase.
     */
    getInjectionDependencies(target: Function): Map<string, string>;
    /**
     * Determina el tipo de una clase basado en sus metadatos.
     *
     * @param target - La función/clase objetivo.
     * @returns Una cadena de texto que indica el tipo del clase segun el mapa de metadata.
     * @throws {Error} Lanza un error si el tipo de la clase es desconocido.
     */
    determineType(target: Function): string;
    /**
     * Verifica si una clase tiene un metadato específico.
     *
     * @param metadataKey - La llave del metadato a verificar.
     * @param target - La función/clase objetivo.
     * @returns Verdadero si el target tiene el metadato, falso en caso contrario.
     */
    private hasMetadata;
    /**
     * Verifica si una clase es de tipo "module".
     *
     * @param target - La función/clase objetivo.
     * @returns Verdadero si el target es de tipo "module", falso en caso contrario.
     */
    isTypeModule(target: Function): boolean;
    /**
     * Verifica si una clase es de tipo "import".
     *
     * @param target - La función/clase objetivo.
     * @returns Verdadero si el target es de tipo "import", falso en caso contrario.
     */
    isTypeImport(target: Function): boolean;
    /**
     * Verifica si una clase es de tipo "controller".
     *
     * @param target - La función/clase objetivo.
     * @returns Verdadero si el target es de tipo "controller", falso en caso contrario.
     */
    isTypeController(target: Function): boolean;
    /**
     * Verifica si una clase es de tipo "service".
     *
     * @param target - La función/clase objetivo.
     * @returns Verdadero si el target es de tipo "service", falso en caso contrario.
     */
    isTypeService(target: Function): boolean;
    /**
     * Verifica si una clase es de tipo "export".
     *
     * @param target - La función/clase objetivo.
     * @returns Verdadero si el target es de tipo "export", falso en caso contrario.
     */
    isTypeExports(target: Function): boolean;
}
