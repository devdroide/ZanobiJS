import "reflect-metadata";
import { expect } from "chai";
import { Injector, Module } from "../../injector";
import {
  ModuleTestWithImports,
  ModuleTestWithInjector,
  ModuleTestProviderWithout,
} from "../mocks/classModule.mock";

describe("Core - Injector - module", () => {
  let moduleInstance: Module;

  beforeEach(() => {
    moduleInstance = new Module();
  });

  describe("setup", () => {
    it("should respond that setup no is a module", () => {
      try {
        const mockModule = {};
        moduleInstance.setup(mockModule);
      } catch (error) {
        expect(error.message).to.equal(
          "The class must have an annotation @Module()",
        );
      }
    });
    it("should respond no problem with the setup.", () => {
      moduleInstance.setup(ModuleTestWithInjector);
      expect(moduleInstance.getRegisterClass()).to.is.empty;
    });
  });

  // describe("Module initialize", () => {
  //   it.only("should respond that call getMetadataModule and register on Module", () => {
  //     let metadataCalled = false;
  //     let registerAllProviders = false;
  //     let registerDependencies = false;
  //     let registerDependenciesToAlias = false;
  //     let setRegisteredClassParentModule = false
  //     moduleInstance.injector = new Injector(moduleInstance);

  //     console.log("moduleInstance", moduleInstance);

  //     moduleInstance.initialize();

  //     moduleInstance["getMetadataModule"] = () => {
  //       metadataCalled = true;
  //     };
  //     moduleInstance["registerAllProviders"] = () => {
  //       registerAllProviders = true;
  //       setRegisteredClassParentModule = true
  //     };
  //     moduleInstance["registerDependencies"] = () => {
  //       registerDependencies = true;
  //     };
  //     moduleInstance["registerDependenciesToAlias"] = () => {
  //       registerDependenciesToAlias = true;
  //     };

  //     moduleInstance.initialize();

  //     expect(metadataCalled).to.be.true;
  //     expect(registerAllProviders).to.be.true;
  //     expect(registerDependencies).to.be.true;
  //     expect(registerDependenciesToAlias).to.be.true;
  //   });
  // });

  describe("Module get information", () => {
    it("Should respond apiKey and sContro2 in registered providers", () => {
      moduleInstance.setup(ModuleTestWithInjector);
      moduleInstance.initialize();
      expect(moduleInstance.getRegisterClass()).to.have.property("sContro2");
      expect(moduleInstance.getRegisterClass()).to.have.property("apiKey");
    });
    it("Should respond imports of module", () => {
      moduleInstance.setup(ModuleTestWithImports);
      moduleInstance.initialize();
      expect(moduleInstance.getImports()).to.not.empty
    });
  });
});
