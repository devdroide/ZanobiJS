import { expect } from "chai";
import { DEPENDENCIES_INJECT, HAS_INJECT } from "../../utils/constants";
import { ControllerOnly, ControllerWithInject } from "../mocks/controllers.mock";

describe("Commons - Decorators - Inject", () => {
  it("should respond an undefined of dependencies inject", () => {
    const dependenciesInject = Reflect.getMetadata(
      DEPENDENCIES_INJECT,
      ControllerOnly,
    );
    expect(dependenciesInject).to.be.undefined;
  });
  it("should respond an true by has inject", () => {
    const hasInject = Reflect.getMetadata(HAS_INJECT, ControllerOnly);
    expect(hasInject).to.be.undefined;
  });
  it("should respond an map of dependencies", () => {
    const dependenciesInject = Reflect.getMetadata(
      DEPENDENCIES_INJECT,
      ControllerWithInject,
    );
    expect(dependenciesInject).to.be.an("Map");
    expect(dependenciesInject.has("API_KEY")).to.be.true;
  });
  it("should respond an true by has inject", () => {
    const hasInject = Reflect.getMetadata(
      HAS_INJECT,
      ControllerWithInject,
    );
    expect(hasInject).to.be.an("Boolean");
    expect(hasInject).to.be.true;
  });
});
