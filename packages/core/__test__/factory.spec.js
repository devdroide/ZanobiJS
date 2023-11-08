"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
// import { Module } from "zanobijs-common";
const index_1 = require("../index");
const classModule_mock_1 = require("./mocks/classModule.mock");
describe("Core - factory", () => {
    const factory = new index_1.Factory(classModule_mock_1.ModuleTestAll);
    describe("Create Factory App", () => {
        it("should respond error to create factory by error @Module", () => {
            class ModuleWithoutDecorator {
            }
            try {
                const factoryError = new index_1.Factory(ModuleWithoutDecorator);
            }
            catch (error) {
                (0, chai_1.expect)(error.message).to.be.equal("The class must have an annotation @Module()");
            }
        });
        it("should respond create factory", () => {
            const app = factory.create();
            (0, chai_1.expect)(app).to.be.instanceOf(index_1.Factory);
        });
    });
    describe("Get Entities", () => {
        it("should respond apiKey to controller the app", () => {
            const app = factory.create();
            const controllerWithDepen2 = app.get("controllerWithDepen2");
            (0, chai_1.expect)(controllerWithDepen2.getApiKey()).to.be.equal("isApiKey_qwerty12345");
        });
    });
    // it("", () => {});
});
