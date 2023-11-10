import { expect } from "chai";
import * as sinon from "sinon";
import { LoggerService } from "../../services/logger.service";
import { ILoggerService } from "../../interfaces";

describe("Commons - Services - Logger", () => {
  let logger: ILoggerService;
  let successSpy: sinon.SinonSpy;
  let warnSpy: sinon.SinonSpy;
  let errorSpy: sinon.SinonSpy;
  let infoSpy: sinon.SinonSpy;
  let debugSpy: sinon.SinonSpy;

  beforeEach(() => {
    process.env.ZANOBIJS_LOGGER = "false"
    logger = LoggerService.getInstance();
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
    logger.success("Logger success");
    expect(successSpy.calledOnce).to.be.true;
  });
  it("should respond true to the logger warn call", () => {
    logger.warn("Logger warn");
    expect(warnSpy.calledOnce).to.be.true;
  });
  it("should respond true to the logger error call", () => {
    logger.error("Logger error");
    expect(errorSpy.calledOnce).to.be.true;
  });
  it("should respond true to the logger info call", () => {
    logger.info("Logger info");
    expect(infoSpy.calledOnce).to.be.true;
  });
  it("should respond true to the logger debug call", () => {
    logger.debug("Logger debug", ["a", "b"]);
    expect(debugSpy.calledOnce).to.be.true;
  });
});
