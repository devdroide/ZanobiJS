import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ProcessDataService } from '../../services/masker/process/processData.service';
import {
  dataMock,
  dataToDefaultMock,
  schemaMock,
} from '../mocks/providerPattern.mock';
import { ProviderPatternService } from '../../services/masker/process/providerPattern.service';

describe('Commons - Services - Process Data', () => {
  let provPattern: ProviderPatternService;
  beforeEach(() => {
    ProviderPatternService['instance'] = null;
    provPattern = ProviderPatternService.getInstance();
    provPattern.setupSchema(schemaMock);
  });
  describe('Masker data', () => {
    let processData: ProcessDataService;
    let selectSchemaSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      ProcessDataService['instance'] = null;
      processData = ProcessDataService.getInstance();
      selectSchemaSpy = vi.spyOn(processData, 'selectSchema');
    });
    it('should call once th select schema', () => {
      processData.selectSchema('requestSchema');
      expect(selectSchemaSpy).toHaveBeenCalledOnce();
    });
    it('should masker the fields with schema config [id]', () => {
      const resultMasker = processData
        .selectSchema('requestSchema')
        .process(dataMock);
      expect(resultMasker.id).toBe('****5678');
      expect(resultMasker.user).toBe('*********');
      expect(resultMasker.name).toBe(dataMock.name);
    });
    it('should masker the fields with default', () => {
      const resultMasker = processData
        .selectSchema('requestSchema')
        .process(dataToDefaultMock);
      expect(resultMasker.authorizationBasic).toBe('Basic ******32');
    });
    it('should masker a string (token) with default patterns', () => {
      const resultMasker = processData
        .selectSchema('requestSchema')
        .process('Bearer tEst12345');
      expect(resultMasker).toBe('Bearer ******45');
    });
    it('should masker a string (email) with default patterns', () => {
      const resultMasker = processData
        .selectSchema('requestSchema')
        .process(dataToDefaultMock.email);
      expect(resultMasker).toBe('de******e@g****.com');
    });
  });
  describe('Masker data without schema selected', () => {
    let processData: ProcessDataService;

    beforeEach(() => {
      ProcessDataService['instance'] = null;
      processData = ProcessDataService.getInstance();
    });
    it('should masker a token with default patterns', () => {
      const resultMasker = processData.process('Bearer tEst12345');
      expect(resultMasker).toBe('Bearer ******45');
    });
    it('should response a text without masker because not apply default patterns', () => {
      const resultMasker = processData.process('Some text');
      expect(resultMasker).toBe('Some text');
    });
    it('should masker a creadit card with default patterns', () => {
      const resultMasker = processData.process(
        'My card is 4111 1111 1111 1234 and another is 5555-5555-5555-4444.',
      );
      expect(resultMasker).toBe(
        'My card is **** **** **** 1234 and another is ****-****-****-4444.',
      );
    });
    it('should masker a creadit card with default patterns', () => {
      const resultMasker = processData.process('My card is 4111 2222 3333');
      expect(resultMasker).toBe('My card is 4111 2222 3333');
    });
    it('should masker a creadit card without masker because not apply default patterns by size card', () => {
      const textCard =
        'My card is 4111 1111 1111 and another is 5500-0000-0000-5678-4323.';
      const resultMasker = processData.process(textCard);
      expect(resultMasker).toBe(textCard);
    });
    it('should masker a creadit card with default patterns', () => {
      const input = '4111 1111 1111 1234 5678'; // 20 dígitos
      const resultMasker = processData.process(input);
      expect(resultMasker).toBe(input);
    });
  });

  describe('DoS limits', () => {
    let processData: ProcessDataService;

    beforeEach(() => {
      ProcessDataService['instance'] = null;
      processData = ProcessDataService.getInstance();
    });

    it('should keep default limits when configureLimits receives no overrides', () => {
      processData.configureLimits({});
      const resultMasker = processData.process('Some text');
      expect(resultMasker).toBe('Some text');
    });

    it('should stop recursion at maxDepth and return a placeholder', () => {
      processData.configureLimits({ maxDepth: 2 });
      const deep = { a: { b: { c: 'too deep' } } };
      const resultMasker = processData.process(deep);
      expect(resultMasker.a.b).toBe('[MAX_DEPTH_EXCEEDED]');
    });

    it('should truncate a long plain string before applying mask patterns', () => {
      processData.configureLimits({ maxStringLength: 10 });
      const longText = 'a'.repeat(50);
      const resultMasker = processData.process(longText);
      expect(resultMasker).toBe('a'.repeat(10) + '[TRUNCATED]');
    });

    it('should truncate a long text that looks like an object but fails to parse', () => {
      processData.configureLimits({ maxStringLength: 10 });
      const malformed = '{' + 'a'.repeat(50) + '}';
      const resultMasker = processData.process(malformed);
      expect(resultMasker).toBe(malformed.slice(0, 10) + '[TRUNCATED]');
    });
  });
});
