import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { Logger, LoggerUser } from "../../utils/logger.utils";
import { ILoggerService } from "../../interfaces";

describe("Commons - Utils - Logger", () => {
  describe("Default", () => {
    let logger: ILoggerService;
    let successSpy: any;

    beforeEach(() => {
      process.env.ZANOBIJS_LOGGER = "true";
      logger = Logger();
      successSpy = vi.spyOn(logger, "success");
    });
    afterEach(() => {
      successSpy.mockReset();
    });
    it("should respond true to the logger success call", () => {
      logger.success("Logger success");
      expect(successSpy).toHaveBeenCalled();
    });
  });
  describe("With options", () => {
    let logger: ILoggerService;
    let successSpy: any;

    beforeEach(() => {
      logger = Logger({ withColor: false });
      successSpy = vi.spyOn(logger, "success");
    });
    afterEach(() => {
      successSpy.mockReset();
    });
    it("should respond true to the logger success call", () => {
      const objectTest = {
        text: "some test",
        arrayTest: [1, 2, 3, "text", 4, "some"],
        objectTest: {
          intoObject: {
            textObject: "text object",
            object2: {
              someTest: "some test object 2",
            },
          },
        },
      };
      logger.success("Logger success", objectTest);
      expect(successSpy).toHaveBeenCalled();
    });
    it("should respond true to the logger success call", () => {
      const objectTest = {
        text: "some test",
        arrayTest: [1, 2, 3, "text", 4, "some"],
        objectTest: {
          intoObject: {
            textObject: "text object",
            object2: {
              someTest: "some test object 2",
            },
          },
        },
      };
      const objectTest2 = {
        text: "other some test",
        arrayTest: [1, 2, 3, "other text", 4, "other some"],
        objectTest: {
          intoObject: {
            textObject: "other text object",
            object2: {
              someTest: "other some test object 2",
            },
          },
        },
      };
      logger.success("Logger success", objectTest, "print text", objectTest2);
      expect(successSpy).toHaveBeenCalled();
    });
  });
});

describe("Commons - Utils - LoggerUser", () => {
  process.env.ZANOBIJS_LOGGER_USER = "true";
  describe("Default", () => {
    let loggerUser: ILoggerService;
    let successSpy: any;
    let importantSpy: any;

    beforeEach(() => {
      loggerUser = LoggerUser();
      successSpy = vi.spyOn(loggerUser, "success");
      importantSpy = vi.spyOn(loggerUser, "important");
    });
    afterEach(() => {
      successSpy.mockReset();
      importantSpy.mockReset();
    });
    it("should respond true to the logger User success call", () => {
      loggerUser.success("Logger User success");
      expect(successSpy).toHaveBeenCalled();
    });
    it("should respond true to the logger User success call", () => {
      loggerUser.important("Logger User important", "zanobiJS unit test");
      expect(importantSpy).toHaveBeenCalled();
    });
  });
  describe("With options", () => {
    let loggerUser: ILoggerService;
    let successSpy: any;

    beforeEach(() => {
      loggerUser = LoggerUser({ withColor: false });
      successSpy = vi.spyOn(loggerUser, "success");
    });
    afterEach(() => {
      successSpy.mockReset();
    });
    it("should respond true to the loggerUser success call", () => {
      const objectTest = {
        text: "some test",
        arrayTest: [1, 2, 3, "text", 4, "some"],
        objectTest: {
          intoObject: {
            textObject: "text object",
            object2: {
              someTest: "some test object 2",
            },
          },
        },
      };
      loggerUser.success("Logger success", objectTest);
      expect(successSpy).toHaveBeenCalled();
    });
    it("should respond true to the logger success call with other args", () => {
      const objectTest = {
        text: "some test",
        arrayTest: [1, 2, 3, "text", 4, "some"],
        objectTest: {
          intoObject: {
            textObject: "text object",
            object2: {
              someTest: "some test object 2",
            },
          },
        },
      };
      const objectTest2 = {
        text: "other some test",
        arrayTest: [1, 2, 3, "other text", 4, "other some"],
        objectTest: {
          intoObject: {
            textObject: "other text object",
            object2: {
              someTest: "other some test object 2",
            },
          },
        },
      };
      loggerUser.success(
        "Logger success",
        objectTest,
        "print text",
        objectTest2,
      );
      expect(successSpy).toHaveBeenCalled();
    });
  });
});
