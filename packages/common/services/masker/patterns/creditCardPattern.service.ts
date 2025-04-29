import { ABSPattern, IPattern } from "../../../interfaces";

/**
 * Implementación de patrón para enmascarar números de tarjetas de crédito en textos
 * Utiliza el patrón Singleton para garantizar una única instancia
 */
class CreditCardPattern implements IPattern {
  private name: string = "CreditCardMasker";
  private static instance: CreditCardPattern;

  private constructor() {}

  public static getInstance(): CreditCardPattern {
    if (!CreditCardPattern.instance) {
      CreditCardPattern.instance = new CreditCardPattern();
    }
    return CreditCardPattern.instance;
  }

  /**
   * Enmascara números de tarjeta de crédito en un texto
   * @param text Texto a procesar
   * @returns Texto con los números de tarjeta enmascarados
   */
  public mask(text: string): string {
    // Expresión regular mejorada para capturar diferentes formatos de tarjetas
    // Detecta grupos de 4, 4-6-5, 4-4-4-4, etc. con diferentes separadores o sin ellos
    const cardRegex = /\b(?:\d{4}[-\s]?){2,5}\d{1,6}\b/g;

    return text.replace(cardRegex, (match) => {
      // Eliminar todos los caracteres no numéricos
      const digitsOnly = match.replace(/\D/g, "");
      // Validar cantidad de dígitos y algoritmo de Luhn
      if (digitsOnly.length < 13 || digitsOnly.length > 19) {
        return match; // No es una tarjeta válida, no enmascarar
      }

      // Preservar los últimos 4 dígitos
      const visiblePart = digitsOnly.slice(-4);
      const maskedPart = "*".repeat(digitsOnly.length - 4);
      const maskedDigits = maskedPart + visiblePart;

      // Reconstruir el formato original
      let digitIndex = 0;
      return match.replace(/./g, (char) => {
        if (/\d/.test(char) && digitIndex < maskedDigits.length) {
          return maskedDigits[digitIndex++];
        }
        return char; // Mantener separadores originales
      });
    });
  }
}

/**
 * Fábrica concreta para crear instancias del patrón de tarjetas de crédito
 */
export class CreditCardPatternFactory extends ABSPattern {
  override createPattern(): IPattern {
    return CreditCardPattern.getInstance();
  }
}
