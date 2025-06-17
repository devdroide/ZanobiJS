import { expect } from 'chai';
import { Injector } from '../../injector';
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
  after(() => {
    injector = null;
  });
  it('Should respond an object without paramters to inject', () => {
    const getInjectData = injector.getInjectData(Controller1);
    expect(getInjectData).to.is.empty;
  });
  it('Should respond an object with property textInj to inject of Service1 ', () => {
    const getInjectData = injector.getInjectData(Service1);
    expect(getInjectData).to.have.property('textInj');
  });

  it('Should respond an object empty because the provider does not exist', () => {
    const getInjectData = injector.getInjectData(Controller2);
    expect(getInjectData).to.is.empty;
  });

  it('Should respond an object type asClass with paramters to inject', () => {
    const getInject = injector.getInjectorClass(Service1);
    expect(getInject).to.have.property('lifetime');
    expect(getInject).to.have.property('inject');
    expect(getInject).to.have.property('injector');
  });

  it('Should respond an object type asClass without injector', () => {
    const getInject = injector.getInjectorClass(Controller3);
    expect(getInject).to.not.have.property('injector');
  });

  it('Should respond an object type asClass without injector', () => {
    const allProvider = injector.getAllProvider();
    expect(allProvider.has('TEXT_INJECT')).to.be.equal(true);
  });

  it('Should respond an number type asFunction without injector', () => {
    const injectorWithFactory = new Injector(
      ModuleFactory,
      listProvider,
      listProviderClass,
    );
    injectorWithFactory.scanProviders();
    const allProvider = injectorWithFactory.getAllProvider();
    expect(allProvider.has('NUMBER_FACTORY')).to.be.equal(true);
  });
  it('Should respond only one supplier because the others are not valid.', () => {
    const injectorWithFactory = new Injector(
      ModuleProviderError,
      listProvider,
      listProviderClass,
    );
    injectorWithFactory.scanProviders();
    const allProviderClass = injectorWithFactory['listProvidersClass'];
    expect(allProviderClass.size).to.be.equal(1);
  });
});
