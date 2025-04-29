export interface IPattern {
  mask(value: string): string;
}

export type TPattern = Map<string, ABSPattern>;
export type TPatternByKey = { [key: string]: string[] };
export type TPatternBySchema = Map<string, TPatternByKey>;
export type TConfigSchemaMasker = { [key: string]: TPatternByKey };
export type TClass<T = any> = { new (...args: any[]): T };


export abstract class ABSPattern {
  abstract createPattern(): IPattern;
  apply(text: string): string {
    const pattern = this.createPattern();
    return pattern.mask(text);
  }
}
