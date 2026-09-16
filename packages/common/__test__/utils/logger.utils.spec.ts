import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Logger } from '../../utils/logger.utils';
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
