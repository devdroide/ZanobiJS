import { Controller, Injectable } from "@zanobijs/common";

@Injectable()
export class ServiceToService {
  constructor() {}
}

@Injectable()
export class Service {
  constructor() {}
}

@Injectable()
export class ServiceToController {
  constructor() {}
}

@Controller()
export class ControllerWithDepenClass {
  constructor(private servicio: ServiceToController) {}
}
