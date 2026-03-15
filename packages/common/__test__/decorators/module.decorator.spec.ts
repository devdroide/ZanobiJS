/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, it, expect } from "vitest";
import { Module } from '../../decorators';
import { MODULE_CONTROLLERS, MODULE_IMPORTS } from '../../utils/constants';
import { ModuleEmpty, ModuleWithController } from '../mocks/modules.mock';
import { InvalidModuleSchemaException } from '../../exceptions';
describe('Commons - Decorators - module', () => {

  it('should throw InvalidModuleSchemaException when controllers contains a string instead of a class', () => {
    try {
      @Module({
        imports: [],
        controllers: ["some"],
        services: [],
        exports: [],
      })
      class ModuleInvalidController {}
    } catch (error) {
      expect(error.message).toEqual(
        "An error has occurred in @Module(), please check the detail field",
      );
      expect(error.detail).toEqual(
        'The content of the "controllers" entity must be type "class".',
      );
      expect(error).toBeInstanceOf(InvalidModuleSchemaException);
    }
  });
  it('should throw InvalidModuleSchemaException when controllers contains an object instead of a class', () => {
    try {
      @Module({
        imports: [],
        controllers: [{ some: 'some' }],
        services: [],
        exports: [],
      })
      class ModuleInvalidController {}
    } catch (error) {
      expect(error.message).toEqual(
        'An error has occurred in @Module(), please check the detail field',
      );
      expect(error.detail).toEqual(
        'The content of the "controllers" entity must be type "class".',
      );
      expect(error).toBeInstanceOf(InvalidModuleSchemaException);
    }
  });
  it("should throw InvalidModuleSchemaException when missing services property in module", () => {
    try {
      @Module({
        imports: [],
        controllers: [],
        exports: [],
      })
      class ModuleIncomplete {}
    } catch (error) {
      expect(error.message).toEqual(
        "An error has occurred in @Module(), please check the detail field",
      );
      expect(error.detail).toEqual(
        "missing entity 'services' into the @Module() decorator.",
      );
      expect(error).toBeInstanceOf(InvalidModuleSchemaException);
    }
  });
  it("should throw InvalidModuleSchemaException when services not contains instead of a class or object", () => {
    try {
      @Module({
        imports: [],
        controllers: [],
        services: ["some"],
        exports: [],
      })
      class ModuleInvalidService {}
    } catch (error) {
      expect(error.message).toEqual(
        "An error has occurred in @Module(), please check the detail field",
      );
      expect(error.detail).toEqual(
        'There are services that do not match the allowed types "class" or "object with provider and use value, use class or use factory".',
      );
      expect(error).toBeInstanceOf(InvalidModuleSchemaException);
    }
  });
  it("should throw InvalidModuleSchemaException when services not contains an object type provider", () => {
    try {
      @Module({
        imports: [],
        controllers: [],
        services: [{ some: "some" }],
        exports: [],
      })
      class ModuleInvalidService {}
    } catch (error) {
      expect(error.message).toEqual(
        "An error has occurred in @Module(), please check the detail field",
      );
      expect(error.detail).toEqual(
        'There are services that do not match the allowed types "class" or "object with provider and use value, use class or use factory".',
      );
      expect(error).toBeInstanceOf(InvalidModuleSchemaException);
    }
  });
  it("should return empty array when module has no controllers or services injected", () => {
    const importsReflect = Reflect.getMetadata(MODULE_IMPORTS, ModuleEmpty);
    expect(importsReflect).toBeInstanceOf(Array);
    expect(importsReflect).toHaveLength(0);
  });
  it("should return array when module has controllers injected", () => {
    const controllersReflect = Reflect.getMetadata(
      MODULE_CONTROLLERS,
      ModuleWithController,
    );
    expect(controllersReflect).toBeInstanceOf(Array);
    expect(controllersReflect).not.toHaveLength(0);
  });
});
