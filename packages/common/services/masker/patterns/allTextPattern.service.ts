import { ABSPattern, IPattern } from "../../../interfaces";

class AllTextPattern implements IPattern {
  private name: string = "AllTextMasker";
  private static instance: AllTextPattern;
  private constructor() {}

  public static getInstance(): AllTextPattern {
    if (!AllTextPattern.instance)
      AllTextPattern.instance = new AllTextPattern();
    return AllTextPattern.instance;
  }
  mask(value: string): string {
    return "*".repeat(value.length);
  }
}


export class AllTextPatternFactory extends ABSPattern {
  override createPattern(): IPattern {
    return AllTextPattern.getInstance();
  }
}
