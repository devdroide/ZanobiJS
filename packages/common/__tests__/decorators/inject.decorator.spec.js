"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const constants_1 = require("../../utils/constants");
const controllers_mock_1 = require("../mocks/controllers.mock");
describe("Commons - Decorators - Inject", () => {
    it("should respond an undefined of dependencies inject", () => {
        const dependenciesInject = Reflect.getMetadata(constants_1.DEPENDENCIES_INJECT, controllers_mock_1.ControllerOnly);
        (0, chai_1.expect)(dependenciesInject).to.be.undefined;
    });
    it("should respond an true by has inject", () => {
        const hasInject = Reflect.getMetadata(constants_1.HAS_INJECT, controllers_mock_1.ControllerOnly);
        (0, chai_1.expect)(hasInject).to.be.undefined;
    });
    it("should respond an map of dependencies", () => {
        const dependenciesInject = Reflect.getMetadata(constants_1.DEPENDENCIES_INJECT, controllers_mock_1.ControllerWithInject);
        (0, chai_1.expect)(dependenciesInject).to.be.an("Map");
        (0, chai_1.expect)(dependenciesInject.has("API_KEY")).to.be.true;
    });
    it("should respond an true by has inject", () => {
        const hasInject = Reflect.getMetadata(constants_1.HAS_INJECT, controllers_mock_1.ControllerWithInject);
        (0, chai_1.expect)(hasInject).to.be.an("Boolean");
        (0, chai_1.expect)(hasInject).to.be.true;
    });
});
