import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LoggerUserService } from '../../services/logger.user.service';
import { ILoggerUserService } from '../../interfaces';
import { dataMock, schemaMock } from '../mocks/providerPattern.mock';
import { ProviderPatternService } from '../../services/masker/process/providerPattern.service';
import { ProcessDataService } from '../../services/masker/process/processData.service';

describe('Commons - Services - Logger User', () => {
  describe('No print', () => {
    let loggerUser: ILoggerUserService;
    let successSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      process.env.ZANOBIJS_LOGGER_USER = 'false';
    });
    afterEach(() => {
      successSpy.mockRestore();
    });
    it('should respond true to the logger success call', () => {
      LoggerUserService['instance'] = null;
      loggerUser = LoggerUserService.getInstance({ withColor: false });
      successSpy = vi.spyOn(loggerUser, 'success');
      loggerUser.success('Logger user success');
      expect(successSpy).toHaveBeenCalledOnce();
    });
  });
  describe('Options default', () => {
    let logger: ILoggerUserService;
    let successSpy: ReturnType<typeof vi.spyOn>;
    let warnSpy: ReturnType<typeof vi.spyOn>;
    let errorSpy: ReturnType<typeof vi.spyOn>;
    let infoSpy: ReturnType<typeof vi.spyOn>;
    let debugSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      process.env.ZANOBIJS_LOGGER_USER = 'true';
      LoggerUserService['instance'] = null;
      logger = LoggerUserService.getInstance();
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
      logger.success('Logger user success');
      expect(successSpy).toHaveBeenCalledOnce();
    });
    it('should respond true to the logger warn call', () => {
      logger.warn('Logger user warn');
      expect(warnSpy).toHaveBeenCalledOnce();
    });
    it('should respond true to the logger error call', () => {
      logger.error('Logger user error');
      expect(errorSpy).toHaveBeenCalledOnce();
    });
    it('should respond true to the logger info call', () => {
      logger.info('Logger user info');
      expect(infoSpy).toHaveBeenCalledOnce();
    });
    it('should respond true to the logger debug call', () => {
      logger.debug('Logger user debug', ['a', 'b']);
      expect(debugSpy).toHaveBeenCalledOnce();
    });
  });
  describe('Options with color', () => {
    let loggerUser: ILoggerUserService;
    let successSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      process.env.ZANOBIJS_LOGGER_USER = 'true';
    });
    afterEach(() => {
      successSpy.mockRestore();
    });
    it('should respond true to the logger success call', () => {
      LoggerUserService['instance'] = null;
      loggerUser = LoggerUserService.getInstance({ withColor: false });
      successSpy = vi.spyOn(loggerUser, 'success');
      loggerUser.success('Logger user success');
      expect(successSpy).toHaveBeenCalledOnce();
    });
  });
  describe('Options with masker active', () => {
    let loggerUser: ILoggerUserService;
    let successSpy: ReturnType<typeof vi.spyOn>;
    let importantSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      process.env.ZANOBIJS_LOGGER_USER = 'true';
      LoggerUserService['instance'] = null;
      loggerUser = LoggerUserService.getInstance({
        withColor: false,
        activeMasker: true,
      });
    });
    afterEach(() => {
      successSpy.mockRestore();
      // importantSpy.mockRestore();
    });
    it('should print an title with the masked token', () => {
      successSpy = vi.spyOn(loggerUser, 'success');
      loggerUser.success('This is a token: Bearer qwqwyq34u433499ffd9f8d');
      expect(successSpy).toHaveBeenCalledOnce();
    });
    it('should print a message with the masked token', () => {
      loggerUser = LoggerUserService.getInstance({
        withColor: false,
        activeMasker: true,
      });
      importantSpy = vi.spyOn(loggerUser, 'important');
      loggerUser.important('This is a token:', 'Bearer qwqwyq34u433499ffd9f8d');
      expect(importantSpy).toHaveBeenCalledOnce();
    });
    it('should print a message and title masked', () => {
      successSpy = vi.spyOn(loggerUser, 'success');
      loggerUser.success(
        'This is a email devdroide@example.com and token:',
        'Bearer qwqwyq34u433499ffd9f8d',
      );
      expect(successSpy).toHaveBeenCalledOnce();
    });
  });
  describe('Options with masker active and schema', () => {
    let loggerUser: ILoggerUserService;
    let successSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      process.env.ZANOBIJS_LOGGER_USER = 'true';
      ProviderPatternService['instance'] = null;
      ProcessDataService['instance'] = null;
      LoggerUserService['instance'] = null;
      loggerUser = LoggerUserService.getInstance({
        withColor: false,
        activeMasker: true,
        configSchemaMasker: schemaMock,
      });
    });
    afterEach(() => {
      successSpy.mockRestore();
    });
    it('should print a title with the masked token [scheme selected]', () => {
      successSpy = vi.spyOn(loggerUser, 'success');
      loggerUser
        .masker('requestSchema')
        .success('This is a token: Bearer qwqwyq34u433499ffd9f8d');
      expect(successSpy).toHaveBeenCalledOnce();
    });
    it('It should print the masked properties according to the selected scheme', () => {
      successSpy = vi.spyOn(loggerUser, 'success');
      loggerUser.masker('requestSchema').success('print id:', dataMock);
      expect(successSpy).toHaveBeenCalledOnce();
    });
  });
});
