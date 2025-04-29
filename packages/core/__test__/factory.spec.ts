import { expect } from "chai";
import { Factory } from "../index";
import {
  Module1,
  Module2,
  Module4,
  Module5,
  ModuleEmpty,
} from "./mocks/classModules.mock";
import { Controller1, Controller6 } from "./mocks/classDependencies.mock";

describe("Core - factory options", () => {
  it("should respond error to create factory by error @Module", () => {
    class ModuleWithoutDecorator {}
    try {
      new Factory(ModuleWithoutDecorator, {
        activeLoggerSystem: true,
        activeLoggerUser: true,
      });
    } catch (error) {
      expect(error.message).to.be.equal(
        "The class must have an annotation @Module()",
      );
    }
  });
  it("should respond create factory", () => {
    const factory = new Factory(ModuleEmpty, {
      activeLoggerSystem: false,
    });
    const app = factory.create();
    expect(app).to.be.instanceOf(Factory);
  });
});

describe("Core - factory - Entities", () => {
  it("It should respond with an error because the controller is not in the module.", () => {
    const factory = new Factory(ModuleEmpty, { activeLoggerSystem: false });
    const app = factory.create();
    try {
      app.get("SomeController");
    } catch (error) {
      expect(error.message).to.be.equal(
        "Please check that the entity 'SomeController' exists and is registered in @modulo",
      );
      expect(error.detail).to.have.string(
        "Could not resolve 'SomeController'.\n\nResolution path: SomeController",
      );
    }
  });
  it("It should respond with an error because the provider is not in the module.", () => {
    const factory = new Factory(ModuleEmpty, { activeLoggerSystem: false });
    const app = factory.create();
    try {
      app.get("TEXT_PROVIDER");
    } catch (error) {
      expect(error.message).to.be.equal(
        "Please check that the entity 'TEXT_PROVIDER' exists and is registered in @modulo",
      );
      expect(error.detail).to.have.string(
        "Could not resolve 'TEXT_PROVIDER'.\n\nResolution path: TEXT_PROVIDER",
      );
    }
  });
  it("It should respond with an error because the controller is not in the module.", () => {
    const factory = new Factory(Module4, { activeLoggerSystem: true });
    const app = factory.create();
    try {
      const controller6: Controller6 = app.get("controller6");
      controller6.geData();
    } catch (error) {
      expect(error.message).to.be.equal(
        "Could not resolve 'service2'. please review 'controller6' and its dependencies.",
      );
      expect(error.detail).to.have.string(
        "Could not resolve 'service2'.\n\nResolution path: controller6 -> Controller6 -> serv2 -> service2",
      );
    }
  });
  it("It should respond getData of controller.", () => {
    const factory = new Factory(Module1);
    const app = factory.create();
    const controller1: Controller1 = app.get("controller1");
    expect(controller1.getData()).to.be.equal("Hello world");
  });
  it("It should respond the useValue of provider.", () => {
    const factory = new Factory(Module1);
    const app = factory.create();
    const textInject: string = app.get("TEXT_INJECT");
    expect(textInject).to.be.equal("Hello world inject");
  });
});

describe("Core - factory - Module to Module", () => {
  it("It should respond getData of controller.", () => {
    const factory = new Factory(Module2, {
      activeLoggerSystem: true,
      activeLoggerUser: true,
    });
    const app = factory.create();
    const controller1: Controller1 = app.get("controller1");
    expect(controller1.getData()).to.be.equal("Hello world");
  });
  it("It should respond getData of controller.", () => {
    const factory = new Factory(Module5, {
      activeLoggerSystem: true,
      activeLoggerUser: true,
    });
    const app = factory.create();
    const controller1: Controller1 = app.get("controller1");
    expect(controller1.getData()).to.be.equal("Hello world");
  });
});
