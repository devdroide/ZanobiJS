import { expect } from "chai";
// import { Module } from "@zanobijs/common";
import { Factory } from "../index";
import { ModuleTestAll } from "./mocks/classModule.mock";
import { ControllerWithDepen2 } from "./mocks/classWithDependeciesInject.mock";

describe("Core - factory", () => {
  const factory = new Factory(ModuleTestAll);
  describe("Create Factory App", () => {
    it("should respond error to create factory by error @Module", () => {
      class ModuleWithoutDecorator {}
      try {
        new Factory(ModuleWithoutDecorator);
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
    it("should respond error by resolve entity controller", () => {
      const app = factory.create();
      try {
        app.get("SomeController");
      } catch (error) {
        console.log(error)
        expect(error.message).to.be.equal(
          "No 'SomeController' was found registered in @modulo.",
        );
        expect(error.detail).to.have.string("Could not resolve 'someController'.");
      }
    });
    it("should respond error by resolve entity controller with number in name", () => {
      const app = factory.create();
      try {
        app.get("123SomeController");
      } catch (error) {
        expect(error.message).to.be.equal(
          "No '123SomeController' was found registered in @modulo.",
        );
        expect(error.detail).to.have.string("Could not resolve '123SomeController'.");
      }
    });
    it("should respond error by resolve entity controller with special character", () => {
      const app = factory.create();
      try {
        app.get("*123SomeController");
      } catch (error) {
        expect(error.message).to.be.equal(
          "No '*123SomeController' was found registered in @modulo.",
        );
        expect(error.detail).to.have.string(
          "Could not resolve '*123SomeController'.",
        );
      }
    });
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
});
