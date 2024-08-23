export type Constructor<T> = {
    new (...args: any[]): T;
};
/**
 * La clase `Injector` es la encargada de manejar la inyección de dependencias
 * solo para parametros tipo objecto { provider, useValue }
 */
export declare class Injector {
    private module;
    private listProviders;
    private metadata;
    private logger;
    private moduleName;
    /**
     * En Constructor de la clase Injector obtenermos las instancias
     * de Metadata y Logger e inciamos el escaneo de proveedores.
     * @param {Module} module - El módulo debe tener el decorador `@Module`
     * para poderlo procesar.
     */
    constructor(module: any, listProviders: Map<string, any>);
    /**
     * Este método privado recorre el array de los servicios del modulo para
     * buscar los proveedores tipo objeto a injectar y los almacena en una
     * lista de proveedores.
     * @private
     */
    private scanProviders;
    /**
     * Método para obtener un objeto con los parámetros y valores
     * que se inyectarán en la clase (target).
     *
     * @param {Class} target - La clase objetivo.
     * @returns {object} - Objeto con datos a inyectar.
     */
    getInjectData(target: Function): object;
    /**
     * Método para obtener el injector apropiado para la clase objetivo.
     *
     * @param {any} target - La clase objetivo.
     * @returns - El injector configurado.
     */
    getInjectorClass(target: any): {
        interface: any;
        injectionMode?: import("awilix").InjectionModeType;
        injector?: import("awilix").InjectorFunction;
        setLifetime(lifetime: import("awilix").LifetimeType): import("awilix").BuildResolver<object> & import("awilix").DisposableResolver<object>;
        setInjectionMode(mode: import("awilix").InjectionModeType): import("awilix").BuildResolver<object> & import("awilix").DisposableResolver<object>;
        singleton(): import("awilix").BuildResolver<object> & import("awilix").DisposableResolver<object>;
        scoped(): import("awilix").BuildResolver<object> & import("awilix").DisposableResolver<object>;
        transient(): import("awilix").BuildResolver<object> & import("awilix").DisposableResolver<object>;
        proxy(): import("awilix").BuildResolver<object> & import("awilix").DisposableResolver<object>;
        classic(): import("awilix").BuildResolver<object> & import("awilix").DisposableResolver<object>;
        inject(injector: import("awilix").InjectorFunction): import("awilix").BuildResolver<object> & import("awilix").DisposableResolver<object>;
        resolve<U extends object>(container: import("awilix").AwilixContainer<U>): object;
        name?: string;
        lifetime?: import("awilix").LifetimeType;
        register?: (...args: any[]) => import("awilix").Resolver<object>;
        isLeakSafe?: boolean;
        dispose?: import("awilix").Disposer<object>;
        disposer(dispose: import("awilix").Disposer<object>): import("awilix").BuildResolver<object> & import("awilix").DisposableResolver<object>;
    };
    getAllProvider(): Map<string, any>;
    getInjectProvider(provider: any): import("awilix").Resolver<any>;
    funtionInjectData(injectData: any): () => any;
}
