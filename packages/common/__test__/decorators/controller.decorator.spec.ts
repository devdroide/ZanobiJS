import 'reflect-metadata';
import { describe, expect, it } from 'vitest';
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
  it('should respond an empty array of dependencies', () => {
    const dependenciesClass = Reflect.getMetadata(
      DEPENDENCIES_CLASS,
      ControllerOnly,
    );
    expect(dependenciesClass).toBeInstanceOf(Array);
    expect(dependenciesClass).toHaveLength(0);
  });
  it('should respond an empty array of dependencies', () => {
    const dependenciesClass = Reflect.getMetadata(
      DEPENDENCIES_CLASS,
      ControllerWithoutArg,
    );
    expect(dependenciesClass).toBeInstanceOf(Array);
    expect(dependenciesClass).toHaveLength(0);
  });
  it('should respond an empty array of dependencies', () => {
    const dependenciesClass = Reflect.getMetadata(
      DEPENDENCIES_CLASS,
      ControllerWithMethod,
    );
    expect(dependenciesClass).toBeInstanceOf(Array);
    expect(dependenciesClass).toHaveLength(0);
  });
  it('should respond an array with dependecies as service', () => {
    const dependenciesClass = Reflect.getMetadata(
      DEPENDENCIES_CLASS,
      ControllerWithService,
    );
    expect(dependenciesClass).toBeInstanceOf(Array);
    expect(dependenciesClass).not.toHaveLength(0);
    expect(dependenciesClass[0]).toMatchObject({ type: 'Controller' });
    expect(dependenciesClass[0]).toMatchObject({ nameClass: 'ServiceOnly' });
    expect(dependenciesClass[0]).toMatchObject({
      nameClassContainer: 'serviceOnly',
    });
    expect(dependenciesClass[0]).toMatchObject({
      nameParameter: 'serviceOnly',
    });
    expect(dependenciesClass.length).toBe(1);
  });
  it('should respond an array with dependecies as paramter', () => {
    const dependenciesClass = Reflect.getMetadata(
      DEPENDENCIES_CLASS,
      ControllerWithParameter,
    );
    expect(dependenciesClass).toBeInstanceOf(Array);
    expect(dependenciesClass).not.toHaveLength(0);
    expect(dependenciesClass[0]).toMatchObject({ type: 'Controller' });
    expect(dependenciesClass[0]).toMatchObject({ nameClass: 'String' });
    expect(dependenciesClass[0]).toMatchObject({
      nameClassContainer: 'string',
    });
    expect(dependenciesClass[0]).toMatchObject({ nameParameter: 'userName' });
    expect(dependenciesClass.length).toBe(1);
  });
  it('should respond an array with dependecies and additional @Inject', () => {
    const dependenciesClass = Reflect.getMetadata(
      DEPENDENCIES_CLASS,
      ControllerMix,
    );
    expect(dependenciesClass).toBeInstanceOf(Array);
    expect(dependenciesClass).not.toHaveLength(0);
    expect(dependenciesClass[1]).toMatchObject({ type: 'Controller' });
    expect(dependenciesClass[1]).toMatchObject({ nameClass: 'String' });
    expect(dependenciesClass[1]).toMatchObject({
      nameClassContainer: 'string',
    });
    expect(dependenciesClass[1]).toMatchObject({ nameParameter: 'apiKey' });
    expect(dependenciesClass.length).toBe(3);
  });
});
