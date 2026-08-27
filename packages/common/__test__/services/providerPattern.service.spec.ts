import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ProviderPatternService } from '../../services/masker/process/providerPattern.service';
import { schemaMock } from '../mocks/providerPattern.mock';
import {
  MSG_PATTERN_EXIST,
  MSG_SCHEMA_PATTERN_EXIST,
  PatternException,
} from '../../exceptions';
import { CustomTestPatternMockFactory } from '../mocks/cutomsPattern.mock';

describe('Commons - Services - Provider Pattern', () => {
  describe('Pattern and Schema Configuration Response Error', () => {
    let provPattern: ProviderPatternService;

    beforeEach(() => {
      ProviderPatternService['instance'] = null;
      provPattern = ProviderPatternService.getInstance();
    });
    it('should response an error because schema already exist', () => {
      try {
        provPattern.setupSchema(schemaMock);
        provPattern.setupSchema(schemaMock);
      } catch (error) {
        expect(error).toBeInstanceOf(PatternException);
        expect(error.message).toBe(
          MSG_SCHEMA_PATTERN_EXIST('requestSchema', true),
        );
      }
    });
    it('should response an error because schema not exist', () => {
      ProviderPatternService['instance'] = null;
      provPattern = ProviderPatternService.getInstance();
      try {
        provPattern.setupSchema(schemaMock);
        provPattern.getKeyFromSchema('otherSchema', 'someKey');
      } catch (error) {
        expect(error).toBeInstanceOf(PatternException);
        expect(error.message).toBe(
          MSG_SCHEMA_PATTERN_EXIST('otherSchema', false),
        );
      }
    });
    it('should response an error because pattern already exist', () => {
      ProviderPatternService['instance'] = null;
      provPattern = ProviderPatternService.getInstance();
      try {
        provPattern.setupCustomPattern(
          'AllText',
          CustomTestPatternMockFactory,
          false,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(PatternException);
        expect(error.message).toBe(MSG_PATTERN_EXIST('AllText'));
      }
    });
  });
  describe('Pattern and Schema Responses', () => {
    let provPattern: ProviderPatternService;
    let setupCustomPatternSpy: ReturnType<typeof vi.spyOn>;
    beforeEach(() => {
      ProviderPatternService['instance'] = null;
      provPattern = ProviderPatternService.getInstance();
      setupCustomPatternSpy = vi.spyOn(provPattern, 'setupCustomPattern');
    });
    afterEach(() => {
      setupCustomPatternSpy.mockRestore();
    });
    it('should response an array with the default patterns', () => {
      provPattern.setupSchema(schemaMock);
      const result = provPattern.getKeyFromSchema('requestSchema', 'someKey');
      expect(result).toBeInstanceOf(Array);
      expect(result).toContain('Token');
      expect(result).toContain('Email');
    });
    it('should add a new custom pattern', () => {
      provPattern.setupCustomPattern(
        'CustomTest',
        CustomTestPatternMockFactory,
        false,
      );
      expect(setupCustomPatternSpy).toHaveBeenCalledOnce();
    });
    it('should add a new custom pattern and also to the default patterns', () => {
      provPattern.setupCustomPattern(
        'CustomTest',
        CustomTestPatternMockFactory,
        true,
      );
      expect(setupCustomPatternSpy).toHaveBeenCalledOnce();
    });
    it('should respond to a scheme configured with keys and patterns', () => {
      provPattern.setupSchema(schemaMock);
      const getSchema = provPattern.getSchema('requestSchema');
      expect(getSchema).toHaveProperty('id');
    });
    it('should respond with the configured patterns of a key by scheme', () => {
      provPattern.setupSchema(schemaMock);
      const getKey = provPattern.getKeyFromSchema('requestSchema', 'id');
      expect(getKey).toBe(schemaMock.requestSchema.id);
      expect(getKey).toBeInstanceOf(Array);
      expect(getKey).toContain('LastFour');
    });
  });
  describe("Responses Apply - Can't no apply", () => {
    let provPattern: ProviderPatternService;
    beforeEach(() => {
      ProviderPatternService['instance'] = null;
      provPattern = ProviderPatternService.getInstance();
    });
    it('It should respond without applying anything because the pattern is null.', () => {
      const maskerResult = provPattern.apply('12345678', null);
      expect(maskerResult).toBe('12345678');
    });
    it('should respond without applying anything because the pattern does not exist.', () => {
      const maskerResult = provPattern.apply('12345678', ['SomePattern']);
      expect(maskerResult).toBe('12345678');
    });
  });
  describe('Responses Apply - Pattern All Text and Alternate', () => {
    let provPattern: ProviderPatternService;
    beforeEach(() => {
      ProviderPatternService['instance'] = null;
      provPattern = ProviderPatternService.getInstance();
    });
    it('should respond to a text by applying the pattern of masking all text', () => {
      const maskerResult = provPattern.apply('some text', ['AllText']);
      expect(maskerResult).toBe('*********');
    });
    it('should respond to a text by applying the pattern of masking all text [other text]', () => {
      const maskerResult = provPattern.apply('some text', ['AllText']);
      expect(maskerResult).toBe('*********');
    });
    it('should respond to a text by applying the pattern of masking alternate text', () => {
      const maskerResult = provPattern.apply('much much text', ['Alternate']);
      expect(maskerResult).toBe('mu****uc****xt');
    });
    it('should respond to a text by applying the pattern of masking alternate text [other text]', () => {
      const maskerResult = provPattern.apply('other other text', ['Alternate']);
      expect(maskerResult).toBe('ot****ot****te**');
    });
  });
  describe('Responses Apply - Pattern Email', () => {
    let provPattern: ProviderPatternService;
    beforeEach(() => {
      ProviderPatternService['instance'] = null;
      provPattern = ProviderPatternService.getInstance();
    });
    it('should respond to a text by applying the pattern of masking email [text and .co email]', () => {
      const maskerResult = provPattern.apply(
        'hello my email is example@domain.com.co',
        ['Email'],
      );
      expect(maskerResult).toBe('hello my email is ex****e@d*********.co');
    });
    it('should respond to a text by applying the pattern of masking email [text and .com email]', () => {
      const maskerResult = provPattern.apply(
        'hello my email is example@domain.com',
        ['Email'],
      );
      expect(maskerResult).toBe('hello my email is ex****e@d*****.com');
    });
    it('should respond to a text by applying the pattern of masking email [only email]', () => {
      const maskerResult = provPattern.apply('example@domain.com', ['Email']);
      expect(maskerResult).toBe('ex****e@d*****.com');
    });
    it('should respond to a text by applying the pattern of masking email [short email and .com]', () => {
      const maskerResult = provPattern.apply('a@b.com', ['Email']);
      expect(maskerResult).toBe('*@*.com');
    });
    it('should respond to a text by applying the pattern of masking email [short local and domain | extension .co]', () => {
      const maskerResult = provPattern.apply('a@b.com.co', ['Email']);
      expect(maskerResult).toBe('*@*****.co');
    });
    it('should respond to a text by applying the pattern of masking email [short local | extension .co]', () => {
      const maskerResult = provPattern.apply('a@example.com.co', ['Email']);
      expect(maskerResult).toBe('*@e**********.co');
    });
    it('should respond to a text by applying the pattern of masking email [short domain | extension .co]', () => {
      const maskerResult = provPattern.apply('example@b.co', ['Email']);
      expect(maskerResult).toBe('ex****e@*.co');
    });
    it('should response apply pattern last four masker', () => {
      const maskerResult = provPattern.apply('12345678', ['LastFour']);
      expect(maskerResult).toBe('****5678');
    });
    it('should response apply 2 patterns last y first four masker', () => {
      const maskerResult = provPattern.apply('1234567890', [
        'LastFour',
        'FirstFour',
      ]);
      expect(maskerResult).toBe('**********');
    });
  });
  describe('Responses Apply - Pattern First Four', () => {
    let provPattern: ProviderPatternService;
    beforeEach(() => {
      ProviderPatternService['instance'] = null;
      provPattern = ProviderPatternService.getInstance();
    });
    it('should response apply pattern last four masker', () => {
      const maskerResult = provPattern.apply('12345678', ['FirstFour']);
      expect(maskerResult).toBe('1234****');
    });
    it("should response the same text because can't apply the pattern first four", () => {
      const maskerResult = provPattern.apply('1234', ['FirstFour']);
      expect(maskerResult).toBe('1234');
    });
  });
  describe('Responses Apply - Pattern Last Four', () => {
    let provPattern: ProviderPatternService;
    beforeEach(() => {
      ProviderPatternService['instance'] = null;
      provPattern = ProviderPatternService.getInstance();
    });
    it('should response apply pattern last four masker', () => {
      const maskerResult = provPattern.apply('12345678', ['LastFour']);
      expect(maskerResult).toBe('****5678');
    });
    it("should response the same text because can't apply the pattern last four", () => {
      const maskerResult = provPattern.apply('5678', ['LastFour']);
      expect(maskerResult).toBe('5678');
    });
  });
  describe('Responses Apply - Pattern Only Text', () => {
    let provPattern: ProviderPatternService;
    beforeEach(() => {
      ProviderPatternService['instance'] = null;
      provPattern = ProviderPatternService.getInstance();
    });
    it('should response apply pattern only text masker', () => {
      const maskerResult = provPattern.apply('some - text 12423', ['OnlyText']);
      expect(maskerResult).toBe('some***text******');
    });
    it('should response apply pattern only text masker [other text]', () => {
      const maskerResult = provPattern.apply('some_text 12423', ['OnlyText']);
      expect(maskerResult).toBe('some*text******');
    });
  });
  describe('Responses Apply - Pattern Text', () => {
    let provPattern: ProviderPatternService;
    beforeEach(() => {
      ProviderPatternService['instance'] = null;
      provPattern = ProviderPatternService.getInstance();
    });
    it('should response a text apply the pattern text masker [mixing text and number]', () => {
      const maskerResult = provPattern.apply('some - text 12423', ['Text']);
      expect(maskerResult).toBe('so** te** 12***');
    });
    it('should response a text apply the pattern text masker [number string]', () => {
      const maskerResult = provPattern.apply('123444', ['Text']);
      expect(maskerResult).toBe('12****');
    });
    it('should response a text apply the pattern text masker [text]', () => {
      const maskerResult = provPattern.apply('some', ['Text']);
      expect(maskerResult).toBe('so**');
    });
    it("should response the same text because can't apply the pattern text [short text]", () => {
      const maskerResult = provPattern.apply('de', ['Text']);
      expect(maskerResult).toBe('de');
    });
  });
  describe('Responses Apply - Pattern Token', () => {
    let provPattern: ProviderPatternService;
    beforeEach(() => {
      ProviderPatternService['instance'] = null;
      provPattern = ProviderPatternService.getInstance();
    });
    it('should response a text apply the pattern token masker [token intro of text]', () => {
      const maskerResult = provPattern.apply(
        'Token Send: Bearer fagd13355ffw',
        ['Token'],
      );
      expect(maskerResult).toBe('Token Send: Bearer ******fw');
    });
    it('should response a text apply the pattern token masker [only token bearer]', () => {
      const maskerResult = provPattern.apply('Bearer fagd13355fxy', ['Token']);
      expect(maskerResult).toBe('Bearer ******xy');
    });
    it('should response a text apply the pattern token masker [token basic]', () => {
      const maskerResult = provPattern.apply('Basic fagd13355fzt', ['Token']);
      expect(maskerResult).toBe('Basic ******zt');
    });
  });
});
