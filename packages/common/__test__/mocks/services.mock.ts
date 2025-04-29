import { Inject, Injectable } from "../../index";

@Injectable()
export class ServiceOnly {
  getHello() {
    return "Hello ServiceOnly";
  }
}
@Injectable()
export class ServiceWithParameter {
  constructor(private userName: string) {}
  getUserName() {
    return this.userName;
  }
}

@Injectable()
export class ServiceWithService {
  constructor(private serviceOnly: ServiceOnly) {}
  getHello() {
    return this.serviceOnly.getHello();
  }
}

@Injectable()
export class ServiceWithInject {
  constructor(@Inject("API_KEY") private apiKey: string) {}
  getApiKey() {
    return this.apiKey;
  }
}

@Injectable()
export class ServiceMix {
  constructor(
    private serviceOnly: ServiceOnly,
    @Inject("API_KEY") private apiKey: string,
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
