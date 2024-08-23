import { ServiceOnly } from "./services.mock";
export declare class ControllerOnly {
}
export declare class ControllerWithoutArg {
    constructor();
}
export declare class ControllerWithMethod {
    getHello(): string;
}
export declare class ControllerWithParameter {
    private userName;
    constructor(userName: string);
    getUserName(): string;
}
export declare class ControllerWithService {
    private serviceOnly;
    constructor(serviceOnly: ServiceOnly);
    getHello(): string;
}
export declare class ControllerWithInject {
    private apiKey;
    constructor(apiKey: string);
    getApiKey(): string;
}
export declare class ControllerMix {
    private serviceOnly;
    private apiKey;
    private userName;
    private varTest;
    constructor(serviceOnly: ServiceOnly, apiKey: string, userName: string);
    getHello(): string;
    getApiKey(): string;
    getUserName(): string;
}
