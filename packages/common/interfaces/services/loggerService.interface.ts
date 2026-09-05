import { TConfigSchemaMasker } from './patternService.interface';

export interface IOptionsLog {
  withColor: boolean;
  activeMasker?: boolean;
  configSchemaMasker?: TConfigSchemaMasker;
  /** Profundidad máxima de recorrido recursivo del masker. Default: 10. */
  maxDepth?: number;
  /** Longitud máxima (caracteres) de un texto antes de aplicarle patrones de enmascarado. Default: 10000. */
  maxStringLength?: number;
}
export interface ILoggerService {
  info: (message: string, arg?: any, ...otherArg: any) => void;
  warn: (message: string, arg?: any, ...otherArg: any) => void;
  error: (message: string, arg?: any, ...otherArg: any) => void;
  success: (message: string, arg?: any, ...otherArg: any) => void;
  debug: (message: string, arg?: any, ...otherArg: any) => void;
  important?: (message: string, arg?: any, ...otherArg: any) => void;
}

export interface ILoggerUserService extends ILoggerService {
  masker: (schemaName: string) => this;
}
