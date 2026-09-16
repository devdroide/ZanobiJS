export interface IOptionsLog {
  withColor: boolean;
  /** Profundidad máxima de recorrido recursivo del masker. Default: 10. */
  maxDepth?: number;
}
export interface ILoggerService {
  info: (message: string, arg?: any, ...otherArg: any) => void;
  warn: (message: string, arg?: any, ...otherArg: any) => void;
  error: (message: string, arg?: any, ...otherArg: any) => void;
  success: (message: string, arg?: any, ...otherArg: any) => void;
  debug: (message: string, arg?: any, ...otherArg: any) => void;
  important?: (message: string, arg?: any, ...otherArg: any) => void;
}
