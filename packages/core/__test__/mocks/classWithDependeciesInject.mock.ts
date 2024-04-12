import { Controller, Inject, Injectable } from "@zanobijs/common";

@Injectable()
export class ServiceToController2 {
  constructor() {}
  getHello() {
    return "Hello ServiceToController2";
  }
}

@Injectable()
export class ServiceWithDepenParam {
  constructor(
    private servicio: ServiceToController2,
    @Inject("USER_NAME") private userName: string,
    @Inject("USER_AGE") private userAge: number,
    @Inject("USER_LOGIN") private userLogin: boolean,
    @Inject("USER_LIKE") private userHobbis: string[],
  ) {}
}

@Controller()
export class ControllerWithDepen2 {
  constructor(
    private sContro2: ServiceToController2,
    @Inject("API_KEY") private apiKey: string,
  ) {}

  getApiKey() {
    return this.apiKey;
  }
  getHelloService() {
    return this.sContro2.getHello();
  }
}

@Controller()
export class ControllerDepenNoExists {
  constructor(
    private sContro2: ServiceToController2,
    @Inject("SOMEKEY") private someKey: string,
  ) {}

  getApiKey() {
    return this.someKey;
  }
  getHelloService() {
    return this.sContro2.getHello();
  }
}

@Controller()
export class ControllerDepenOtherModules {
  constructor(
    private sContro2: ServiceToController2,
    @Inject("4PI_BOOLEAN") private apiBolean: string,
    @Inject("API_NUMBER") private apiNumber: string,
    @Inject("API_BOOLEAN") private apiBoolean: string,
    @Inject("API_CLASS") private apiClass: string,
    @Inject("API_FUNCTION") private apiFunction: string,
  ) {}

  getDataProvider() {
    console.log("Cont sContro2", this.sContro2.getHello());
    console.log("Cont 4PI_BOOLEAN", this.apiBolean);
    console.log("Cont API_NUMBER", this.apiNumber);
    console.log("Cont API_BOOLEAN", this.apiBoolean);
    console.log("Cont API_CLASS", this.apiClass);
    console.log("Cont API_FUNCTION", this.apiFunction);
    return this.apiBolean;
  }
  getHelloService() {
    return this.sContro2.getHello();
  }
}


@Injectable()
export class ServiceWithDepen2 {
  constructor(
    private serviceWithDepenParam: ServiceWithDepenParam,
    @Inject("API_KEY") private api_key: string,
  ) {}
}
