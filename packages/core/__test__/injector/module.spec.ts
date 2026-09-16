import 'reflect-metadata';
import { beforeEach, describe, expect, it } from 'vitest';
import { Module } from '../../injector';
import {
  Module1,
  Module2,
  Module3,
  ModuleProviderHaveModule,
  ModuleProviderWithoutInjectable,
  ModuleTestEmpty,
} from './mocks/classModuleToInject';

describe('Core - Injector - module', () => {
  let moduleInstance: Module;
  describe('setup', () => {
    beforeEach(() => {
      moduleInstance = new Module();
    });

    it('should respond that setup no is a module', () => {
      try {
        const mockModule = {};
        moduleInstance.setup(mockModule);
      } catch (error) {
        expect(error.message).toBe(
          'The class must have an annotation @Module()',
        );
      }
    });
    it('should respond no problem with the setup.', () => {
      moduleInstance.setup(ModuleTestEmpty);
      expect(moduleInstance.getRegisterClass()).toEqual({});
    });
  });

  describe('Module initialize', () => {
    beforeEach(() => {
      moduleInstance = new Module();
    });
    it('should respond that call getMetadataModule and register on Module', () => {
      let metadataCalled = false;
      // let registerDependencies = false;
      let registerDependenciesToAlias = false;

      moduleInstance.setup(ModuleTestEmpty);
      moduleInstance.initialize();

      moduleInstance['getMetadataModule'] = () => {
        metadataCalled = true;
      };
      // moduleInstance['registerDependencies'] = () => {
      //   registerDependencies = true;
      // };
      moduleInstance['registerDependenciesToAlias'] = () => {
        registerDependenciesToAlias = true;
      };

      moduleInstance.initialize();

      expect(metadataCalled).toBe(true);
      // expect(registerAllProviders).to.be.true;
      // expect(registerDependencies).to.be.true;
      expect(registerDependenciesToAlias).toBe(true);
    });
  });

  describe('Module get information', () => {
    beforeEach(() => {
      moduleInstance = new Module();
    });
    it('Should respond textInj and service1 in registered providers', () => {
      moduleInstance.setup(Module1);
      moduleInstance.scan();
      moduleInstance.initialize();
      expect(moduleInstance.getRegisterClass()).toHaveProperty('service1');
      expect(moduleInstance.getRegisterClass()).toHaveProperty('textInj');
    });
    it('Should respond imports of module', () => {
      moduleInstance.setup(Module2);
      moduleInstance.scan();
      moduleInstance.initialize();
      expect(moduleInstance.getImports()).not.toHaveLength(0);
    });
    it('Should respond empty register class', () => {
      moduleInstance.setup(Module3);
      moduleInstance.scan();
      moduleInstance.initialize();
      expect(moduleInstance.getRegisterClass()).not.toEqual({});
      expect(moduleInstance.getRegisterClass()).toHaveProperty('serv1');
    });
    it('Should respond with an error because a provider is poorly defined.', () => {
      try {
        moduleInstance.setup(ModuleProviderWithoutInjectable);
        moduleInstance.scan();
        moduleInstance.initialize();
      } catch (error) {
        expect(error.message).toBe(
          'Please check that ServiceWithoutInjectable located in the @module ModuleProviderWithoutInjectable exists and is @Injectable().',
        );
        expect(error.detail).toBe('ServiceWithoutInjectable type is unknown');
      }
    });
    it('Should respond with an error because a provider have module and is poorly defined.', () => {
      try {
        moduleInstance.setup(ModuleProviderHaveModule);
        moduleInstance.scan();
        moduleInstance.initialize();
      } catch (error) {
        expect(error.message).toBe(
          'Please check that ModuleFactory located in the @module ModuleProviderHaveModule exists and is @Injectable().',
        );
        expect(error.detail).toBe(
          'The type used in the provider useClass property is not valid',
        );
      }
    });
  });
});
