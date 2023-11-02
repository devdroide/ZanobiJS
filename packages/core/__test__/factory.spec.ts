import { expect } from "chai";
// import { Module } from "zanobijs-common";
import { Factory } from "../src/index";
import { ModuleTestAll } from "./mocks/classModule.mock";
import { ControllerWithDepen2 } from "./mocks/classWithDependeciesInject.mock";

describe("Core - factory", () => {
  const factory = new Factory(ModuleTestAll);
  describe("Create Factory App", () => {
    it("should respond error to create factory by error @Module", () => {
      class ModuleWithoutDecorator {}
      try {
        const factoryError = new Factory(ModuleWithoutDecorator);
      } catch (error) {
        expect(error.message).to.be.equal(
          "The class must have an annotation @Module()",
        );
      }
    });
    it("should respond create factory", () => {
      const app = factory.create();
      expect(app).to.be.instanceOf(Factory);
    });
  });
  describe("Get Entities", () => {
    it("should respond apiKey to controller the app", () => {
      const app = factory.create();
      const controllerWithDepen2 = app.get<ControllerWithDepen2>(
        "controllerWithDepen2",
      );
      expect(controllerWithDepen2.getApiKey()).to.be.equal(
        "isApiKey_qwerty12345",
      );
    });
  });
  // it("", () => {});
});
