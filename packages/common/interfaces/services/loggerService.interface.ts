export interface IOptionsLog {
  withColor: boolean;
}
export interface ILoggerService {
  info: (message: string, arg?: any, ...otherArg: any) => void;
  warn: (message: string, arg?: any, ...otherArg: any) => void;
  error: (message: string, arg?: any, ...otherArg: any) => void;
  success: (message: string, arg?: any, ...otherArg: any) => void;
  debug: (message: string, arg?: any, ...otherArg: any) => void;
  important?: (message: string, arg?: any, ...otherArg: any) => void;
}
