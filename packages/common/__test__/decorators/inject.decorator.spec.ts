import { describe, it, expect } from "vitest";
import { DEPENDENCIES_INJECT, HAS_INJECT } from "../../utils/constants";
import {
  ControllerOnly,
  ControllerWithInject,
} from "../mocks/controllers.mock";

describe("Commons - Decorators - Inject", () => {
  it("should respond an undefined of dependencies inject", () => {
    const dependenciesInject = Reflect.getMetadata(
      DEPENDENCIES_INJECT,
      ControllerOnly,
    );
    expect(dependenciesInject).toBeUndefined();
  });
  it("should respond an true by has inject", () => {
    const hasInject = Reflect.getMetadata(HAS_INJECT, ControllerOnly);
    expect(hasInject).toBeUndefined();
  });
  it("should respond an map of dependencies", () => {
    const dependenciesInject = Reflect.getMetadata(
      DEPENDENCIES_INJECT,
      ControllerWithInject,
    );
    expect(dependenciesInject).toBeInstanceOf(Map);
    expect(dependenciesInject.has("API_KEY")).toBeTruthy();
  });
  it("should respond an true by has inject", () => {
    const hasInject = Reflect.getMetadata(HAS_INJECT, ControllerWithInject);
    expect(hasInject).toBeTypeOf("boolean");
    expect(hasInject).toBeTruthy();
  });
});
