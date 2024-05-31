import { expect } from "chai";
import * as sinon from "sinon";
import { Logger, LoggerUser } from "../../utils/logger.utils";
import { ILoggerService } from "../../interfaces";

describe("Commons - Utils - Logger", () => {
  let logger: ILoggerService;
  let successSpy: sinon.SinonSpy;

  beforeEach(() => {
    // process.env.ZANOBIJS_LOGGER = "true";
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

describe("Commons - Utils - LoggerUser", () => {
  let loggerUser: ILoggerService;
  let successSpy: sinon.SinonSpy;

  beforeEach(() => {
    process.env.ZANOBIJS_LOGGER_USER = "true";
    loggerUser = LoggerUser();
    successSpy = sinon.spy(loggerUser, "success");
  });
  afterEach(() => {
    successSpy.restore();
  });
  it("should respond true to the logger User success call", () => {
    loggerUser.success("Logger User success");
    expect(successSpy.calledOnce).to.be.true;
  });
});
