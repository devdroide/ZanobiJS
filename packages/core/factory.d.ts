import "reflect-metadata";
import { IFactoryOptions } from "./interfaces";
/**
 * Factory es una clase que facilita la creación y configuración de
 * contenedores de inyección de dependencias utilizando metadatos y
 * la librería `awilix` para registrar y resolver controladores y
 * servicios.
 */
export declare class Factory {
    private moduleHandler;
    private registeredClasses;
    private container;
    private logger;
    private options;
    constructor(appModule: any, options?: IFactoryOptions);
    /**
     * Este método registra clases desde el módulo proporcionado
     * y recorre sus importaciones de forma recursiva para registrar
     * las clases necesarias de importación.
     * @private
     */
    private registerClassesFromModule;
    /**
     * Registra clases desde un módulo específico.
     * @param {any} module - Módulo desde el que se registrarán las clases.
     * @private
     */
    private registerFromModule;
    /**
     * Crea el contenedor de inyección de dependencias y registra las clases.
     * @returns {Factory} - Instancia actual de la fábrica.
     */
    create(): Factory;
    /**
     * Resuelve y devuelve una instancia del contenedor basado en la entidad proporcionada.
     * @param {string} entity - Nombre de la entidad a resolver.
     * @returns {any} - Instancia resuelta.
     */
    get<T>(entity: string): T;
    private evaluateOptions;
}
