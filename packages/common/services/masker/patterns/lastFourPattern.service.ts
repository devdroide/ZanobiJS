import { ABSPattern, IPattern } from '../../../interfaces';

class LastFourPattern implements IPattern {
  private name: string = 'LasFourMasker';
  private static instance: LastFourPattern;
  private constructor() {}

  public static getInstance(): LastFourPattern {
    if (!LastFourPattern.instance)
      LastFourPattern.instance = new LastFourPattern();
    return LastFourPattern.instance;
  }

  mask(value: string): string {
    if (value.length <= 4) {
      return value;
    }
    const visiblePart = value.slice(-4);
    const maskedPart = '*'.repeat(value.length - 4);
    return `${maskedPart}${visiblePart}`;
  }
}

export class LastFourPatternFactory extends ABSPattern {
  override createPattern(): IPattern {
    return LastFourPattern.getInstance();
  }
}
