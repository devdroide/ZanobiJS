import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { LoggerService } from "../../services/logger.service";
import { ILoggerService } from "../../interfaces";

describe("Commons - Services - Logger", () => {
  describe("No print", () => {
    let logger: ILoggerService;
    let successSpy: any;

    beforeEach(() => {
      process.env.ZANOBIJS_LOGGER = "false";
    });
    afterEach(() => {
      successSpy.mockReset();
    });
    it("should respond true to the logger success call", () => {
      LoggerService["instance"] = null;
      logger = LoggerService.getInstance({ withColor: false });
      successSpy = vi.spyOn(logger, "success");
      logger.success("Logger user success");
      expect(successSpy).toHaveBeenCalled();
    });
  });
  describe("Options dafault", () => {
    let logger: ILoggerService;
    let successSpy: any;
    let warnSpy: any;
    let errorSpy: any;
    let infoSpy: any;
    let debugSpy: any;

    beforeEach(() => {
      process.env.ZANOBIJS_LOGGER = "true";
      LoggerService["instance"] = null;
      logger = LoggerService.getInstance();
      successSpy = vi.spyOn(logger, "success");
      warnSpy = vi.spyOn(logger, "warn");
      errorSpy = vi.spyOn(logger, "error");
      infoSpy = vi.spyOn(logger, "info");
      debugSpy = vi.spyOn(logger, "debug");
    });
    afterEach(() => {
      successSpy.mockReset();
      warnSpy.mockReset();
      errorSpy.mockReset();
      infoSpy.mockReset();
      debugSpy.mockReset();
    });
    it("should respond true to the logger success call", () => {
      logger.success("Logger success");
      expect(successSpy).toHaveBeenCalled();
    });
    it("should respond true to the logger warn call", () => {
      logger.warn("Logger warn");
      expect(warnSpy).toHaveBeenCalled();
    });
    it("should respond true to the logger error call", () => {
      logger.error("Logger error");
      expect(errorSpy).toHaveBeenCalled();
    });
    it("should respond true to the logger info call", () => {
      logger.info("Logger info");
      expect(infoSpy).toHaveBeenCalled();
    });
    it("should respond true to the logger debug call", () => {
      logger.debug("Logger debug", ["a", "b"]);
      expect(debugSpy).toHaveBeenCalled();
    });
  });
  describe("Options with color", () => {
    let logger: ILoggerService;
    let successSpy: any;

    beforeEach(() => {
      process.env.ZANOBIJS_LOGGER = "true";
    });
    afterEach(() => {
      successSpy.mockReset();
    });
    it("should respond true to the logger success call", () => {
      LoggerService["instance"] = null;
      logger = LoggerService.getInstance({ withColor: false });
      successSpy = vi.spyOn(logger, "success");
      logger.success("Logger user success");
      expect(successSpy).toHaveBeenCalled();
    });
  });
});
