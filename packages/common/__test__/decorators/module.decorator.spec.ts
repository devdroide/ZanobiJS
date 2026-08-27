/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, it } from 'vitest';
import { Module } from '../../decorators';
import { MODULE_CONTROLLERS, MODULE_IMPORTS } from '../../utils/constants';
import { ModuleEmpty, ModuleWithController } from '../mocks/modules.mock';
import { InvalidModuleSchemaException } from '../../exceptions';
describe('Commons - Decorators - module', () => {
  it('should respond controller type [string] invalid in module', () => {
    try {
      @Module({
        imports: [],
        controllers: ['some'],
        services: [],
        exports: [],
      })
      class ModuleInvalidController {}
    } catch (error) {
      expect(error.message).toBe(
        'An error has occurred in @Module(), please check the detail field',
      );
      expect(error.detail).toBe(
        'The content of the "controllers" entity must be type "class".',
      );
      expect(error).toBeInstanceOf(InvalidModuleSchemaException);
    }
  });
  it('should respond controller type [object properties] invalid in module', () => {
    try {
      @Module({
        imports: [],
        controllers: [{ some: 'some' }],
        services: [],
        exports: [],
      })
      class ModuleInvalidController {}
    } catch (error) {
      expect(error.message).toBe(
        'An error has occurred in @Module(), please check the detail field',
      );
      expect(error.detail).toBe(
        'The content of the "controllers" entity must be type "class".',
      );
      expect(error).toBeInstanceOf(InvalidModuleSchemaException);
    }
  });
  it('should respond missing services in module', () => {
    try {
      @Module({
        imports: [],
        controllers: [],
        exports: [],
      })
      class ModuleIncomplete {}
    } catch (error) {
      expect(error.message).toBe(
        'An error has occurred in @Module(), please check the detail field',
      );
      expect(error.detail).toBe(
        "missing entity 'services' into the @Module() decorator.",
      );
      expect(error).toBeInstanceOf(InvalidModuleSchemaException);
    }
  });
  it('should respond service type [string] invalid in module', () => {
    try {
      @Module({
        imports: [],
        controllers: [],
        services: ['some'],
        exports: [],
      })
      class ModuleInvalidService {}
    } catch (error) {
      expect(error.message).toBe(
        'An error has occurred in @Module(), please check the detail field',
      );
      expect(error.detail).toBe(
        'There are services that do not match the allowed types "class" or "object with provider and use value, use class or use factory".',
      );
      expect(error).toBeInstanceOf(InvalidModuleSchemaException);
    }
  });
  it('should respond service type [object properties] invalid in module', () => {
    try {
      @Module({
        imports: [],
        controllers: [],
        services: [{ some: 'some' }],
        exports: [],
      })
      class ModuleInvalidService {}
    } catch (error) {
      expect(error.message).toBe(
        'An error has occurred in @Module(), please check the detail field',
      );
      expect(error.detail).toBe(
        'There are services that do not match the allowed types "class" or "object with provider and use value, use class or use factory".',
      );
      expect(error).toBeInstanceOf(InvalidModuleSchemaException);
    }
  });
  it('should respond an empty array imports on ModuleTest', () => {
    const importsReflect = Reflect.getMetadata(MODULE_IMPORTS, ModuleEmpty);
    expect(importsReflect).toBeInstanceOf(Array);
    expect(importsReflect).toHaveLength(0);
  });
  it('should respond an array with controllers on ModuleTest', () => {
    const controllersReflect = Reflect.getMetadata(
      MODULE_CONTROLLERS,
      ModuleWithController,
    );
    expect(controllersReflect).toBeInstanceOf(Array);
    expect(controllersReflect).not.toHaveLength(0);
  });
});
