import { expect } from "chai";
import {
  RuntimeException,
  InvalidModuleSchemaException,
} from "../../src/exceptions";

describe("Commons - Exception - module", () => {
  it("should respond RuntimeException empty paramters", () => {
    try {
      new RuntimeException();
    } catch (error) {
      expect(error.message).to.be.equal("");
      expect(error.detail).to.be.equal("");
    }
  });
  it("should respond RuntimeException ", () => {
    try {
      new RuntimeException("Message to error", "Detail error");
    } catch (error) {
      expect(error.message).to.be.equal("Message to error");
      expect(error.detail).to.be.equal("Detail error");
    }
  });
  it("should respond an object to whaHappened RuntimeException ", () => {
    const exception = new RuntimeException("Message to error", "Detail error");
    const contentError = exception.whatHappened();
    expect(contentError.message).to.be.equal("Message to error");
    expect(contentError.detail).to.be.equal("Detail error");
  });
  it("should respond InvalidModuleSchemaException ", () => {
    try {
      new InvalidModuleSchemaException("Detail error");
    } catch (error) {
      expect(error.message).to.be.equal("An error has occurred in @Module()");
      expect(error.detail).to.be.equal("Detail error");
    }
  });
});
