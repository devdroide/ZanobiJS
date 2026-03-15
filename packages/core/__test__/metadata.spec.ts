import { describe, it, expect,} from "vitest";
import { Metadata } from "../metadata";
import { ModuleEmpty } from "./mocks/classModules.mock";
import { Controller3, Service1 } from "./mocks/classDependencies.mock";

describe("Core - metadata", () => {
  class genericClassForTesting {}
  const metadata = Metadata.getInstance();

  describe("Is Type", () => {
    it("should respond false to is module", () => {
      expect(metadata.isTypeModule(genericClassForTesting)).toBeFalsy();
    });
    it("should respond false to is imports", () => {
      expect(metadata.isTypeImport(genericClassForTesting)).toBeFalsy();
    });
    it("should respond false to is controllers", () => {
      expect(metadata.isTypeController(genericClassForTesting)).toBeFalsy();
    });
    it("should respond false to is services", () => {
      expect(metadata.isTypeService(genericClassForTesting)).toBeFalsy();
    });
    it("should respond false to is exports", () => {
      expect(metadata.isTypeExports(genericClassForTesting)).toBeFalsy();
    });
    it("should respond true to is module", () => {
      expect(metadata.isTypeModule(ModuleEmpty)).toBeTruthy();
    });
    it("should respond determine type of service", () => {
      expect(metadata.determineType(Service1)).toEqual("service");
    });
    it("should respond determine type of unknown", () => {
      class ServiceTest {}
      try {
        metadata.determineType(ServiceTest);
      } catch (error) {
        expect(error.message).toEqual("ServiceTest type is unknown");
      }
    });
  });
  describe("Get Metadata", () => {
    it("Should respond the metadata of the decorator module", () => {
      const metadata2 = Metadata.getInstance();
      const resultMetadata = metadata2.getMetadataModule(ModuleEmpty);
      expect(resultMetadata).toHaveProperty("imports");
      expect(resultMetadata).toHaveProperty("controllers");
      expect(resultMetadata).toHaveProperty("services");
      expect(resultMetadata).toHaveProperty("exports");
    });
    it("should respond the dependency metadata of a controller", () => {
      const resultMetadata = metadata.getAllDependencies(Controller3);
      expect(resultMetadata).toHaveProperty("dClass");
      expect(resultMetadata).toHaveProperty("dParam");
      expect(resultMetadata).toHaveProperty("dInject");
      expect(resultMetadata.dInject).toHaveLength(0);
    });
    it("should respond the dependency metadata of a service", () => {
      const resultMetadata = metadata.getAllDependencies(Service1);
      expect(resultMetadata).toHaveProperty("dClass");
      expect(resultMetadata).toHaveProperty("dParam");
      expect(resultMetadata).toHaveProperty("dInject");
      expect(resultMetadata.dInject).not.toHaveLength(0);
    });
  });
});
