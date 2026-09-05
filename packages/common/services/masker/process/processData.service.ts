import {
  isArray,
  isObjectString,
  isArrayString,
  isObject,
} from '../../../utils/shared.utils';
import { ProviderPatternService } from './providerPattern.service';

/**
 * Valor de reemplazo cuando el recorrido recursivo del masker alcanza
 * `maxDepth`. Evita `RangeError: Maximum call stack size exceeded` ante
 * un payload con anidamiento profundo (accidental o adversarial).
 */
export const MAX_DEPTH_PLACEHOLDER = '[MAX_DEPTH_EXCEEDED]';

/**
 * Sufijo agregado cuando un texto supera `maxStringLength` y se recorta
 * antes de aplicarle los patrones de enmascarado (protege contra el costo
 * de correr regex sobre strings arbitrariamente grandes).
 */
export const TRUNCATED_SUFFIX = '[TRUNCATED]';

const DEFAULT_MAX_DEPTH = 10;
const DEFAULT_MAX_STRING_LENGTH = 10000;

/**
 * Servicio para procesasar y enmascarar datos según diferentes patrones
 */
export class ProcessDataService {
  private static instance: ProcessDataService;
  private providerPattern: ProviderPatternService =
    ProviderPatternService.getInstance();
  private schemaNamaSelected: string;
  private maxDepth: number = DEFAULT_MAX_DEPTH;
  private maxStringLength: number = DEFAULT_MAX_STRING_LENGTH;

  private constructor() {}

  /**
   * Obtiene la instancia singleton para el proceso de la información
   */
  public static getInstance(): ProcessDataService {
    if (!ProcessDataService.instance) {
      ProcessDataService.instance = new ProcessDataService();
    }
    return ProcessDataService.instance;
  }

  /**
   * Configura los límites de protección contra DoS del masker. Los valores
   * no provistos conservan su default (`maxDepth: 10`, `maxStringLength: 10000`).
   * @param options.maxDepth Profundidad máxima de recorrido recursivo.
   * @param options.maxStringLength Longitud máxima de texto antes de enmascarar.
   */
  configureLimits(options: {
    maxDepth?: number;
    maxStringLength?: number;
  }): void {
    if (options.maxDepth !== undefined) this.maxDepth = options.maxDepth;
    if (options.maxStringLength !== undefined)
      this.maxStringLength = options.maxStringLength;
  }

  /**
   * Selecciona el nombre del esquema con el que desea enmascar información segun el patron de cada llave
   * @param schemaName Nombre del esquema a seleccionar
   * @returns Toda la clase para ser usado como "builder"
   */
  selectSchema(schemaName: string): this {
    this.schemaNamaSelected = schemaName;
    return this;
  }

  /**
   * Coloca en indefinido el nombre del esquema seleccionado para que no hayan errores al momento de enmascarar
   * la información.
   */
  deselectSchema(): void {
    this.schemaNamaSelected = undefined;
  }

  /**
   * Busca la estrategia del procesamiento de la información, además en caso de que venga esa
   * información venga de un proceso anidado y sea parte de un objeto recibe la llave para que
   * se pueda enmascarar segun el patrón seleccionado para esa llave en el esquema seleccionado
   * @param data Información a procesar
   * @param key Llave de un esquema en caso de proceso anidado
   * @param depth Profundidad actual del recorrido recursivo (uso interno).
   * @returns Información procesada y enmascarada
   */
  process(data: any, key?: string, depth: number = 0) {
    if (depth >= this.maxDepth) {
      return MAX_DEPTH_PLACEHOLDER;
    }
    if (isObject(data)) {
      return this.processObject(data, depth);
    } else if (isArray(data)) {
      return this.processArray(data, key, depth);
    } else {
      const patterns = this.providerPattern.getKeyFromSchema(
        this.schemaNamaSelected,
        key,
      );
      return this.processString(String(data), key, patterns, depth);
    }
  }

  /**
   * Realiza el procesamiento de enmascarar un objeto
   * @param obj Objecto a procesar
   * @param depth Profundidad actual del recorrido recursivo.
   * @returns Información procesada y enmascarada
   */
  private processObject(obj: { [key: string]: any }, depth: number) {
    const processedObject = {};
    for (const key in obj) {
      processedObject[key] = this.process(obj[key], key, depth + 1);
    }
    return processedObject;
  }

  /**
   * Realiza el procesamiento de enmascarar un array
   * @param array Array a procesar
   * @param key Llave de un esquema en caso de proceso anidado
   * @param depth Profundidad actual del recorrido recursivo.
   * @returns Información procesada y enmascarada
   */
  private processArray(array: any[], key: string, depth: number) {
    const resultArray = [];
    array.forEach((item, index) => {
      resultArray[index] = this.process(item, key, depth + 1);
    });

    return resultArray;
  }

  /**
   * Realiza el procesamiento de enmascarar un un string, adicional valida si el
   * la información enviada puede ser un objeto o array convertido a string, en caso
   * tal le hace un parse para convetirlo objeto o array y la estrategia de procesamiento
   * decida como procesa esa información
   * @param text Texto a procesar
   * @param key Llave de un esquema en caso de proceso anidado
   * @param patterns Patrones de enmascaramiento segun una configuración de esquema
   * @param depth Profundidad actual del recorrido recursivo.
   * @returns Información procesada y enmascarada
   */
  private processString(
    text: string,
    key: string,
    patterns: string[],
    depth: number,
  ) {
    if (isObjectString(text) || isArrayString(text)) {
      try {
        const parsed = JSON.parse(text.trim());
        return this.process(parsed, key, depth + 1);
      } catch {
        return this.providerPattern.apply(this.safeguardLength(text), patterns);
      }
    }
    const result = this.providerPattern.apply(
      this.safeguardLength(text),
      patterns,
    );
    return result;
  }

  /**
   * Recorta `text` a `maxStringLength` antes de pasarlo a los patrones de
   * enmascarado (regex) — el costo de aplicar patrones es proporcional al
   * tamaño del texto, sin este corte un string arbitrariamente grande
   * (accidental o adversarial) corre igual contra los 9 patrones.
   * @param text Texto candidato a enmascarar.
   */
  private safeguardLength(text: string): string {
    return text.length > this.maxStringLength
      ? text.slice(0, this.maxStringLength) + TRUNCATED_SUFFIX
      : text;
  }
}
