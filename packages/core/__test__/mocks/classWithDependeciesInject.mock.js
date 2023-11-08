"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceWithDepen2 = exports.ControllerWithDepen2 = exports.ServiceWithDepenParam = exports.ServiceToController2 = void 0;
const tslib_1 = require("tslib");
const zanobijs_common_1 = require("zanobijs-common");
let ServiceToController2 = class ServiceToController2 {
    constructor() { }
    getHello() {
        return "Hello ServiceToController2";
    }
};
exports.ServiceToController2 = ServiceToController2;
exports.ServiceToController2 = ServiceToController2 = tslib_1.__decorate([
    (0, zanobijs_common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], ServiceToController2);
let ServiceWithDepenParam = class ServiceWithDepenParam {
    servicio;
    userName;
    userAge;
    userLogin;
    userHobbis;
    constructor(servicio, userName, userAge, userLogin, userHobbis) {
        this.servicio = servicio;
        this.userName = userName;
        this.userAge = userAge;
        this.userLogin = userLogin;
        this.userHobbis = userHobbis;
    }
};
exports.ServiceWithDepenParam = ServiceWithDepenParam;
exports.ServiceWithDepenParam = ServiceWithDepenParam = tslib_1.__decorate([
    (0, zanobijs_common_1.Injectable)(),
    tslib_1.__param(1, (0, zanobijs_common_1.Inject)("USER_NAME")),
    tslib_1.__param(2, (0, zanobijs_common_1.Inject)("USER_AGE")),
    tslib_1.__param(3, (0, zanobijs_common_1.Inject)("USER_LOGIN")),
    tslib_1.__param(4, (0, zanobijs_common_1.Inject)("USER_LIKE")),
    tslib_1.__metadata("design:paramtypes", [ServiceToController2, String, Number, Boolean, Array])
], ServiceWithDepenParam);
let ControllerWithDepen2 = class ControllerWithDepen2 {
    sContro2;
    apiKey;
    constructor(sContro2, apiKey) {
        this.sContro2 = sContro2;
        this.apiKey = apiKey;
        this.apiKey = apiKey;
    }
    getApiKey() {
        return this.apiKey;
    }
    getHelloService() {
        return this.sContro2.getHello();
    }
};
exports.ControllerWithDepen2 = ControllerWithDepen2;
exports.ControllerWithDepen2 = ControllerWithDepen2 = tslib_1.__decorate([
    (0, zanobijs_common_1.Controller)(),
    tslib_1.__param(1, (0, zanobijs_common_1.Inject)("API_KEY")),
    tslib_1.__metadata("design:paramtypes", [ServiceToController2, String])
], ControllerWithDepen2);
let ServiceWithDepen2 = class ServiceWithDepen2 {
    serviceWithDepenParam;
    api_key;
    constructor(serviceWithDepenParam, api_key) {
        this.serviceWithDepenParam = serviceWithDepenParam;
        this.api_key = api_key;
    }
};
exports.ServiceWithDepen2 = ServiceWithDepen2;
exports.ServiceWithDepen2 = ServiceWithDepen2 = tslib_1.__decorate([
    (0, zanobijs_common_1.Injectable)(),
    tslib_1.__param(1, (0, zanobijs_common_1.Inject)("API_KEY")),
    tslib_1.__metadata("design:paramtypes", [ServiceWithDepenParam, String])
], ServiceWithDepen2);
