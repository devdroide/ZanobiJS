import { ABSPattern, IPattern } from '../../../interfaces';

class FirstFourPattern implements IPattern {
  private name: string = 'FirstFourMasker';
  private static instance: FirstFourPattern;
  private constructor() {}

  static getInstance() {
    if (!FirstFourPattern.instance)
      FirstFourPattern.instance = new FirstFourPattern();
    return FirstFourPattern.instance;
  }

  mask(value: string): string {
    if (value.length <= 4) {
      return value;
    }
    const visiblePart = value.slice(0, 4);
    const maskedPart = '*'.repeat(value.length - 4);
    return `${visiblePart}${maskedPart}`;
  }
}

export class FirstFourPatternFactory extends ABSPattern {
  override createPattern(): IPattern {
    return FirstFourPattern.getInstance();
  }
}
