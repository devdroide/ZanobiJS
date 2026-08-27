import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LoggerService } from '../../services/logger.service';
import { ILoggerService } from '../../interfaces';

describe('Commons - Services - Logger', () => {
  describe('No print', () => {
    let logger: ILoggerService;
    let successSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      process.env.ZANOBIJS_LOGGER = 'false';
    });
    afterEach(() => {
      successSpy.mockRestore();
    });
    it('should respond true to the logger success call', () => {
      LoggerService['instance'] = null;
      logger = LoggerService.getInstance({ withColor: false });
      successSpy = vi.spyOn(logger, 'success');
      logger.success('Logger user success');
      expect(successSpy).toHaveBeenCalledOnce();
    });
  });
  describe('Options dafault', () => {
    let logger: ILoggerService;
    let successSpy: ReturnType<typeof vi.spyOn>;
    let warnSpy: ReturnType<typeof vi.spyOn>;
    let errorSpy: ReturnType<typeof vi.spyOn>;
    let infoSpy: ReturnType<typeof vi.spyOn>;
    let debugSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      process.env.ZANOBIJS_LOGGER = 'true';
      LoggerService['instance'] = null;
      logger = LoggerService.getInstance();
      successSpy = vi.spyOn(logger, 'success');
      warnSpy = vi.spyOn(logger, 'warn');
      errorSpy = vi.spyOn(logger, 'error');
      infoSpy = vi.spyOn(logger, 'info');
      debugSpy = vi.spyOn(logger, 'debug');
    });
    afterEach(() => {
      successSpy.mockRestore();
      warnSpy.mockRestore();
      errorSpy.mockRestore();
      infoSpy.mockRestore();
      debugSpy.mockRestore();
    });
    it('should respond true to the logger success call', () => {
      logger.success('Logger success');
      expect(successSpy).toHaveBeenCalledOnce();
    });
    it('should respond true to the logger warn call', () => {
      logger.warn('Logger warn');
      expect(warnSpy).toHaveBeenCalledOnce();
    });
    it('should respond true to the logger error call', () => {
      logger.error('Logger error');
      expect(errorSpy).toHaveBeenCalledOnce();
    });
    it('should respond true to the logger info call', () => {
      logger.info('Logger info');
      expect(infoSpy).toHaveBeenCalledOnce();
    });
    it('should respond true to the logger debug call', () => {
      logger.debug('Logger debug', ['a', 'b']);
      expect(debugSpy).toHaveBeenCalledOnce();
    });
  });
  describe('Options with color', () => {
    let logger: ILoggerService;
    let successSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      process.env.ZANOBIJS_LOGGER = 'true';
    });
    afterEach(() => {
      successSpy.mockRestore();
    });
    it('should respond true to the logger success call', () => {
      LoggerService['instance'] = null;
      logger = LoggerService.getInstance({ withColor: false });
      successSpy = vi.spyOn(logger, 'success');
      logger.success('Logger user success');
      expect(successSpy).toHaveBeenCalledOnce();
    });
  });
});
