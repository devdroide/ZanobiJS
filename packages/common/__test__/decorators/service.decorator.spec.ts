import { describe, it, expect } from "vitest";
import { DEPENDENCIES_CLASS } from "../../utils/constants";
import {
  ServiceMix,
  ServiceOnly,
  ServiceWithParameter,
  ServiceWithService,
} from "../mocks/services.mock";
describe("Commons - Decorator - service", () => {
  it("should return empty dependencies when services has no constructor", () => {
    const dependenciesClass = Reflect.getMetadata(
      DEPENDENCIES_CLASS,
      ServiceOnly,
    );
    expect(dependenciesClass).toBeInstanceOf(Array);
    expect(dependenciesClass).toHaveLength(0);
  });
  it("should return dependencies when service injects a service", () => {
    const dependenciesClass = Reflect.getMetadata(
      DEPENDENCIES_CLASS,
      ServiceWithService,
    );
    expect(dependenciesClass).toBeInstanceOf(Array);
    expect(dependenciesClass).not.toHaveLength(0);
    expect(dependenciesClass[0]).toMatchObject({ type: "Service" });
    expect(dependenciesClass[0]).toMatchObject({ nameClass: "ServiceOnly" });
    expect(dependenciesClass[0]).toMatchObject({
      nameClassContainer: "serviceOnly",
    });
    expect(dependenciesClass[0]).toMatchObject({ nameParameter: "serviceOnly" });
    expect(dependenciesClass.length).toEqual(1);
  });
  it("should return dependencies when service injects a primitive parameter", () => {
    const dependenciesClass = Reflect.getMetadata(
      DEPENDENCIES_CLASS,
      ServiceWithParameter,
    );
    expect(dependenciesClass).toBeInstanceOf(Array);
    expect(dependenciesClass).not.toHaveLength(0);
    expect(dependenciesClass[0]).toMatchObject({ type: "Service" });
    expect(dependenciesClass[0]).toMatchObject({ nameClass: "String" });
    expect(dependenciesClass[0]).toMatchObject({
      nameClassContainer: "string",
    });
    expect(dependenciesClass[0]).toMatchObject({ nameParameter: "userName" });
    expect(dependenciesClass.length).toEqual(1);
  });
  it("should return dependencies when service mixes services and @Inject parameters", () => {
    const dependenciesClass = Reflect.getMetadata(
      DEPENDENCIES_CLASS,
      ServiceMix,
    );
    expect(dependenciesClass).toBeInstanceOf(Array);
    expect(dependenciesClass).not.toHaveLength(0);
    expect(dependenciesClass[1]).toMatchObject({ type: "Service" });
    expect(dependenciesClass[1]).toMatchObject({ nameClass: "String" });
    expect(dependenciesClass[1]).toMatchObject({
      nameClassContainer: "string",
    });
    expect(dependenciesClass[1]).toMatchObject({ nameParameter: "apiKey" });
    expect(dependenciesClass.length).toEqual(3);
  });
});
