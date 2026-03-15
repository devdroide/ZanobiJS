import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  isArray,
  isClass,
  isEmpty,
  isFunction,
  isMap,
  isNull,
  isObject,
  isUndefined,
} from "../../utils/shared.utils";

describe("Commons - Utils - shared utils", () => {
  it("should respond is function", () => {
    const myFunction = function () {};
    expect(isFunction(myFunction)).toBeTruthy();
  });
  it("should respond is class", () => {
    class AnService {}
    expect(isClass(AnService)).toBeTruthy();
  });
  it("should respond is object", () => {
    const myObject = {};
    expect(isObject(myObject)).toBeTruthy();
  });
  it("should respond is array", () => {
    const myArray = [];
    expect(isArray(myArray)).toBeTruthy();
  });
  it("should respond is map", () => {
    const myMap = new Map();
    expect(isMap(myMap)).toBeTruthy();
  });
  it("should respond is null", () => {
    expect(isNull(null)).toBeTruthy();
  });
  it("should respond is undefined", () => {
    expect(isUndefined(undefined)).toBeTruthy();
  });
  it("should return true for empty objects", () => {
    expect(isEmpty({})).toBeTruthy();
  });
  it("should return false for non-empty objects", () => {
    expect(isEmpty({ a: 1 })).toBeFalsy();
    expect(isEmpty({ a: 1, b: 2 })).toBeFalsy();
  });
  it("should return true for empty arrays", () => {
    expect(isEmpty([])).toBeTruthy();
  });
  it("should return false for non-empty arrays", () => {
    expect(isEmpty([1, 2, 3])).toBeFalsy();
    expect(isEmpty(["a"])).toBeFalsy();
  });
  it("should return false for non-empty arrays", () => {
    const myFunction = function () {};
    expect(isEmpty(myFunction)).toBeFalsy();
  });
});
