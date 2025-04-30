import { ABSPattern, IPattern } from '../../interfaces';

class CustomTestPatternMock implements IPattern {
  private name: string = 'CustomTestMasker';
  private static instance: CustomTestPatternMock;
  private constructor() {}

  public static getInstance(): CustomTestPatternMock {
    if (!CustomTestPatternMock.instance)
      CustomTestPatternMock.instance = new CustomTestPatternMock();
    return CustomTestPatternMock.instance;
  }
  mask(value: string): string {
    return 'CustomPattern*'.repeat(value.length);
  }
}

export class CustomTestPatternMockFactory extends ABSPattern {
  override createPattern(): IPattern {
    return CustomTestPatternMock.getInstance();
  }
}
