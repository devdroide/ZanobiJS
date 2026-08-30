import { describe, expect, it, vi } from 'vitest';
import { Factory } from '../index';
import { Module as ModuleClass } from '../injector/module';
import { CircularModuleImportException } from '../exceptions/circularModuleImport.exception';
import {
  CircularModuleA,
  DiamondAppModule,
  Module1,
  Module2,
  Module4,
  Module5,
  ModuleEmpty,
  ModuleRepository,
  ModuleWithThrowingConstructor,
} from './mocks/classModules.mock';
import {
  Controller1,
  Controller6,
  ControllerUser,
} from './mocks/classDependencies.mock';

describe('Core - factory options', () => {
  it('should respond error to create factory by error @Module', () => {
    class ModuleWithoutDecorator {}
    try {
      new Factory(ModuleWithoutDecorator, {
        activeLoggerSystem: true,
        activeLoggerUser: true,
      });
    } catch (error) {
      expect(error.message).toBe('The class must have an annotation @Module()');
    }
  });
  it('should respond create factory', () => {
    const factory = new Factory(ModuleEmpty, {
      activeLoggerSystem: false,
    });
    const app = factory.create();
    expect(app).toBeInstanceOf(Factory);
  });
});

describe('Core - factory - Entities', () => {
  it('It should respond with an error because the controller is not in the module.', () => {
    const factory = new Factory(ModuleEmpty, { activeLoggerSystem: false });
    const app = factory.create();
    try {
      app.get('SomeController');
    } catch (error) {
      expect(error.message).toBe(
        "Please check that the entity 'SomeController' exists and is registered in @modulo",
      );
      expect(error.detail).toContain(
        "Could not resolve 'SomeController'.\n\nResolution path: SomeController",
      );
    }
  });
  it('It should respond with an error because the provider is not in the module.', () => {
    const factory = new Factory(ModuleEmpty, { activeLoggerSystem: false });
    const app = factory.create();
    try {
      app.get('TEXT_PROVIDER');
    } catch (error) {
      expect(error.message).toBe(
        "Please check that the entity 'TEXT_PROVIDER' exists and is registered in @modulo",
      );
      expect(error.detail).toContain(
        "Could not resolve 'TEXT_PROVIDER'.\n\nResolution path: TEXT_PROVIDER",
      );
    }
  });
  it('It should respond with an error because the controller is not in the module.', () => {
    const factory = new Factory(Module4, { activeLoggerSystem: true });
    const app = factory.create();
    try {
      const controller6: Controller6 = app.get('controller6');
      controller6.geData();
    } catch (error) {
      expect(error.message).toBe(
        "Could not resolve 'service2'. please review 'controller6' and its dependencies.",
      );
      expect(error.detail).toContain(
        "Could not resolve 'service2'.\n\nResolution path: controller6 -> Controller6 -> serv2 -> service2",
      );
    }
  });
  it('It should respond getData of controller.', () => {
    const factory = new Factory(Module1);
    const app = factory.create();
    const controller1: Controller1 = app.get('controller1');
    expect(controller1.getData()).toBe('Hello world');
  });
  it('It should respond the useValue of provider.', () => {
    const factory = new Factory(Module1);
    const app = factory.create();
    const textInject: string = app.get('TEXT_INJECT');
    expect(textInject).toBe('Hello world inject');
  });
  it('should propagate the original error unwrapped when a constructor throws', () => {
    const factory = new Factory(ModuleWithThrowingConstructor, {
      activeLoggerSystem: false,
    });
    const app = factory.create();
    expect(() => app.get('serviceThatThrowsOnConstruct')).toThrow(
      'Missing DB_URL environment variable',
    );
  });
});

describe('Core - factory - Module to Module', () => {
  it('It should respond getData of controller.', () => {
    const factory = new Factory(Module2, {
      activeLoggerSystem: true,
      activeLoggerUser: true,
    });
    const app = factory.create();
    const controller1: Controller1 = app.get('controller1');
    expect(controller1.getData()).toBe('Hello world');
  });
  it('It should respond getData of controller.', () => {
    const factory = new Factory(Module5, {
      activeLoggerSystem: true,
      activeLoggerUser: true,
    });
    const app = factory.create();
    const controller1: Controller1 = app.get('controller1');
    expect(controller1.getData()).toBe('Hello world');
  });
  it('It should respond to the class value that was changed or overridden.', () => {
    const factory = new Factory(ModuleRepository, {
      activeLoggerSystem: true,
      activeLoggerUser: true,
    });
    const app = factory.create();
    const controllerUser: ControllerUser = app.get('ControllerUser');
    expect(controllerUser.register()).toBe('Created');
  });
});

describe('Core - factory - Module graph traversal', () => {
  it('should scan and process each module only once even when reached via multiple import paths (diamond)', () => {
    const setupSpy = vi.spyOn(ModuleClass.prototype, 'setup');
    const factory = new Factory(DiamondAppModule, {
      activeLoggerSystem: false,
    });
    const app = factory.create();
    const controller1: Controller1 = app.get('controller1');
    expect(controller1.getData()).toBe('Hello world');
    // 4 módulos únicos en el grafo (DiamondAppModule, Module2, Module3, Module1)
    // x 2 fases (scanProviderModule + processClassModule) = 8, sin importar
    // que Module1 sea alcanzable por dos rutas distintas.
    expect(setupSpy).toHaveBeenCalledTimes(8);
    setupSpy.mockRestore();
  });

  it('should throw CircularModuleImportException when modules import each other', () => {
    expect(
      () => new Factory(CircularModuleA, { activeLoggerSystem: false }),
    ).toThrow(CircularModuleImportException);
  });
});
