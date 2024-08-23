import { expect } from "chai";
import * as sinon from "sinon";
import { Logger, LoggerUser } from "../../utils/logger.utils";
import { ILoggerService } from "../../interfaces";

describe("Commons - Utils - Logger", () => {
  describe("Default", () => {
    let logger: ILoggerService;
    let successSpy: sinon.SinonSpy;

    beforeEach(() => {
      process.env.ZANOBIJS_LOGGER = "true";
      logger = Logger();
      successSpy = sinon.spy(logger, "success");
    });
    afterEach(() => {
      successSpy.restore();
    });
    it("should respond true to the logger success call", () => {
      logger.success("Logger success");
      expect(successSpy.calledOnce).to.be.true;
    });
  });
  describe("With options", () => {
    let logger: ILoggerService;
    let successSpy: sinon.SinonSpy;

    beforeEach(() => {
      // process.env.ZANOBIJS_LOGGER = "true";
      logger = Logger({ withColor: false });
      successSpy = sinon.spy(logger, "success");
    });
    afterEach(() => {
      successSpy.restore();
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
      expect(successSpy.calledOnce).to.be.true;
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
      expect(successSpy.calledOnce).to.be.true;
    });
  });
});

describe("Commons - Utils - LoggerUser", () => {
  process.env.ZANOBIJS_LOGGER_USER = "true";
  describe("Default", () => {
    let loggerUser: ILoggerService;
    let successSpy: sinon.SinonSpy;
    let importantSpy: sinon.SinonSpy;

    beforeEach(() => {
      loggerUser = LoggerUser();
      successSpy = sinon.spy(loggerUser, "success");
      importantSpy = sinon.spy(loggerUser, "important");
    });
    afterEach(() => {
      successSpy.restore();
      importantSpy.restore();
    });
    it("should respond true to the logger User success call", () => {
      loggerUser.success("Logger User success");
      expect(successSpy.calledOnce).to.be.true;
    });
    it("should respond true to the logger User success call", () => {
      loggerUser.important("Logger User important", "zanobiJS unit test");
      expect(importantSpy.calledOnce).to.be.true;
    });
  });
  describe("With options", () => {
    let loggerUser: ILoggerService;
    let successSpy: sinon.SinonSpy;

    beforeEach(() => {
      loggerUser = LoggerUser({ withColor: false });
      successSpy = sinon.spy(loggerUser, "success");
    });
    afterEach(() => {
      successSpy.restore();
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
      expect(successSpy.calledOnce).to.be.true;
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
      expect(successSpy.calledOnce).to.be.true;
    });
  });
});
