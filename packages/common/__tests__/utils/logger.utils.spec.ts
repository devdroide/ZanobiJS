import { expect } from "chai";
import * as sinon from "sinon";
import { Logger } from "../../src/utils/logger.utils";
import { ILoggerService } from "../../src/interfaces";

describe("Commons - Utils - Logger", () => {
  let logger: ILoggerService;
  let successSpy: sinon.SinonSpy;

  beforeEach(() => {
    process.env.ZANOBI_DEBUG = "true";
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
