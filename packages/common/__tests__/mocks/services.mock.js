"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceMix = exports.ServiceWithInject = exports.ServiceWithService = exports.ServiceWithParameter = exports.ServiceOnly = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../index");
let ServiceOnly = class ServiceOnly {
    getHello() { return "Hello ServiceOnly"; }
};
exports.ServiceOnly = ServiceOnly;
exports.ServiceOnly = ServiceOnly = tslib_1.__decorate([
    (0, index_1.Injectable)()
], ServiceOnly);
let ServiceWithParameter = class ServiceWithParameter {
    userName;
    constructor(userName) {
        this.userName = userName;
    }
    getUserName() {
        return this.userName;
    }
};
exports.ServiceWithParameter = ServiceWithParameter;
exports.ServiceWithParameter = ServiceWithParameter = tslib_1.__decorate([
    (0, index_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [String])
], ServiceWithParameter);
let ServiceWithService = class ServiceWithService {
    serviceOnly;
    constructor(serviceOnly) {
        this.serviceOnly = serviceOnly;
    }
    getHello() {
        return this.serviceOnly.getHello();
    }
};
exports.ServiceWithService = ServiceWithService;
exports.ServiceWithService = ServiceWithService = tslib_1.__decorate([
    (0, index_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [ServiceOnly])
], ServiceWithService);
let ServiceWithInject = class ServiceWithInject {
    apiKey;
    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    getApiKey() {
        return this.apiKey;
    }
};
exports.ServiceWithInject = ServiceWithInject;
exports.ServiceWithInject = ServiceWithInject = tslib_1.__decorate([
    (0, index_1.Injectable)(),
    tslib_1.__param(0, (0, index_1.Inject)("API_KEY")),
    tslib_1.__metadata("design:paramtypes", [String])
], ServiceWithInject);
let ServiceMix = class ServiceMix {
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
exports.ServiceMix = ServiceMix;
exports.ServiceMix = ServiceMix = tslib_1.__decorate([
    (0, index_1.Injectable)(),
    tslib_1.__param(1, (0, index_1.Inject)("API_KEY")),
    tslib_1.__metadata("design:paramtypes", [ServiceOnly, String, String])
], ServiceMix);
