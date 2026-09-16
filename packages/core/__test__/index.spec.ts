import { describe, expect, it } from 'vitest';
import * as ZanobiCore from '../index';

describe('Core - index - public exceptions barrel', () => {
  it('should expose ContainerResolutionException', () => {
    expect(ZanobiCore.ContainerResolutionException).toBeDefined();
  });

  it('should expose ContainerResolutionEntityException', () => {
    expect(ZanobiCore.ContainerResolutionEntityException).toBeDefined();
  });

  it('should expose InvalidProviderModuleException', () => {
    expect(ZanobiCore.InvalidProviderModuleException).toBeDefined();
  });

  it('should expose MissingInjectTokenException', () => {
    expect(ZanobiCore.MissingInjectTokenException).toBeDefined();
  });

  it('should expose CircularModuleImportException', () => {
    expect(ZanobiCore.CircularModuleImportException).toBeDefined();
  });
});
