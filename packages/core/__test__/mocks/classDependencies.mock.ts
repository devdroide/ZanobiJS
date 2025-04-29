import { Controller, Inject, Injectable } from "@zanobijs/common";

// ==================================================
// ============= Service to Inject ==================
// ==================================================

@Injectable()
export class Service1 {
  constructor(@Inject("TEXT_INJECT") private textInj: string) {}

  getDataService() {
    return this.textInj;
  }
}

@Injectable()
export class Service2 {
  constructor() {}

  getDataService() {
    return "Hello from service 2";
  }
}

@Injectable()
export class Service3 {
  constructor(
    private sev2: Service2,
    @Inject("TEXT_INJECT") private textInj: string,
  ) {}

  getDataTextInject() {
    return this.textInj;
  }

  getDataService2() {
    return this.sev2.getDataService();
  }
}

// ==================================================
// =========== Controller to Inject =================
// ==================================================

@Controller()
export class Controller1 {
  constructor() {}

  getData() {
    return "Hello world";
  }
}

@Controller()
export class Controller2 {
  constructor(@Inject("SOME_INJECT") private someInj: string) {}

  geData() {
    return "Hello world";
  }
}

@Controller()
export class Controller3 {
  constructor(private serv1: Service1) {}

  geData() {
    return "Hello world";
  }
}

@Controller()
export class Controller4 {
  constructor(private serv1: Service1) {}

  geData() {
    return "Hello world";
  }
}

@Controller()
export class Controller5 {
  constructor(
    private serv1: Service1,
    @Inject("TEXT_INJECT") private textInject: string,
  ) {}

  geData() {
    return this.textInject;
  }
}

@Controller()
export class Controller6 {
  constructor(private serv2: Service2) {}

  geData() {
    return this.serv2.getDataService();
  }
}

@Controller()
export class Controller7 {
  private varTestNumber: number = 10;
  private varTestString: string = "Esto es una cadena";
  constructor(
    @Inject("SOME_INJECT") private someInj: string,
    private serv2: Service2,
  ) {}

  geData() {
    return this.serv2.getDataService();
  }
}
