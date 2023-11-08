"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerMix = exports.ControllerWithInject = exports.ControllerWithService = exports.ControllerWithParameter = exports.ControllerWithMethod = exports.ControllerWithoutArg = exports.ControllerOnly = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../index");
const services_mock_1 = require("./services.mock");
let ControllerOnly = class ControllerOnly {
};
exports.ControllerOnly = ControllerOnly;
exports.ControllerOnly = ControllerOnly = tslib_1.__decorate([
    (0, index_1.Controller)()
], ControllerOnly);
let ControllerWithoutArg = class ControllerWithoutArg {
    constructor() { }
};
exports.ControllerWithoutArg = ControllerWithoutArg;
exports.ControllerWithoutArg = ControllerWithoutArg = tslib_1.__decorate([
    (0, index_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [])
], ControllerWithoutArg);
let ControllerWithMethod = class ControllerWithMethod {
    getHello() { return "Hello ServiceOnly"; }
};
exports.ControllerWithMethod = ControllerWithMethod;
exports.ControllerWithMethod = ControllerWithMethod = tslib_1.__decorate([
    (0, index_1.Controller)()
], ControllerWithMethod);
let ControllerWithParameter = class ControllerWithParameter {
    userName;
    constructor(userName) {
        this.userName = userName;
    }
    getUserName() {
        return this.userName;
    }
};
exports.ControllerWithParameter = ControllerWithParameter;
exports.ControllerWithParameter = ControllerWithParameter = tslib_1.__decorate([
    (0, index_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [String])
], ControllerWithParameter);
let ControllerWithService = class ControllerWithService {
    serviceOnly;
    constructor(serviceOnly) {
        this.serviceOnly = serviceOnly;
    }
    getHello() {
        return this.serviceOnly.getHello();
    }
};
exports.ControllerWithService = ControllerWithService;
exports.ControllerWithService = ControllerWithService = tslib_1.__decorate([
    (0, index_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [services_mock_1.ServiceOnly])
], ControllerWithService);
let ControllerWithInject = class ControllerWithInject {
    apiKey;
    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    getApiKey() {
        return this.apiKey;
    }
};
exports.ControllerWithInject = ControllerWithInject;
exports.ControllerWithInject = ControllerWithInject = tslib_1.__decorate([
    (0, index_1.Controller)(),
    tslib_1.__param(0, (0, index_1.Inject)("API_KEY")),
    tslib_1.__metadata("design:paramtypes", [String])
], ControllerWithInject);
let ControllerMix = class ControllerMix {
    serviceOnly;
    apiKey;
    userName;
    constructor(serviceOnly, apiKey, userName) {
        this.serviceOnly = serviceOnly;
        this.apiKey = apiKey;
        this.userName = userName;
    }
    getHello() {
        return this.serviceOnly.getHello();
    }
    getApiKey() {
        return this.apiKey;
    }
    getUserName() {
        return this.userName;
    }
};
exports.ControllerMix = ControllerMix;
exports.ControllerMix = ControllerMix = tslib_1.__decorate([
    (0, index_1.Controller)(),
    tslib_1.__param(1, (0, index_1.Inject)("API_KEY")),
    tslib_1.__metadata("design:paramtypes", [services_mock_1.ServiceOnly, String, String])
], ControllerMix);
