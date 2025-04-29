import { ABSPattern, IPattern } from "../../../interfaces";

class TokenPattern implements IPattern {
  private static instance: TokenPattern;

  private constructor() {}

  public static getInstance(): TokenPattern {
    if (!TokenPattern.instance) {
      TokenPattern.instance = new TokenPattern();
    }
    return TokenPattern.instance;
  }

  public mask(value: string): string {
    // Regex que busca tokens Bearer o Basic
    const tokenRegex = /\b(Bearer|Basic)\s+([a-z0-9_\-.=+/]{6,})/gi;

    return value.replace(tokenRegex, (match, scheme, token) => {
      const visible = token.slice(-2);
      return `${scheme} ******${visible}`;
    });
  }
}


export class TokenPatternFactory extends ABSPattern {
  override createPattern(): IPattern {
    return TokenPattern.getInstance();
  }
}
