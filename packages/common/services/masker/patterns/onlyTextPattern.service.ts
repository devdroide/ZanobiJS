import { ABSPattern, IPattern } from '../../../interfaces';

class OnlyTextPattern implements IPattern {
  private name: string = 'OnlyTextMasker';
  private static instance: OnlyTextPattern;
  private constructor() {}

  public static getInstance(): OnlyTextPattern {
    if (!OnlyTextPattern.instance)
      OnlyTextPattern.instance = new OnlyTextPattern();
    return OnlyTextPattern.instance;
  }
  mask(value: string): string {
    return value.replace(/[^a-zA-Z]/g, '*');
  }
}

export class OnlyTextPatternFactory extends ABSPattern {
  override createPattern(): IPattern {
    return OnlyTextPattern.getInstance();
  }
}
