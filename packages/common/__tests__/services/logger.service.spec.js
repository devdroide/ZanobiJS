"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon = require("sinon");
const logger_service_1 = require("../../services/logger.service");
describe("Commons - Services - Logger", () => {
    describe("No print", () => {
        let logger;
        let successSpy;
        beforeEach(() => {
            process.env.ZANOBIJS_LOGGER = "false";
        });
        afterEach(() => {
            successSpy.restore();
        });
        it("should respond true to the logger success call", () => {
            logger_service_1.LoggerService["instance"] = null;
            logger = logger_service_1.LoggerService.getInstance({ withColor: false });
            successSpy = sinon.spy(logger, "success");
            logger.success("Logger user success");
            (0, chai_1.expect)(successSpy.calledOnce).to.be.true;
        });
    });
    describe("Options dafault", () => {
        let logger;
        let successSpy;
        let warnSpy;
        let errorSpy;
        let infoSpy;
        let debugSpy;
        beforeEach(() => {
            process.env.ZANOBIJS_LOGGER = "true";
            logger_service_1.LoggerService["instance"] = null;
            logger = logger_service_1.LoggerService.getInstance();
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
            (0, chai_1.expect)(successSpy.calledOnce).to.be.true;
        });
        it("should respond true to the logger warn call", () => {
            logger.warn("Logger warn");
            (0, chai_1.expect)(warnSpy.calledOnce).to.be.true;
        });
        it("should respond true to the logger error call", () => {
            logger.error("Logger error");
            (0, chai_1.expect)(errorSpy.calledOnce).to.be.true;
        });
        it("should respond true to the logger info call", () => {
            logger.info("Logger info");
            (0, chai_1.expect)(infoSpy.calledOnce).to.be.true;
        });
        it("should respond true to the logger debug call", () => {
            logger.debug("Logger debug", ["a", "b"]);
            (0, chai_1.expect)(debugSpy.calledOnce).to.be.true;
        });
    });
    describe("Options with color", () => {
        let logger;
        let successSpy;
        beforeEach(() => {
            process.env.ZANOBIJS_LOGGER = "true";
        });
        afterEach(() => {
            successSpy.restore();
        });
        it("should respond true to the logger success call", () => {
            logger_service_1.LoggerService["instance"] = null;
            logger = logger_service_1.LoggerService.getInstance({ withColor: false });
            successSpy = sinon.spy(logger, "success");
            logger.success("Logger user success");
            (0, chai_1.expect)(successSpy.calledOnce).to.be.true;
        });
    });
});