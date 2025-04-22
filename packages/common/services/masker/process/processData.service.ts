import {
  isArray,
  isObjectString,
  isArrayString,
  isObject,
} from "../../../utils/shared.utils";
import { ProviderPatternService } from "./providerPattern.service";

/**
 * Servicio para procesasar y enmascarar datos según diferentes patrones
 */
export class ProcessDataService {
  private static instance: ProcessDataService;
  private providerPattern: ProviderPatternService =
    ProviderPatternService.getInstance();
  private schemaNamaSelected: string;

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
   * @returns Información procesada y enmascarada
   */
  process(data: any, key?: string) {
    if (isObject(data)) {
      return this.processObject(data);
    } else if (isArray(data)) {
      return this.processArray(data, key);
    } else {
      const patterns = this.providerPattern.getKeyFromSchema(
        this.schemaNamaSelected,
        key,
      );
      return this.processString(String(data), key, patterns);
    }
  }

  /**
   * Realiza el procesamiento de enmascarar un objeto
   * @param obj Objecto a procesar
   * @param key Llave de un esquema en caso de proceso anidado
   * @returns Información procesada y enmascarada
   */
  private processObject(obj: { [key: string]: any }) {
    const processedObject = {};
    for (const key in obj) {
      processedObject[key] = this.process(obj[key], key);
    }
    return processedObject;
  }

  /**
   * Realiza el procesamiento de enmascarar un array
   * @param array Array a procesar
   * @param key Llave de un esquema en caso de proceso anidado
   * @returns Información procesada y enmascarada
   */
  private processArray(array: any[], key: string) {
    const resultArray = [];
    array.forEach((item, index) => {
      resultArray[index] = this.process(item, key);
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
   * @returns Información procesada y enmascarada
   */
  private processString(text: string, key: string, patterns: string[]) {
    if (isObjectString(text) || isArrayString(text)) {
      try {
        const parsed = JSON.parse(text.trim());
        return this.process(parsed, key);
      } catch {
        return this.providerPattern.apply(text, patterns);
      }
    }
    const result = this.providerPattern.apply(text, patterns);
    return result;
  }
}
