import { expect } from "chai";
import { Module } from "@zanobijs/common";
import { Factory } from "../index";
import {
  ModuleTestAll,
  ModuleTestProviderWithout,
} from "./mocks/classModule.mock";
import {
  ControllerWithDepen2,
  ControllerDepenNoExists,
} from "./mocks/classWithDependeciesInject.mock";

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
        expect(error.message).to.be.equal(
          "'SomeController' is not registered in any @module.",
        );
        expect(error.detail).to.have.string(
          "Could not resolve 'SomeController'.\n\nResolution path: SomeController",
        );
      }
    });
    it("should respond error by resolve entity controller with number in name", () => {
      const app = factory.create();
      try {
        app.get("123SomeController");
      } catch (error) {
        expect(error.message).to.be.equal(
          "'123SomeController' is not registered in any @module.",
        );
        expect(error.detail).to.have.string(
          "Could not resolve '123SomeController'.\n\nResolution path: 123SomeController",
        );
      }
    });
    it("should respond error by resolve entity controller with special character", () => {
      const app = factory.create();
      try {
        app.get("*123SomeController");
      } catch (error) {
        expect(error.message).to.be.equal(
          "'*123SomeController' is not registered in any @module.",
        );
        expect(error.detail).to.have.string(
          "Could not resolve '*123SomeController'.\n\nResolution path: *123SomeController",
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

describe("Core - factory", () => {
  const factory = new Factory(ModuleTestProviderWithout);
  const factoryLogger = new Factory(ModuleTestProviderWithout, {
    activeLoggerSystem: true,
    activeLoggerUser: true,
  });
  describe("Get Entities with dependencies", () => {
    it("should respond error by inject no exist in provider modules", () => {
      const app = factory.create();
      try {
        app.get<ControllerDepenNoExists>("ControllerDepenNoExists");
      } catch (error) {
        expect(error.message).to.be.equal(
          "'ControllerDepenNoExists' is not registered in any @module.",
        );
        expect(error.detail).to.have.string(
          "Could not resolve 'string'.\n\nResolution path: ControllerDepenNoExists -> someKey -> string",
        );
      }
    });
  });
  describe("Validate Logger System", () => {
    it("should active logger user and system", () => {
      const app = factory.create();
      console.log("APP", app)
      expect(app).to.have.property("registeredClasses");
    });
  });
});
