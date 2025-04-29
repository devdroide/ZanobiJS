import {
  PatternException,
  MSG_PATTERN_EXIST,
  MSG_SCHEMA_PATTERN_EXIST,
} from "../../../exceptions";
import {
  TClass,
  TConfigSchemaMasker,
  TPattern,
  TPatternBySchema,
} from "../../../interfaces";
import { AllTextPatternFactory } from "../patterns/allTextPattern.service";
import { AlternatePatternFactory } from "../patterns/alternatePattern.service";
import { CreditCardPatternFactory } from "../patterns/creditCardPattern.service";
import { EmailPatternFactory } from "../patterns/emailPattern.service";
import { FirstFourPatternFactory } from "../patterns/firstFourPattern.service";
import { LastFourPatternFactory } from "../patterns/lastFourPattern.service";
import { OnlyTextPatternFactory } from "../patterns/onlyTextPattern.service";
import { TextPatternFactory } from "../patterns/textPattern.service";
import { TokenPatternFactory } from "../patterns/tokenPattern.service";

export class ProviderPatternService {
  private readonly listPattern: TPattern = new Map();
  private readonly configSchema: TPatternBySchema = new Map();
  private static instance: ProviderPatternService;
  private readonly patternDefault: string[] = [];

  private constructor() {
    this.initialize();
  }

  static getInstance() {
    if (!ProviderPatternService.instance)
      ProviderPatternService.instance = new ProviderPatternService();
    return ProviderPatternService.instance;
  }

  private initialize() {
    this.listPattern.set("AllText", new AllTextPatternFactory());
    this.listPattern.set("Alternate", new AlternatePatternFactory());
    this.listPattern.set("Email", new EmailPatternFactory());
    this.listPattern.set("FirstFour", new FirstFourPatternFactory());
    this.listPattern.set("LastFour", new LastFourPatternFactory());
    this.listPattern.set("OnlyText", new OnlyTextPatternFactory());
    this.listPattern.set("Text", new TextPatternFactory());
    this.listPattern.set("Token", new TokenPatternFactory());
    this.listPattern.set("CreditCard", new CreditCardPatternFactory());
    this.patternDefault.push("Token");
    this.patternDefault.push("Email");
    this.patternDefault.push("CreditCard");
  }

  setupCustomPattern(
    namePattern: string,
    classPatternFactory: TClass,
    ispatternDefault: boolean,
  ): void {
    if (this.listPattern.has(namePattern)) {
      throw new PatternException(MSG_PATTERN_EXIST(namePattern));
    }
    this.listPattern.set(namePattern, new classPatternFactory());
    if (ispatternDefault) this.patternDefault.push(namePattern);
  }

  setupSchema(configSchema: TConfigSchemaMasker): void {
    for (const schemaName in configSchema) {
      if (this.configSchema.has(schemaName)) {
        throw new PatternException(MSG_SCHEMA_PATTERN_EXIST(schemaName, true));
      }
      this.configSchema.set(schemaName, configSchema[schemaName]);
    }
  }

  getSchema(schemaName: string) {
    if (!this.configSchema.has(schemaName)) {
      throw new PatternException(MSG_SCHEMA_PATTERN_EXIST(schemaName, false));
    }
    return this.configSchema.get(schemaName);
  }

  getKeyFromSchema(schemaName: string, key: string) {
    if (schemaName) {
      const schemaSelected = this.getSchema(schemaName);
      return !schemaSelected[key] ? this.patternDefault : schemaSelected[key];
    }
    return this.patternDefault;
  }

  apply(text: string, patterns: string[]): string {
    try {
      let resultMasker: string = text;
      patterns.forEach((patternName: string) => {
        if (this.listPattern.has(patternName)) {
          const pattern = this.listPattern.get(patternName)!;
          resultMasker = pattern.apply(resultMasker);
        }
      });
      return resultMasker;
    } catch {
      return text;
    }
  }
}
