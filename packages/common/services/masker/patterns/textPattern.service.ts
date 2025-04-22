import { ABSPattern, IPattern } from "../../../interfaces";

class TextPattern implements IPattern {
  private name: string = "textMasker";
  private static instance: TextPattern;
  private constructor() {}

  public static getInstance(): TextPattern {
    if (!TextPattern.instance)
      TextPattern.instance = new TextPattern();
    return TextPattern.instance;
  }
  mask(value: string): string {
    // Reemplazar espacios, guiones bajos y guiones medios con un solo delimitador para procesamiento
    const normalized = value.replace(/[\s_-]+/g, " ");
    // Dividir por espacios para obtener cada palabra
    const words = normalized.split(" ");

    // Procesar cada palabra
    const maskedWords = words.map((word) => {
      if (word.length <= 2) {
        return word;
      }
      // Mostrar las primeras 2 letras y enmascarar el resto
      return word.substring(0, 2) + "*".repeat(word.length - 2);
    });

    // Unir las palabras procesadas con un espacio
    return maskedWords.join(" ");
  }
}


export class TextPatternFactory extends ABSPattern {
  override createPattern(): IPattern {
    return TextPattern.getInstance();
  }
}
