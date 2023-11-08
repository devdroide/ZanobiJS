export interface ILoggerService {
    info(message: string, ...arg: any): void;
    warn(message: string, ...arg: any): void;
    error(message: string, ...arg: any): void;
    success(message: string, ...arg: any): void;
    debug(message: string, ...arg: any): void;
}
