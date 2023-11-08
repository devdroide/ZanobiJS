"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const injector_1 = require("../../injector");
const classModule_mock_1 = require("../mocks/classModule.mock");
describe("Core - Injector - module", () => {
    let moduleInstance;
    beforeEach(() => {
        moduleInstance = new injector_1.Module();
    });
    describe("setup", () => {
        it("should respond that setup no is a module", () => {
            try {
                const mockModule = {};
                moduleInstance.setup(mockModule);
            }
            catch (error) {
                (0, chai_1.expect)(error.message).to.equal("The class must have an annotation @Module()");
            }
        });
        it("should respond no problem with the setup.", () => {
            moduleInstance.setup(classModule_mock_1.ModuleTestWithInjector);
            (0, chai_1.expect)(moduleInstance.getRegisterClass()).to.is.empty;
        });
    });
    describe("Module initialize", () => {
        it("should respond that call getMetadataModule and register on Module", () => {
            let metadataCalled = false;
            let registerDependencies = false;
            let registerDependenciesToAlias = false;
            moduleInstance["getMetadataModule"] = () => {
                metadataCalled = true;
            };
            moduleInstance["registerDependencies"] = () => {
                registerDependencies = true;
            };
            moduleInstance["registerDependenciesToAlias"] = () => {
                registerDependenciesToAlias = true;
            };
            moduleInstance.initialize();
            (0, chai_1.expect)(metadataCalled).to.be.true;
            (0, chai_1.expect)(registerDependencies).to.be.true;
            (0, chai_1.expect)(registerDependenciesToAlias).to.be.true;
        });
    });
    describe("Module get information", () => {
        it("Should respond apiKey and sContro2 in registered providers", () => {
            moduleInstance.setup(classModule_mock_1.ModuleTestWithInjector);
            moduleInstance.initialize();
            (0, chai_1.expect)(moduleInstance.getRegisterClass()).to.have.property("sContro2");
            (0, chai_1.expect)(moduleInstance.getRegisterClass()).to.have.property("apiKey");
        });
        it("Should respond imports of module", () => {
            moduleInstance.setup(classModule_mock_1.ModuleTestWithImports);
            moduleInstance.initialize();
            (0, chai_1.expect)(moduleInstance.getImports()).to.not.empty;
        });
    });
});
