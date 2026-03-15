import 'reflect-metadata';
import { describe, it, expect } from "vitest";
import { DEPENDENCIES_CLASS } from '../../utils/constants';
import {
  ControllerMix,
  ControllerOnly,
  ControllerWithMethod,
  ControllerWithParameter,
  ControllerWithService,
  ControllerWithoutArg,
} from '../mocks/controllers.mock';

describe('Commons - Decorators - controller', () => {
  it("should return empty array of dependencies when controller has no constructor", () => {
    const dependenciesClass = Reflect.getMetadata(
      DEPENDENCIES_CLASS,
      ControllerOnly,
    );
    expect(dependenciesClass).toBeInstanceOf(Array);
    expect(dependenciesClass).toHaveLength(0);
  });
  it("should return empty array when controller has empty constructor", () => {
    const dependenciesClass = Reflect.getMetadata(
      DEPENDENCIES_CLASS,
      ControllerWithoutArg,
    );
    expect(dependenciesClass).toBeInstanceOf(Array);
    expect(dependenciesClass).toHaveLength(0);
  });
  it("should return empty array when controller has only methods", () => {
    const dependenciesClass = Reflect.getMetadata(
      DEPENDENCIES_CLASS,
      ControllerWithMethod,
    );
    expect(dependenciesClass).toBeInstanceOf(Array);
    expect(dependenciesClass).toHaveLength(0);
  });
  it("should return dependencies when controller injects a service", () => {
    const dependenciesClass = Reflect.getMetadata(
      DEPENDENCIES_CLASS,
      ControllerWithService,
    );
    console.log("dependenciesClass[0]", dependenciesClass[0]);
    expect(dependenciesClass).toBeInstanceOf(Array);
    expect(dependenciesClass).not.toHaveLength(0);
    expect(dependenciesClass[0]).toMatchObject({ type: "Controller" });
    expect(dependenciesClass[0]).toMatchObject({ nameClass: "ServiceOnly" });
    expect(dependenciesClass[0]).toMatchObject({
      nameClassContainer: "serviceOnly",
    });
    expect(dependenciesClass[0]).toMatchObject({
      nameParameter: "serviceOnly",
    });
    expect(dependenciesClass.length).toEqual(1);
  });
  it("should return dependencies when controller injects a primitive parameter", () => {
    const dependenciesClass = Reflect.getMetadata(
      DEPENDENCIES_CLASS,
      ControllerWithParameter,
    );
    expect(dependenciesClass).toBeInstanceOf(Array);
    expect(dependenciesClass).not.toHaveLength(0);
    expect(dependenciesClass[0]).toMatchObject({ type: "Controller" });
    expect(dependenciesClass[0]).toMatchObject({ nameClass: "String" });
    expect(dependenciesClass[0]).toMatchObject({
      nameClassContainer: "string",
    });
    expect(dependenciesClass[0]).toMatchObject({ nameParameter: "userName" });
    expect(dependenciesClass.length).toEqual(1);
  });
  it("should return dependencies when controller mixes services and @Inject parameters", () => {
    const dependenciesClass = Reflect.getMetadata(
      DEPENDENCIES_CLASS,
      ControllerMix,
    );
    expect(dependenciesClass).toBeInstanceOf(Array);
    expect(dependenciesClass).not.toHaveLength(0);
    expect(dependenciesClass[1]).toMatchObject({ type: "Controller" });
    expect(dependenciesClass[1]).toMatchObject({ nameClass: "String" });
    expect(dependenciesClass[1]).toMatchObject({
      nameClassContainer: "string",
    });
    expect(dependenciesClass[1]).toMatchObject({ nameParameter: "apiKey" });
    expect(dependenciesClass.length).toEqual(3);
  });
});
