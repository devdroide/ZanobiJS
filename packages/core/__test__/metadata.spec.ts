import { expect } from "chai";
import { Metadata } from "../metadata";
import { ModuleEmpty } from "./mocks/classModules.mock";
import { Controller3, Service1 } from "./mocks/classDependencies.mock";

describe("Core - metadata", () => {
  class genericClassForTesting {}
  const metadata = Metadata.getInstance();

  describe("Is Type", () => {
    it("should respond false to is module", () => {
      expect(metadata.isTypeModule(genericClassForTesting)).to.be.false;
    });
    it("should respond false to is imports", () => {
      expect(metadata.isTypeImport(genericClassForTesting)).to.be.false;
    });
    it("should respond false to is controllers", () => {
      expect(metadata.isTypeController(genericClassForTesting)).to.be.false;
    });
    it("should respond false to is services", () => {
      expect(metadata.isTypeService(genericClassForTesting)).to.be.false;
    });
    it("should respond false to is exports", () => {
      expect(metadata.isTypeExports(genericClassForTesting)).to.be.false;
    });
    it("should respond true to is module", () => {
      expect(metadata.isTypeModule(ModuleEmpty)).to.be.true;
    });
    it("should respond determine type of service", () => {
      expect(metadata.determineType(Service1)).to.be.equal("service");
    });
    it("should respond determine type of unknown", () => {
      class ServiceTest {}
      try {
        metadata.determineType(ServiceTest);
      } catch (error) {
        expect(error.message).to.be.equal("ServiceTest type is unknown");
      }
    });
  });
  describe("Get Metadata", () => {
    it("Should respond the metadata of the decorator module", () => {
      const metadata2 = Metadata.getInstance();
      const resultMetadata = metadata2.getMetadataModule(ModuleEmpty);
      expect(resultMetadata).to.have.property("imports");
      expect(resultMetadata).to.have.property("controllers");
      expect(resultMetadata).to.have.property("services");
      expect(resultMetadata).to.have.property("exports");
    });
    it("should respond the dependency metadata of a controller", () => {
      const resultMetadata = metadata.getAllDependencies(Controller3);
      expect(resultMetadata).to.have.property("dClass");
      expect(resultMetadata).to.have.property("dParam");
      expect(resultMetadata).to.have.property("dInject");
      expect(resultMetadata.dInject).to.be.empty;
    });
    it("should respond the dependency metadata of a service", () => {
      const resultMetadata = metadata.getAllDependencies(Service1);
      expect(resultMetadata).to.have.property("dClass");
      expect(resultMetadata).to.have.property("dParam");
      expect(resultMetadata).to.have.property("dInject");
      expect(resultMetadata.dInject).to.not.be.empty;
    });
  });
});
