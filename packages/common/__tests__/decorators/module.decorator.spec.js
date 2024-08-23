"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chai_1 = require("chai");
const decorators_1 = require("../../decorators");
const constants_1 = require("../../utils/constants");
const modules_mock_1 = require("../mocks/modules.mock");
const exceptions_1 = require("../../exceptions");
describe("Commons - Decorators - module", () => {
    it("should respond controller type [string] invalid in module", () => {
        try {
            let ModuleInvalidController = class ModuleInvalidController {
            };
            ModuleInvalidController = tslib_1.__decorate([
                (0, decorators_1.Module)({
                    imports: [],
                    controllers: ["some"],
                    services: [],
                    exports: [],
                })
            ], ModuleInvalidController);
        }
        catch (error) {
            (0, chai_1.expect)(error.message).to.be.equal(`An error has occurred in @Module(), please check the detail field`);
            (0, chai_1.expect)(error.detail).to.be.equal(`The content of the "controllers" entity must be type "class".`);
            (0, chai_1.expect)(error).to.be.an.instanceof(exceptions_1.InvalidModuleSchemaException);
        }
    });
    it("should respond controller type [object properties] invalid in module", () => {
        try {
            let ModuleInvalidController = class ModuleInvalidController {
            };
            ModuleInvalidController = tslib_1.__decorate([
                (0, decorators_1.Module)({
                    imports: [],
                    controllers: [{ some: "some" }],
                    services: [],
                    exports: [],
                })
            ], ModuleInvalidController);
        }
        catch (error) {
            (0, chai_1.expect)(error.message).to.be.equal(`An error has occurred in @Module(), please check the detail field`);
            (0, chai_1.expect)(error.detail).to.be.equal(`The content of the "controllers" entity must be type "class".`);
            (0, chai_1.expect)(error).to.be.an.instanceof(exceptions_1.InvalidModuleSchemaException);
        }
    });
    it("should respond missing services in module", () => {
        try {
            let ModuleIncomplete = class ModuleIncomplete {
            };
            ModuleIncomplete = tslib_1.__decorate([
                (0, decorators_1.Module)({
                    imports: [],
                    controllers: [],
                    exports: [],
                })
            ], ModuleIncomplete);
        }
        catch (error) {
            (0, chai_1.expect)(error.message).to.be.equal(`An error has occurred in @Module(), please check the detail field`);
            (0, chai_1.expect)(error.detail).to.be.equal(`missing entity 'services' into the @Module() decorator.`);
            (0, chai_1.expect)(error).to.be.an.instanceof(exceptions_1.InvalidModuleSchemaException);
        }
    });
    it("should respond service type [string] invalid in module", () => {
        try {
            let ModuleInvalidService = class ModuleInvalidService {
            };
            ModuleInvalidService = tslib_1.__decorate([
                (0, decorators_1.Module)({
                    imports: [],
                    controllers: [],
                    services: ["some"],
                    exports: [],
                })
            ], ModuleInvalidService);
        }
        catch (error) {
            (0, chai_1.expect)(error.message).to.be.equal(`An error has occurred in @Module(), please check the detail field`);
            (0, chai_1.expect)(error.detail).to.be.equal(`There are services that do not match the allowed types "class" or "object with provider and use value".`);
            (0, chai_1.expect)(error).to.be.an.instanceof(exceptions_1.InvalidModuleSchemaException);
        }
    });
    it("should respond service type [object properties] invalid in module", () => {
        try {
            let ModuleInvalidService = class ModuleInvalidService {
            };
            ModuleInvalidService = tslib_1.__decorate([
                (0, decorators_1.Module)({
                    imports: [],
                    controllers: [],
                    services: [{ some: "some" }],
                    exports: [],
                })
            ], ModuleInvalidService);
        }
        catch (error) {
            (0, chai_1.expect)(error.message).to.be.equal(`An error has occurred in @Module(), please check the detail field`);
            (0, chai_1.expect)(error.detail).to.be.equal(`There are services that do not match the allowed types "class" or "object with provider and use value".`);
            (0, chai_1.expect)(error).to.be.an.instanceof(exceptions_1.InvalidModuleSchemaException);
        }
    });
    it("should respond an empty array imports on ModuleTest", () => {
        const importsReflect = Reflect.getMetadata(constants_1.MODULE_IMPORTS, modules_mock_1.ModuleEmpty);
        (0, chai_1.expect)(importsReflect).to.be.an("array");
        (0, chai_1.expect)(importsReflect).to.be.empty;
    });
    it("should respond an array with controllers on ModuleTest", () => {
        const controllersReflect = Reflect.getMetadata(constants_1.MODULE_CONTROLLERS, modules_mock_1.ModuleWithController);
        (0, chai_1.expect)(controllersReflect).to.be.an("array");
        (0, chai_1.expect)(controllersReflect).to.not.be.empty;
    });
});