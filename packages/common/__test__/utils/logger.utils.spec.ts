import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Logger, LoggerUser } from '../../utils/logger.utils';
import { ILoggerService } from '../../interfaces';

describe('Commons - Utils - Logger', () => {
  describe('Default', () => {
    let logger: ILoggerService;
    let successSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      process.env.ZANOBIJS_LOGGER = 'true';
      logger = Logger();
      successSpy = vi.spyOn(logger, 'success');
    });
    afterEach(() => {
      successSpy.mockRestore();
    });
    it('should respond true to the logger success call', () => {
      logger.success('Logger success');
      expect(successSpy).toHaveBeenCalledOnce();
    });
  });
  describe('With options', () => {
    let logger: ILoggerService;
    let successSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      // process.env.ZANOBIJS_LOGGER = "true";
      logger = Logger({ withColor: false });
      successSpy = vi.spyOn(logger, 'success');
    });
    afterEach(() => {
      successSpy.mockRestore();
    });
    it('should respond true to the logger success call', () => {
      const objectTest = {
        text: 'some test',
        arrayTest: [1, 2, 3, 'text', 4, 'some'],
        objectTest: {
          intoObject: {
            textObject: 'text object',
            object2: {
              someTest: 'some test object 2',
            },
          },
        },
      };
      logger.success('Logger success', objectTest);
      expect(successSpy).toHaveBeenCalledOnce();
    });
    it('should respond true to the logger success call', () => {
      const objectTest = {
        text: 'some test',
        arrayTest: [1, 2, 3, 'text', 4, 'some'],
        objectTest: {
          intoObject: {
            textObject: 'text object',
            object2: {
              someTest: 'some test object 2',
            },
          },
        },
      };
      const objectTest2 = {
        text: 'other some test',
        arrayTest: [1, 2, 3, 'other text', 4, 'other some'],
        objectTest: {
          intoObject: {
            textObject: 'other text object',
            object2: {
              someTest: 'other some test object 2',
            },
          },
        },
      };
      logger.success('Logger success', objectTest, 'print text', objectTest2);
      expect(successSpy).toHaveBeenCalledOnce();
    });
  });
});

describe('Commons - Utils - LoggerUser', () => {
  process.env.ZANOBIJS_LOGGER_USER = 'true';
  describe('Default', () => {
    let loggerUser: ILoggerService;
    let successSpy: ReturnType<typeof vi.spyOn>;
    let importantSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      loggerUser = LoggerUser();
      successSpy = vi.spyOn(loggerUser, 'success');
      importantSpy = vi.spyOn(loggerUser, 'important');
    });
    afterEach(() => {
      successSpy.mockRestore();
      importantSpy.mockRestore();
    });
    it('should respond true to the logger User success call', () => {
      loggerUser.success('Logger User success');
      expect(successSpy).toHaveBeenCalledOnce();
    });
    it('should respond true to the logger User success call', () => {
      loggerUser.important('Logger User important', 'zanobiJS unit test');
      expect(importantSpy).toHaveBeenCalledOnce();
    });
  });
  describe('With options', () => {
    let loggerUser: ILoggerService;
    let successSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      loggerUser = LoggerUser({ withColor: false });
      successSpy = vi.spyOn(loggerUser, 'success');
    });
    afterEach(() => {
      successSpy.mockRestore();
    });
    it('should respond true to the loggerUser success call', () => {
      const objectTest = {
        text: 'some test',
        arrayTest: [1, 2, 3, 'text', 4, 'some'],
        objectTest: {
          intoObject: {
            textObject: 'text object',
            object2: {
              someTest: 'some test object 2',
            },
          },
        },
      };
      loggerUser.success('Logger success', objectTest);
      expect(successSpy).toHaveBeenCalledOnce();
    });
    it('should respond true to the logger success call with other args', () => {
      const objectTest = {
        text: 'some test',
        arrayTest: [1, 2, 3, 'text', 4, 'some'],
        objectTest: {
          intoObject: {
            textObject: 'text object',
            object2: {
              someTest: 'some test object 2',
            },
          },
        },
      };
      const objectTest2 = {
        text: 'other some test',
        arrayTest: [1, 2, 3, 'other text', 4, 'other some'],
        objectTest: {
          intoObject: {
            textObject: 'other text object',
            object2: {
              someTest: 'other some test object 2',
            },
          },
        },
      };
      loggerUser.success(
        'Logger success',
        objectTest,
        'print text',
        objectTest2,
      );
      expect(successSpy).toHaveBeenCalledOnce();
    });
  });
});
