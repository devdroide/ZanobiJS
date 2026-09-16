import { describe, expect, it } from 'vitest';
import {
  RuntimeException,
  InvalidModuleSchemaException,
} from '../../exceptions';

describe('Commons - Exception - module', () => {
  it('should respond RuntimeException empty paramters', () => {
    try {
      throw new RuntimeException();
    } catch (error) {
      expect(error.message).toBe('');
      expect(error.detail).toBe('');
    }
  });
  it('should respond RuntimeException ', () => {
    try {
      throw new RuntimeException('Message to error', 'Detail error');
    } catch (error) {
      expect(error.message).toBe('Message to error');
      expect(error.detail).toBe('Detail error');
    }
  });
  it('should respond an object to whaHappened RuntimeException ', () => {
    const exception = new RuntimeException('Message to error', 'Detail error');
    const contentError = exception.whatHappened();
    expect(contentError.message).toBe('Message to error');
    expect(contentError.detail).toBe('Detail error');
  });
  it('should respond InvalidModuleSchemaException ', () => {
    try {
      throw new InvalidModuleSchemaException('Detail error');
    } catch (error) {
      expect(error.message).toBe(
        'An error has occurred in @Module(), please check the detail field',
      );
      expect(error.detail).toBe('Detail error');
    }
  });
});
