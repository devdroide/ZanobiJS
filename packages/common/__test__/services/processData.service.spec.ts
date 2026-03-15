import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { ProcessDataService } from "../../services/masker/process/processData.service";
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
    let selectSchemaSpy: any;

    beforeEach(() => {
      ProcessDataService['instance'] = null;
      processData = ProcessDataService.getInstance();
      selectSchemaSpy = vi.spyOn(processData, 'selectSchema');
    });
    it('should call once th select schema', () => {
      processData.selectSchema('requestSchema');
      expect(selectSchemaSpy).toHaveBeenCalled();
    });
    it('should masker the fields with schema config [id]', () => {
      const resultMasker = processData
        .selectSchema('requestSchema')
        .process(dataMock);
      expect(resultMasker.id).toEqual('****5678');
      expect(resultMasker.user).toEqual('*********');
      expect(resultMasker.name).toEqual(dataMock.name);
    });
    it('should masker the fields with default', () => {
      const resultMasker = processData
        .selectSchema('requestSchema')
        .process(dataToDefaultMock);
      expect(resultMasker.authorizationBasic).toEqual('Basic ******32');
    });
    it('should masker a string (token) with default patterns', () => {
      const resultMasker = processData
        .selectSchema('requestSchema')
        .process('Bearer tEst12345');
      expect(resultMasker).toEqual('Bearer ******45');
    });
    it('should masker a string (email) with default patterns', () => {
      const resultMasker = processData
        .selectSchema('requestSchema')
        .process(dataToDefaultMock.email);
      expect(resultMasker).toEqual('de******e@g****.com');
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
      expect(resultMasker).toEqual('Bearer ******45');
    });
    it('should response a text without masker because not apply default patterns', () => {
      const resultMasker = processData.process('Some text');
      expect(resultMasker).toEqual('Some text');
    });
    it('should masker a creadit card with default patterns', () => {
      const resultMasker = processData.process(
        'My card is 4111 1111 1111 1234 and another is 5555-5555-5555-4444.',
      );
      expect(resultMasker).toEqual(
        'My card is **** **** **** 1234 and another is ****-****-****-4444.',
      );
    });
    it('should masker a creadit card with default patterns', () => {
      const resultMasker = processData.process('My card is 4111 2222 3333');
      expect(resultMasker).toEqual('My card is 4111 2222 3333');
    });
    it('should masker a creadit card without masker because not apply default patterns by size card', () => {
      const textCard =
        'My card is 4111 1111 1111 and another is 5500-0000-0000-5678-4323.';
      const resultMasker = processData.process(textCard);
      expect(resultMasker).toEqual(textCard);
    });
    it('should masker a creadit card with default patterns', () => {
      const input = '4111 1111 1111 1234 5678'; // 20 dígitos
      const resultMasker = processData.process(input);
      expect(resultMasker).toEqual(input);
    });
  });
});
