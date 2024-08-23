"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon = require("sinon");
const logger_user_service_1 = require("../../services/logger.user.service");
describe("Commons - Services - Logger User", () => {
    describe("No print", () => {
        let loggerUser;
        let successSpy;
        beforeEach(() => {
            process.env.ZANOBIJS_LOGGER_USER = "false";
        });
        afterEach(() => {
            successSpy.restore();
        });
        it("should respond true to the logger success call", () => {
            logger_user_service_1.LoggerUserService["instance"] = null;
            loggerUser = logger_user_service_1.LoggerUserService.getInstance({ withColor: false });
            successSpy = sinon.spy(loggerUser, "success");
            loggerUser.success("Logger user success");
            (0, chai_1.expect)(successSpy.calledOnce).to.be.true;
        });
    });
    describe("Options default", () => {
        let logger;
        let successSpy;
        let warnSpy;
        let errorSpy;
        let infoSpy;
        let debugSpy;
        beforeEach(() => {
            process.env.ZANOBIJS_LOGGER_USER = "true";
            logger_user_service_1.LoggerUserService["instance"] = null;
            logger = logger_user_service_1.LoggerUserService.getInstance();
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
            (0, chai_1.expect)(successSpy.calledOnce).to.be.true;
        });
        it("should respond true to the logger warn call", () => {
            logger.warn("Logger user warn");
            (0, chai_1.expect)(warnSpy.calledOnce).to.be.true;
        });
        it("should respond true to the logger error call", () => {
            logger.error("Logger user error");
            (0, chai_1.expect)(errorSpy.calledOnce).to.be.true;
        });
        it("should respond true to the logger info call", () => {
            logger.info("Logger user info");
            (0, chai_1.expect)(infoSpy.calledOnce).to.be.true;
        });
        it("should respond true to the logger debug call", () => {
            logger.debug("Logger user debug", ["a", "b"]);
            (0, chai_1.expect)(debugSpy.calledOnce).to.be.true;
        });
    });
    describe("Options with color", () => {
        let loggerUser;
        let successSpy;
        beforeEach(() => {
            process.env.ZANOBIJS_LOGGER_USER = "true";
        });
        afterEach(() => {
            successSpy.restore();
        });
        it("should respond true to the logger success call", () => {
            logger_user_service_1.LoggerUserService["instance"] = null;
            loggerUser = logger_user_service_1.LoggerUserService.getInstance({ withColor: false });
            successSpy = sinon.spy(loggerUser, "success");
            loggerUser.success("Logger user success");
            (0, chai_1.expect)(successSpy.calledOnce).to.be.true;
        });
    });
});
