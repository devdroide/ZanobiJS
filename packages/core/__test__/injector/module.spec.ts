import "reflect-metadata";
import { expect } from "chai";
import { Module } from "../../injector";
import { Module1, Module2, Module3, ModuleTestEmpty } from "./mocks/classModuleToInject";

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
      moduleInstance.setup(ModuleTestEmpty);
      expect(moduleInstance.getRegisterClass()).to.is.empty;
    });
  });

  describe("Module initialize", () => {
    it("should respond that call getMetadataModule and register on Module", () => {
      let metadataCalled = false;
      let registerAllProviders = false;
      let registerDependencies = false;
      let registerDependenciesToAlias = false;


      moduleInstance.setup(ModuleTestEmpty);
      moduleInstance.initialize();

      moduleInstance["getMetadataModule"] = () => {
        metadataCalled = true;
      };
      moduleInstance["registerAllProviders"] = () => {
        registerAllProviders = true;
      };
      moduleInstance["registerDependencies"] = () => {
        registerDependencies = true;
      };
      moduleInstance["registerDependenciesToAlias"] = () => {
        registerDependenciesToAlias = true;
      };

      moduleInstance.initialize();

      expect(metadataCalled).to.be.true;
      expect(registerAllProviders).to.be.true;
      expect(registerDependencies).to.be.true;
      expect(registerDependenciesToAlias).to.be.true;
    });
  });

  describe("Module get information", () => {
    it("Should respond textInj and service1 in registered providers", () => {
      moduleInstance.setup(Module1);
      moduleInstance.initialize();
      expect(moduleInstance.getRegisterClass()).to.have.property("service1");
      expect(moduleInstance.getRegisterClass()).to.have.property("textInj");
    });
    it("Should respond imports of module", () => {
      moduleInstance.setup(Module2);
      moduleInstance.initialize();
      expect(moduleInstance.getImports()).to.not.empty
    });
    it("Should respond empty register class", () => {
      moduleInstance.setup(Module3);
      moduleInstance.initialize();
      expect(moduleInstance.getRegisterClass()).to.not.empty;
      expect(moduleInstance.getRegisterClass()).to.have.property("serv1");
    });
  });
});
