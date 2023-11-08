"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerWithDepenClass = exports.ServiceToController = exports.Service = exports.ServiceToService = void 0;
const tslib_1 = require("tslib");
const zanobijs_common_1 = require("zanobijs-common");
let ServiceToService = class ServiceToService {
    constructor() { }
};
exports.ServiceToService = ServiceToService;
exports.ServiceToService = ServiceToService = tslib_1.__decorate([
    (0, zanobijs_common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], ServiceToService);
let Service = class Service {
    constructor() { }
};
exports.Service = Service;
exports.Service = Service = tslib_1.__decorate([
    (0, zanobijs_common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], Service);
let ServiceToController = class ServiceToController {
    constructor() { }
};
exports.ServiceToController = ServiceToController;
exports.ServiceToController = ServiceToController = tslib_1.__decorate([
    (0, zanobijs_common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], ServiceToController);
let ControllerWithDepenClass = class ControllerWithDepenClass {
    servicio;
    constructor(servicio) {
        this.servicio = servicio;
    }
};
exports.ControllerWithDepenClass = ControllerWithDepenClass;
exports.ControllerWithDepenClass = ControllerWithDepenClass = tslib_1.__decorate([
    (0, zanobijs_common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [ServiceToController])
], ControllerWithDepenClass);
