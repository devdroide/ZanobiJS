import { expect } from 'chai';
import { Injector } from '../../injector';
import { Module1 } from './mocks/classModuleToInject';
import {
  Controller1,
  Controller2,
  Controller3,
  Service1,
} from './mocks/classDependenciesToInject';

describe('Core - Injector - injector', () => {
  const listProvider = new Map();
  const injector = new Injector(Module1, listProvider);

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
  it('Should be get a function as a provider', () => {
    function getTrue() {
      return true;
    }
    const getProvider = injector.getInjectProvider({
      key: 'getTrueFunction',
      value: getTrue,
    });
    expect(getProvider).to.have.property('resolve');
  });
  it('Should be set a object as a provider', () => {
    const getProvider = injector.getInjectProvider({
      key: 'getTrue',
      value: 'true',
    });
    expect(getProvider).to.have.property('resolve');
  });

  it('should return the function that returns the given injection data', () => {
    const injectData = {
      Some: 'some some',
    };
    const resultFunction = injector.funtionInjectData(injectData);
    expect(resultFunction()).to.be.equal(injectData);
  });
});
