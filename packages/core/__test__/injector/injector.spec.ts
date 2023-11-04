import { expect } from "chai";
import { Injector } from "../../src/injector";
import { ModuleTestWithInjector } from "../mocks/classModule.mock";
import { ControllerWithDepen2 } from "../mocks/classWithDependeciesInject.mock";
import { ControllerWithDepenClass } from "../mocks/classWithDependeciesClass.mock";

describe("Core - Injector - injector", () => {
  const injector = new Injector(ModuleTestWithInjector);
  beforeEach(() => {
    process.env.ZANOBI_DEBUG = "false";
  });

  it("Should respond an object with paramters to inject", () => {
    const getInjectData = injector.getInjectData(ControllerWithDepenClass);
    expect(getInjectData).to.is.empty;
  });
  it("Should respond an object without paramters to inject", () => {
    const getInjectData = injector.getInjectData(ControllerWithDepen2);
    expect(getInjectData).to.have.property("apiKey");
  });
  it("Should respond an object type asClass with paramters to inject", () => {
    const getInject = injector.getInjector(ControllerWithDepen2);
    expect(getInject).to.have.property("lifetime");
    expect(getInject).to.have.property("inject");
    expect(getInject).to.have.property("injector");
  });
  it("Should respond an object type asClass without injector", () => {
    const getInject = injector.getInjector(ControllerWithDepenClass);
    expect(getInject).to.not.have.property("injector");
  });
  // it("", () => {});
});
