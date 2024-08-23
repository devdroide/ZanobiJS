"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon = require("sinon");
const logger_utils_1 = require("../../utils/logger.utils");
describe("Commons - Utils - Logger", () => {
    describe("Default", () => {
        let logger;
        let successSpy;
        beforeEach(() => {
            process.env.ZANOBIJS_LOGGER = "true";
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
    describe("With options", () => {
        let logger;
        let successSpy;
        beforeEach(() => {
            // process.env.ZANOBIJS_LOGGER = "true";
            logger = (0, logger_utils_1.Logger)({ withColor: false });
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
            (0, chai_1.expect)(successSpy.calledOnce).to.be.true;
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
            (0, chai_1.expect)(successSpy.calledOnce).to.be.true;
        });
    });
});
describe("Commons - Utils - LoggerUser", () => {
    process.env.ZANOBIJS_LOGGER_USER = "true";
    describe("Default", () => {
        let loggerUser;
        let successSpy;
        let importantSpy;
        beforeEach(() => {
            loggerUser = (0, logger_utils_1.LoggerUser)();
            successSpy = sinon.spy(loggerUser, "success");
            importantSpy = sinon.spy(loggerUser, "important");
        });
        afterEach(() => {
            successSpy.restore();
            importantSpy.restore();
        });
        it("should respond true to the logger User success call", () => {
            loggerUser.success("Logger User success");
            (0, chai_1.expect)(successSpy.calledOnce).to.be.true;
        });
        it("should respond true to the logger User success call", () => {
            loggerUser.important("Logger User important", "zanobiJS unit test");
            (0, chai_1.expect)(importantSpy.calledOnce).to.be.true;
        });
    });
    describe("With options", () => {
        let loggerUser;
        let successSpy;
        beforeEach(() => {
            loggerUser = (0, logger_utils_1.LoggerUser)({ withColor: false });
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
            (0, chai_1.expect)(successSpy.calledOnce).to.be.true;
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
            loggerUser.success("Logger success", objectTest, "print text", objectTest2);
            (0, chai_1.expect)(successSpy.calledOnce).to.be.true;
        });
    });
});
