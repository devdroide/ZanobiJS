"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const constants_1 = require("../../utils/constants");
const services_mock_1 = require("../mocks/services.mock");
describe("Commons - Decorator - service", () => {
    it("should respond an empty array of dependencies", () => {
        const dependenciesClass = Reflect.getMetadata(constants_1.DEPENDENCIES_CLASS, services_mock_1.ServiceOnly);
        (0, chai_1.expect)(dependenciesClass).to.be.an("array");
        (0, chai_1.expect)(dependenciesClass).to.be.empty;
    });
    it("should respond an array with dependecies type controller", () => {
        const dependenciesClass = Reflect.getMetadata(constants_1.DEPENDENCIES_CLASS, services_mock_1.ServiceWithService);
        // console.log(dependenciesClass);
        (0, chai_1.expect)(dependenciesClass).to.be.an("array");
        (0, chai_1.expect)(dependenciesClass).to.not.be.empty;
        (0, chai_1.expect)(dependenciesClass[0]).to.include({ type: "Service" });
        (0, chai_1.expect)(dependenciesClass[0]).to.include({ nameClass: "ServiceOnly" });
        (0, chai_1.expect)(dependenciesClass[0]).to.include({
            nameClassContainer: "serviceOnly",
        });
        (0, chai_1.expect)(dependenciesClass[0]).to.include({ nameParameter: "serviceOnly" });
        (0, chai_1.expect)(dependenciesClass.length).to.be.equal(1);
    });
    it("should respond an array with dependecies as paramter", () => {
        const dependenciesClass = Reflect.getMetadata(constants_1.DEPENDENCIES_CLASS, services_mock_1.ServiceWithParameter);
        // console.log(dependenciesClass);
        (0, chai_1.expect)(dependenciesClass).to.be.an("array");
        (0, chai_1.expect)(dependenciesClass).to.not.be.empty;
        (0, chai_1.expect)(dependenciesClass[0]).to.include({ type: "Service" });
        (0, chai_1.expect)(dependenciesClass[0]).to.include({ nameClass: "String" });
        (0, chai_1.expect)(dependenciesClass[0]).to.include({
            nameClassContainer: "string",
        });
        (0, chai_1.expect)(dependenciesClass[0]).to.include({ nameParameter: "userName" });
        (0, chai_1.expect)(dependenciesClass.length).to.be.equal(1);
    });
    it("should respond an array with dependecies and additional @Inject", () => {
        const dependenciesClass = Reflect.getMetadata(constants_1.DEPENDENCIES_CLASS, services_mock_1.ServiceMix);
        // console.log(dependenciesClass);
        (0, chai_1.expect)(dependenciesClass).to.be.an("array");
        (0, chai_1.expect)(dependenciesClass).to.not.be.empty;
        (0, chai_1.expect)(dependenciesClass[1]).to.include({ type: "Service" });
        (0, chai_1.expect)(dependenciesClass[1]).to.include({ nameClass: "String" });
        (0, chai_1.expect)(dependenciesClass[1]).to.include({
            nameClassContainer: "string",
        });
        (0, chai_1.expect)(dependenciesClass[1]).to.include({ nameParameter: "apiKey" });
        (0, chai_1.expect)(dependenciesClass.length).to.be.equal(3);
    });
});
