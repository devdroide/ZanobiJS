import { Controller, Inject } from '../../index';
import { ServiceOnly } from './services.mock';

@Controller()
export class ControllerOnly {}

@Controller()
export class ControllerWithoutArg {
  constructor() {}
}

@Controller()
export class ControllerWithMethod {
  getHello() {
    return 'Hello ServiceOnly';
  }
}

@Controller()
export class ControllerWithParameter {
  constructor(private userName: string) {}
  getUserName() {
    return this.userName;
  }
}

@Controller()
export class ControllerWithService {
  constructor(private serviceOnly: ServiceOnly) {}
  getHello() {
    return this.serviceOnly.getHello();
  }
}

@Controller()
export class ControllerWithInject {
  constructor(@Inject('API_KEY') private apiKey: string) {}
  getApiKey() {
    return this.apiKey;
  }
}

@Controller()
export class ControllerMix {
  private varTest: string = '1';
  constructor(
    private serviceOnly: ServiceOnly,
    @Inject('API_KEY') private apiKey: string,
    private userName: string,
  ) {}
  getHello() {
    return this.serviceOnly.getHello();
  }
  getApiKey() {
    return this.apiKey;
  }
  getUserName() {
    return this.userName;
  }
}
