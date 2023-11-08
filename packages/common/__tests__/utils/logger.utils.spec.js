"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon = require("sinon");
const logger_utils_1 = require("../../utils/logger.utils");
describe("Commons - Utils - Logger", () => {
    let logger;
    let successSpy;
    beforeEach(() => {
        process.env.ZANOBI_DEBUG = "true";
        logger = (0, logger_utils_1.Logger)();
        successSpy = sinon.spy(logger, "success");
    });
    afterEach(() => {
        successSpy.restore();
    });
    it("should respond true to the logger success call", () => {
        logger.success("Logger success");
        (0, chai_1.expect)(successSpy.calledOnce).to.be.true;
    });
});
