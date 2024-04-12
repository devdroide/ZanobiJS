import { expect } from "chai";
import * as sinon from "sinon";
import { LoggerUserService } from "../../services/logger.user.service";
import { ILoggerService } from "../../interfaces";

describe("Commons - Services - Logger", () => {
  let logger: ILoggerService;
  let successSpy: sinon.SinonSpy;
  let warnSpy: sinon.SinonSpy;
  let errorSpy: sinon.SinonSpy;
  let infoSpy: sinon.SinonSpy;
  let debugSpy: sinon.SinonSpy;

  beforeEach(() => {
    process.env.ZANOBIJS_LOGGER_USER = "false"
    logger = LoggerUserService.getInstance();
    successSpy = sinon.spy(logger, "success");
    warnSpy = sinon.spy(logger, "warn");
    errorSpy = sinon.spy(logger, "error");
    infoSpy = sinon.spy(logger, "info");
    debugSpy = sinon.spy(logger, "debug");
  });
  afterEach(() => {
    successSpy.restore();
    warnSpy.restore();
    errorSpy.restore();
    infoSpy.restore();
    debugSpy.restore();
  });
  it("should respond true to the logger success call", () => {
    logger.success("Logger user success");
    expect(successSpy.calledOnce).to.be.true;
  });
  it("should respond true to the logger warn call", () => {
    logger.warn("Logger user warn");
    expect(warnSpy.calledOnce).to.be.true;
  });
  it("should respond true to the logger error call", () => {
    logger.error("Logger user error");
    expect(errorSpy.calledOnce).to.be.true;
  });
  it("should respond true to the logger info call", () => {
    logger.info("Logger user info");
    expect(infoSpy.calledOnce).to.be.true;
  });
  it("should respond true to the logger debug call", () => {
    logger.debug("Logger user debug", ["a", "b"]);
    expect(debugSpy.calledOnce).to.be.true;
  });
});
