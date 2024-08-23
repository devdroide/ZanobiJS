"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleWithController = exports.ModuleEmpty = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../index");
const controllers_mock_1 = require("./controllers.mock");
let ModuleEmpty = class ModuleEmpty {
};
exports.ModuleEmpty = ModuleEmpty;
exports.ModuleEmpty = ModuleEmpty = tslib_1.__decorate([
    (0, index_1.Module)({
        imports: [],
        controllers: [],
        services: [],
        exports: [],
    })
], ModuleEmpty);
let ModuleWithController = class ModuleWithController {
};
exports.ModuleWithController = ModuleWithController;
exports.ModuleWithController = ModuleWithController = tslib_1.__decorate([
    (0, index_1.Module)({
        imports: [],
        controllers: [controllers_mock_1.ControllerOnly],
        services: [],
        exports: [],
    })
], ModuleWithController);
