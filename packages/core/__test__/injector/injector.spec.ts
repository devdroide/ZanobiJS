import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import { Injector } from '../../injector';
import { MissingInjectTokenException } from '../../exceptions/missingInjectToken.exception';
import {
  Module1,
  ModuleFactory,
  ModuleProviderError,
} from './mocks/classModuleToInject';
import {
  Controller1,
  Controller2,
  Controller3,
  Service1,
} from './mocks/classDependenciesToInject';

describe('Core - Injector - injector', () => {
  let listProvider;
  let listProviderClass;
  let injector: Injector;
  beforeEach(() => {
    listProvider = new Map();
    listProviderClass = new Map();
    injector = null;
    injector = new Injector(Module1, listProvider, listProviderClass);
    injector.scanProviders();
  });
  afterAll(() => {
    injector = null;
  });
  it('Should respond an object without paramters to inject', () => {
    const getInjectData = injector.getInjectData(Controller1);
    expect(getInjectData).toEqual({});
  });
  it('Should respond an object with property textInj to inject of Service1 ', () => {
    const getInjectData = injector.getInjectData(Service1);
    expect(getInjectData).toHaveProperty('textInj');
  });

  it('should throw MissingInjectTokenException because the provider does not exist', () => {
    expect(() => injector.getInjectData(Controller2)).toThrow(
      MissingInjectTokenException,
    );
  });

  it('Should respond an object type asClass with paramters to inject', () => {
    const getInject = injector.getInjectorClass(Service1);
    expect(getInject).toHaveProperty('lifetime');
    expect(getInject).toHaveProperty('inject');
    expect(getInject).toHaveProperty('injector');
  });

  it('Should respond an object type asClass without injector', () => {
    const getInject = injector.getInjectorClass(Controller3);
    expect(getInject).not.toHaveProperty('injector');
  });

  it('Should respond an object type asClass without injector', () => {
    const allProvider = injector.getAllProvider();
    expect(allProvider.has('TEXT_INJECT')).toBe(true);
  });

  it('Should respond an number type asFunction without injector', () => {
    const injectorWithFactory = new Injector(
      ModuleFactory,
      listProvider,
      listProviderClass,
    );
    injectorWithFactory.scanProviders();
    const allProvider = injectorWithFactory.getAllProvider();
    expect(allProvider.has('NUMBER_FACTORY')).toBe(true);
  });
  it('Should respond only one supplier because the others are not valid.', () => {
    const injectorWithFactory = new Injector(
      ModuleProviderError,
      listProvider,
      listProviderClass,
    );
    injectorWithFactory.scanProviders();
    const allProviderClass = injectorWithFactory['listProvidersClass'];
    expect(allProviderClass.size).toBe(1);
  });
});
