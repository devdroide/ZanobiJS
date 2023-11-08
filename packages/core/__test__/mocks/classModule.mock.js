"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleTestAll = exports.ModuleTestWithImports = exports.ModuleTestWithInjector = exports.ModuleTest = exports.ModuleTestEmpty = void 0;
const tslib_1 = require("tslib");
const zanobijs_common_1 = require("zanobijs-common");
const classWithDependeciesClass_mock_1 = require("./classWithDependeciesClass.mock");
const classWithDependeciesInject_mock_1 = require("./classWithDependeciesInject.mock");
let ModuleTestEmpty = class ModuleTestEmpty {
};
exports.ModuleTestEmpty = ModuleTestEmpty;
exports.ModuleTestEmpty = ModuleTestEmpty = tslib_1.__decorate([
    (0, zanobijs_common_1.Module)({
        imports: [],
        controllers: [],
        services: [],
        exports: [],
    })
], ModuleTestEmpty);
let ModuleTest = class ModuleTest {
};
exports.ModuleTest = ModuleTest;
exports.ModuleTest = ModuleTest = tslib_1.__decorate([
    (0, zanobijs_common_1.Module)({
        imports: [],
        controllers: [classWithDependeciesClass_mock_1.ControllerWithDepenClass],
        services: [classWithDependeciesClass_mock_1.ServiceToController],
        exports: [],
    })
], ModuleTest);
let ModuleTestWithInjector = class ModuleTestWithInjector {
};
exports.ModuleTestWithInjector = ModuleTestWithInjector;
exports.ModuleTestWithInjector = ModuleTestWithInjector = tslib_1.__decorate([
    (0, zanobijs_common_1.Module)({
        imports: [],
        controllers: [classWithDependeciesInject_mock_1.ControllerWithDepen2],
        services: [
            classWithDependeciesInject_mock_1.ServiceToController2,
            {
                provider: "API_KEY",
                useValue: "isApiKey_qwerty12345"
            },
        ],
        exports: [],
    })
], ModuleTestWithInjector);
let ModuleTestWithImports = class ModuleTestWithImports {
};
exports.ModuleTestWithImports = ModuleTestWithImports;
exports.ModuleTestWithImports = ModuleTestWithImports = tslib_1.__decorate([
    (0, zanobijs_common_1.Module)({
        imports: [ModuleTestWithInjector],
        controllers: [],
        services: [],
        exports: [],
    })
], ModuleTestWithImports);
let ModuleTestAll = class ModuleTestAll {
};
exports.ModuleTestAll = ModuleTestAll;
exports.ModuleTestAll = ModuleTestAll = tslib_1.__decorate([
    (0, zanobijs_common_1.Module)({
        imports: [ModuleTestWithInjector],
        controllers: [classWithDependeciesInject_mock_1.ControllerWithDepen2],
        services: [
            classWithDependeciesInject_mock_1.ServiceToController2,
            {
                provider: "API_SECRET",
                useValue: "isApiSecret_cvbdfgert"
            },
        ],
        exports: [],
    })
], ModuleTestAll);
