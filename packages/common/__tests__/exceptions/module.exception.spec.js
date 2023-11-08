"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const exceptions_1 = require("../../exceptions");
describe("Commons - Exception - module", () => {
    it("should respond RuntimeException empty paramters", () => {
        try {
            new exceptions_1.RuntimeException();
        }
        catch (error) {
            (0, chai_1.expect)(error.message).to.be.equal("");
            (0, chai_1.expect)(error.detail).to.be.equal("");
        }
    });
    it("should respond RuntimeException ", () => {
        try {
            new exceptions_1.RuntimeException("Message to error", "Detail error");
        }
        catch (error) {
            (0, chai_1.expect)(error.message).to.be.equal("Message to error");
            (0, chai_1.expect)(error.detail).to.be.equal("Detail error");
        }
    });
    it("should respond an object to whaHappened RuntimeException ", () => {
        const exception = new exceptions_1.RuntimeException("Message to error", "Detail error");
        const contentError = exception.whatHappened();
        (0, chai_1.expect)(contentError.message).to.be.equal("Message to error");
        (0, chai_1.expect)(contentError.detail).to.be.equal("Detail error");
    });
    it("should respond InvalidModuleSchemaException ", () => {
        try {
            new exceptions_1.InvalidModuleSchemaException("Detail error");
        }
        catch (error) {
            (0, chai_1.expect)(error.message).to.be.equal("An error has occurred in @Module()");
            (0, chai_1.expect)(error.detail).to.be.equal("Detail error");
        }
    });
});
