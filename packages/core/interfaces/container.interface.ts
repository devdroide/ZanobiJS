export interface IContainerAdapter {
  register(classes: any): void;
  resolve<T>(className: string): T;
  dispose(): Promise<void>;
}
