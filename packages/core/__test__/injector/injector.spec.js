"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const injector_1 = require("../../injector");
const classModule_mock_1 = require("../mocks/classModule.mock");
const classWithDependeciesInject_mock_1 = require("../mocks/classWithDependeciesInject.mock");
const classWithDependeciesClass_mock_1 = require("../mocks/classWithDependeciesClass.mock");
describe("Core - Injector - injector", () => {
    const injector = new injector_1.Injector(classModule_mock_1.ModuleTestWithInjector);
    beforeEach(() => {
        process.env.ZANOBI_DEBUG = "false";
    });
    it("Should respond an object with paramters to inject", () => {
        const getInjectData = injector.getInjectData(classWithDependeciesClass_mock_1.ControllerWithDepenClass);
        (0, chai_1.expect)(getInjectData).to.is.empty;
    });
    it("Should respond an object without paramters to inject", () => {
        const getInjectData = injector.getInjectData(classWithDependeciesInject_mock_1.ControllerWithDepen2);
        (0, chai_1.expect)(getInjectData).to.have.property("apiKey");
    });
    it("Should respond an object type asClass with paramters to inject", () => {
        const getInject = injector.getInjector(classWithDependeciesInject_mock_1.ControllerWithDepen2);
        (0, chai_1.expect)(getInject).to.have.property("lifetime");
        (0, chai_1.expect)(getInject).to.have.property("inject");
        (0, chai_1.expect)(getInject).to.have.property("injector");
    });
    it("Should respond an object type asClass without injector", () => {
        const getInject = injector.getInjector(classWithDependeciesClass_mock_1.ControllerWithDepenClass);
        (0, chai_1.expect)(getInject).to.not.have.property("injector");
    });
    // it("", () => {});
});
