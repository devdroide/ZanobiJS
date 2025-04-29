import { ABSPattern, IPattern } from "../../../interfaces";

class AlternatePattern implements IPattern {
  private static instance: AlternatePattern;
  private constructor() {}

  public static getInstance(): AlternatePattern {
    if (!AlternatePattern.instance)
      AlternatePattern.instance = new AlternatePattern();
    return AlternatePattern.instance;
  }
  mask(value: string): string {
    let result = "";
    let i = 0;

    while (i < value.length) {
      // Mostrar 2 caracteres
      const visiblePart = value.substring(i, Math.min(i + 2, value.length));
      result += visiblePart;
      i += 2;

      // Ocultar 4 caracteres o lo que quede
      const charsToMask = Math.min(4, value.length - i);
      if (charsToMask > 0) {
        result += "*".repeat(charsToMask);
        i += charsToMask;
      }
    }

    return result;
  }
}

export class AlternatePatternFactory extends ABSPattern {
  override createPattern(): IPattern {
    return AlternatePattern.getInstance();
  }
}
