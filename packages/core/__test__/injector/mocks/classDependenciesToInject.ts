import { Controller, Inject, Injectable } from '@zanobijs/common';

// ==================================================
// ============= Service to Inject ==================
// ==================================================

@Injectable()
export class Service1 {
  constructor(@Inject('TEXT_INJECT') private textInj: string) {}

  getDataService() {
    return this.textInj;
  }
}

@Injectable()
export class Service2 {
  constructor(
    private s1: Service1,
    @Inject('TEXT_INJECT') private textInj: string,
  ) {}

  getDataService() {
    return this.textInj;
  }

  getDataServiceDepencies() {
    return this.s1.getDataService();
  }
}

@Injectable()
export abstract class ABSServiceRepository {
  abstract getDataService(): string;
}

@Injectable()
export class RepositoryImplements implements ABSServiceRepository {
  getDataService() {
    return 'Hello from repository implementation';
  }
}

@Injectable()
export class ServiceUseCase {
  constructor(private repositoryImp: ABSServiceRepository) {}

  getDataImp() {
    return this.repositoryImp.getDataService();
  }
}

// ==================================================
// =========== Controller to Inject =================
// ==================================================

@Controller()
export class Controller1 {
  constructor() {}

  geData() {
    return 'Hello world';
  }
}

@Controller()
export class Controller2 {
  constructor(@Inject('SOME_INJECT') private someInj: string) {}

  geData() {
    return 'Hello world';
  }
}

@Controller()
export class Controller3 {
  constructor(private serv1: Service1) {}

  geData() {
    return 'Hello world';
  }
}

@Controller()
export class Controller4 {
  constructor(private serv1: Service1) {}

  geData() {
    return 'Hello world';
  }
}

@Controller()
export class Controller5 {
  constructor(
    private serv1: Service1,
    @Inject('TEXT_INJECT') private textInject: string,
  ) {}

  geData() {
    return this.textInject;
  }
}
