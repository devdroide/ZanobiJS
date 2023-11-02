import { expect } from "chai";
import {
  isArray,
  isClass,
  isEmpty,
  isFunction,
  isMap,
  isNull,
  isObject,
  isUndefined,
} from "../../src/utils/shared.utils";

describe("Commons - Utils - shared utils", () => {
  it("should respond is function", () => {
    const myFunction = function () {};
    expect(isFunction(myFunction)).to.be.true;
  });
  it("should respond is class", () => {
    class AnService {}
    expect(isClass(AnService)).to.be.true;
  });
  it("should respond is object", () => {
    const myObject = {};
    expect(isObject(myObject)).to.be.true;
  });
  it("should respond is array", () => {
    const myArray = [];
    expect(isArray(myArray)).to.be.true;
  });
  it("should respond is map", () => {
    const myMap = new Map();
    expect(isMap(myMap)).to.be.true;
  });
  it("should respond is null", () => {
    expect(isNull(null)).to.be.true;
  });
  it("should respond is undefined", () => {
    expect(isUndefined(undefined)).to.be.true;
  });
  it("should return true for empty objects", () => {
    expect(isEmpty({})).to.be.true;
  });
  it("should return false for non-empty objects", () => {
    expect(isEmpty({ a: 1 })).to.be.false;
    expect(isEmpty({ a: 1, b: 2 })).to.be.false;
  });
  it("should return true for empty arrays", () => {
    expect(isEmpty([])).to.be.true;
  });
  it("should return false for non-empty arrays", () => {
    expect(isEmpty([1, 2, 3])).to.be.false;
    expect(isEmpty(["a"])).to.be.false;
  });
});
