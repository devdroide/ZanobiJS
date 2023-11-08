export declare class ServiceOnly {
    getHello(): string;
}
export declare class ServiceWithParameter {
    private userName;
    constructor(userName: string);
    getUserName(): string;
}
export declare class ServiceWithService {
    private serviceOnly;
    constructor(serviceOnly: ServiceOnly);
    getHello(): string;
}
export declare class ServiceWithInject {
    private apiKey;
    constructor(apiKey: string);
    getApiKey(): string;
}
export declare class ServiceMix {
    private serviceOnly;
    private apiKey;
    private userName;
    constructor(serviceOnly: ServiceOnly, apiKey: string, userName: string);
    getHello(): string;
    getApiKey(): string;
    getUserName(): string;
}
