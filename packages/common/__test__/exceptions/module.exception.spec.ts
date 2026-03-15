import { describe, it, expect } from "vitest";
import {
  RuntimeException,
  InvalidModuleSchemaException,
} from "../../exceptions";

describe("Commons - Exception - module", () => {
  it("should respond RuntimeException empty paramters", () => {
    try {
      throw new RuntimeException();
    } catch (error) {
      expect(error.message).toEqual("");
      expect(error.detail).toEqual("");
    }
  });
  it("should respond RuntimeException ", () => {
    try {
      throw new RuntimeException("Message to error", "Detail error");
    } catch (error) {
      expect(error.message).toEqual("Message to error");
      expect(error.detail).toEqual("Detail error");
    }
  });
  it("should respond an object to whaHappened RuntimeException ", () => {
    const exception = new RuntimeException("Message to error", "Detail error");
    const contentError = exception.whatHappened();
    expect(contentError.message).toEqual("Message to error");
    expect(contentError.detail).toEqual("Detail error");
  });
  it("should respond InvalidModuleSchemaException ", () => {
    try {
      throw new InvalidModuleSchemaException("Detail error");
    } catch (error) {
      expect(error.message).toEqual(
        "An error has occurred in @Module(), please check the detail field",
      );
      expect(error.detail).toEqual("Detail error");
    }
  });
});
