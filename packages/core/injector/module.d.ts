import "reflect-metadata";
/**
 * Módulo para gestionar la configuración y el registro de controladores, servicios y dependencias.
 */
export declare class Module {
    private config;
    private module;
    private logger;
    private injector;
    private registerClass;
    private dependenciesClass;
    private metadata;
    private types;
    /**
     * Constructor del módulo.
     */
    constructor();
    /**
     * Configura el módulo con la información proporcionada.
     * @param {any} module - Módulo a configurar.
     */
    setup(module: any): void;
    /**
     * Inicializa el módulo extrayendo metadatos y registrando las entidades.
     */
    initialize(): void;
    /**
     * Extrae los metadatos del módulo usando reflect-metadata.
     * @private
     */
    private getMetadataModule;
    /**
     * Registra las entidades de configuración en el módulo.
     * @private
     */
    private registerDependencies;
    /**
     * Registra entidades de configuración (controladores o servicios) del módulo.
     * @param {('controllers' | 'services')} entityType - Tipo de entidad a registrar.
     * @private
     */
    private registerEntities;
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
    private groupDependenciesForAlias;
    /**
     * recorre las dependencias agrupadas y registra con un alias
     * aquellas que tienen nombres diferente a la que esta registrada.
     *
     * @private
     * @example
     * contructor(private serviceA: ServiceA) // parametro con nombre igual
     * contructor(private sA: ServiceA) // parametro con nombre diferente
     */
    private registerDependenciesToAlias;
    /**
     * Devuelve las importaciones del módulo.
     * @returns {any[] | undefined} - Importaciones del módulo.
     */
    getImports(): any[] | undefined;
    /**
     * Devuelve las clases registradas en el módulo.
     * @returns {any} - Clases registradas.
     */
    getRegisterClass(): any;
}
