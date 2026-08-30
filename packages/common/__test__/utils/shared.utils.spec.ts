import { describe, expect, it } from 'vitest';
import {
  getConstructorParamNames,
  isArray,
  isClass,
  isEmpty,
  isFunction,
  isMap,
  isNull,
  isObject,
  isUndefined,
} from '../../utils/shared.utils';

describe('Commons - Utils - shared utils', () => {
  it('should respond is function', () => {
    const myFunction = function () {};
    expect(isFunction(myFunction)).toBe(true);
  });
  it('should respond is class', () => {
    class AnService {}
    expect(isClass(AnService)).toBe(true);
  });
  it('should respond is object', () => {
    const myObject = {};
    expect(isObject(myObject)).toBe(true);
  });
  it('should respond is array', () => {
    const myArray = [];
    expect(isArray(myArray)).toBe(true);
  });
  it('should respond is map', () => {
    const myMap = new Map();
    expect(isMap(myMap)).toBe(true);
  });
  it('should respond is null', () => {
    expect(isNull(null)).toBe(true);
  });
  it('should respond is undefined', () => {
    expect(isUndefined(undefined)).toBe(true);
  });
  it('should return true for empty objects', () => {
    expect(isEmpty({})).toBe(true);
  });
  it('should return false for non-empty objects', () => {
    expect(isEmpty({ a: 1 })).toBe(false);
    expect(isEmpty({ a: 1, b: 2 })).toBe(false);
  });
  it('should return true for empty arrays', () => {
    expect(isEmpty([])).toBe(true);
  });
  it('should return false for non-empty arrays', () => {
    expect(isEmpty([1, 2, 3])).toBe(false);
    expect(isEmpty(['a'])).toBe(false);
  });
  it('should return false for non-empty arrays', () => {
    const myFunction = function () {};
    expect(isEmpty(myFunction)).toBe(false);
  });

  describe('getConstructorParamNames', () => {
    it('should return the constructor parameter names', () => {
      class WithParams {
        constructor(
          private userRepo: string,
          private logger: number,
        ) {}
      }
      expect(getConstructorParamNames(WithParams)).toEqual([
        'userRepo',
        'logger',
      ]);
    });
    it('should strip type annotations and default values', () => {
      class WithAnnotations {
        constructor(
          private a: string = 'x',
          private b,
        ) {}
      }
      expect(getConstructorParamNames(WithAnnotations)).toEqual(['a', 'b']);
    });
    it('should return an empty array for a class without a constructor', () => {
      class NoConstructor {}
      expect(getConstructorParamNames(NoConstructor)).toEqual([]);
    });
    it('should return an empty array for a constructor without parameters', () => {
      class EmptyConstructor {
        constructor() {}
      }
      expect(getConstructorParamNames(EmptyConstructor)).toEqual([]);
    });
    it('should cache the result and return the same array reference on a second call', () => {
      class CachedClass {
        constructor(private dep: string) {}
      }
      const first = getConstructorParamNames(CachedClass);
      const second = getConstructorParamNames(CachedClass);
      expect(second).toBe(first);
    });
    it('should cache different functions independently', () => {
      class ClassA {
        constructor(private a: string) {}
      }
      class ClassB {
        constructor(
          private b: string,
          private c: string,
        ) {}
      }
      expect(getConstructorParamNames(ClassA)).toEqual(['a']);
      expect(getConstructorParamNames(ClassB)).toEqual(['b', 'c']);
      expect(getConstructorParamNames(ClassA)).toEqual(['a']);
    });
  });
});
