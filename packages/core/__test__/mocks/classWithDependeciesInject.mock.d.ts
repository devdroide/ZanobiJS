export declare class ServiceToController2 {
    constructor();
    getHello(): string;
}
export declare class ServiceWithDepenParam {
    private servicio;
    private userName;
    private userAge;
    private userLogin;
    private userHobbis;
    constructor(servicio: ServiceToController2, userName: string, userAge: number, userLogin: boolean, userHobbis: string[]);
}
export declare class ControllerWithDepen2 {
    private sContro2;
    private apiKey;
    constructor(sContro2: ServiceToController2, apiKey: string);
    getApiKey(): string;
    getHelloService(): string;
}
export declare class ServiceWithDepen2 {
    private serviceWithDepenParam;
    private api_key;
    constructor(serviceWithDepenParam: ServiceWithDepenParam, api_key: string);
}
