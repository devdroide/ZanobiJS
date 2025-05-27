import { expect } from 'chai';
import * as sinon from 'sinon';
import { LoggerUserService } from '../../services/logger.user.service';
import { ILoggerUserService } from '../../interfaces';
import { dataMock, schemaMock } from '../mocks/providerPattern.mock';
import { ProviderPatternService } from '../../services/masker/process/providerPattern.service';
import { ProcessDataService } from '../../services/masker/process/processData.service';

describe('Commons - Services - Logger User', () => {
  describe('No print', () => {
    let loggerUser: ILoggerUserService;
    let successSpy: sinon.SinonSpy;

    beforeEach(() => {
      process.env.ZANOBIJS_LOGGER_USER = 'false';
    });
    afterEach(() => {
      successSpy.restore();
    });
    it('should respond true to the logger success call', () => {
      LoggerUserService['instance'] = null;
      loggerUser = LoggerUserService.getInstance({ withColor: false });
      successSpy = sinon.spy(loggerUser, 'success');
      loggerUser.success('Logger user success');
      expect(successSpy.calledOnce).to.be.true;
    });
  });
  describe('Options default', () => {
    let logger: ILoggerUserService;
    let successSpy: sinon.SinonSpy;
    let warnSpy: sinon.SinonSpy;
    let errorSpy: sinon.SinonSpy;
    let infoSpy: sinon.SinonSpy;
    let debugSpy: sinon.SinonSpy;

    beforeEach(() => {
      process.env.ZANOBIJS_LOGGER_USER = 'true';
      LoggerUserService['instance'] = null;
      logger = LoggerUserService.getInstance();
      successSpy = sinon.spy(logger, 'success');
      warnSpy = sinon.spy(logger, 'warn');
      errorSpy = sinon.spy(logger, 'error');
      infoSpy = sinon.spy(logger, 'info');
      debugSpy = sinon.spy(logger, 'debug');
    });
    afterEach(() => {
      successSpy.restore();
      warnSpy.restore();
      errorSpy.restore();
      infoSpy.restore();
      debugSpy.restore();
    });
    it('should respond true to the logger success call', () => {
      logger.success('Logger user success');
      expect(successSpy.calledOnce).to.be.true;
    });
    it('should respond true to the logger warn call', () => {
      logger.warn('Logger user warn');
      expect(warnSpy.calledOnce).to.be.true;
    });
    it('should respond true to the logger error call', () => {
      logger.error('Logger user error');
      expect(errorSpy.calledOnce).to.be.true;
    });
    it('should respond true to the logger info call', () => {
      logger.info('Logger user info');
      expect(infoSpy.calledOnce).to.be.true;
    });
    it('should respond true to the logger debug call', () => {
      logger.debug('Logger user debug', ['a', 'b']);
      expect(debugSpy.calledOnce).to.be.true;
    });
  });
  describe('Options with color', () => {
    let loggerUser: ILoggerUserService;
    let successSpy: sinon.SinonSpy;

    beforeEach(() => {
      process.env.ZANOBIJS_LOGGER_USER = 'true';
    });
    afterEach(() => {
      successSpy.restore();
    });
    it('should respond true to the logger success call', () => {
      LoggerUserService['instance'] = null;
      loggerUser = LoggerUserService.getInstance({ withColor: false });
      successSpy = sinon.spy(loggerUser, 'success');
      loggerUser.success('Logger user success');
      expect(successSpy.calledOnce).to.be.true;
    });
  });
  describe('Options with masker active', () => {
    let loggerUser: ILoggerUserService;
    let successSpy: sinon.SinonSpy;
    let importantSpy: sinon.SinonSpy;

    beforeEach(() => {
      process.env.ZANOBIJS_LOGGER_USER = 'true';
      LoggerUserService['instance'] = null;
      loggerUser = LoggerUserService.getInstance({
        withColor: false,
        activeMasker: true,
      });
    });
    afterEach(() => {
      successSpy.restore();
      // importantSpy.restore();
    });
    it('should print an title with the masked token', () => {
      successSpy = sinon.spy(loggerUser, 'success');
      loggerUser.success('This is a token: Bearer qwqwyq34u433499ffd9f8d');
      expect(successSpy.calledOnce).to.be.true;
    });
    it('should print a message with the masked token', () => {
      loggerUser = LoggerUserService.getInstance({
        withColor: false,
        activeMasker: true,
      });
      importantSpy = sinon.spy(loggerUser, 'important');
      loggerUser.important('This is a token:', 'Bearer qwqwyq34u433499ffd9f8d');
      expect(importantSpy.calledOnce).to.be.true;
    });
    it('should print a message and title masked', () => {
      successSpy = sinon.spy(loggerUser, 'success');
      loggerUser.success(
        'This is a email devdroide@example.com and token:',
        'Bearer qwqwyq34u433499ffd9f8d',
      );
      expect(successSpy.calledOnce).to.be.true;
    });
  });
  describe('Options with masker active and schema', () => {
    let loggerUser: ILoggerUserService;
    let successSpy: sinon.SinonSpy;

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
      successSpy.restore();
    });
    it('should print a title with the masked token [scheme selected]', () => {
      successSpy = sinon.spy(loggerUser, 'success');
      loggerUser
        .masker('requestSchema')
        .success('This is a token: Bearer qwqwyq34u433499ffd9f8d');
      expect(successSpy.calledOnce).to.be.true;
    });
    it('It should print the masked properties according to the selected scheme', () => {
      successSpy = sinon.spy(loggerUser, 'success');
      loggerUser.masker('requestSchema').success('print id:', dataMock);
      expect(successSpy.calledOnce).to.be.true;
    });
  });
});
