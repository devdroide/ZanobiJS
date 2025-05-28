import { Module } from '@zanobijs/common';
import {
  ABSServiceRepository,
  Controller1,
  Controller2,
  Controller3,
  Controller4,
  Controller5,
  RepositoryImplements,
  Service1,
  ServiceUseCase,
  ServiceUseFactory,
  ServiceWithoutInjectable,
} from './classDependenciesToInject';

// ==================================================
// ========= Module to Test Injector ================
// ==================================================

@Module({
  imports: [],
  controllers: [Controller1, Controller2],
  services: [
    Service1,
    {
      provider: 'TEXT_INJECT',
      useValue: 'Hello world inject',
    },
  ],
  exports: [],
})
export class Module1 {}

@Module({
  imports: [],
  controllers: [],
  services: [
    ServiceUseCase,
    {
      provider: ABSServiceRepository,
      useClass: RepositoryImplements,
    },
  ],
  exports: [],
})
export class ModuleRepository {}

// ==================================================
// ===========Module to Test Module =================
// ==================================================

@Module({
  imports: [],
  controllers: [],
  services: [],
  exports: [],
})
export class ModuleTestEmpty {}

@Module({
  imports: [Module1],
  controllers: [],
  services: [],
  exports: [],
})
export class Module2 {}

@Module({
  imports: [],
  controllers: [Controller3, Controller4],
  services: [],
  exports: [],
})
export class Module3 {}

@Module({
  imports: [],
  controllers: [Controller5],
  services: [
    Service1,
    {
      provider: 'TEXT_INJECT',
      useValue: 'Hello world inject',
    },
  ],
  exports: [],
})
export class Module4 {}

@Module({
  imports: [],
  controllers: [Controller5],
  services: [
    ServiceUseFactory,
    {
      provider: 'NUMBER_FACTORY',
      useFactory: () => {
        return 45;
      },
    },
  ],
  exports: [],
})
export class ModuleFactory {}

@Module({
  imports: [],
  controllers: [Controller5],
  services: [
    ServiceUseFactory,
    {
      provider: Service1,
      useFactory: () => {
        return 45;
      },
    },
    {
      provider: Service1,
      useValue: 'SOME TEXT',
    },
    {
      provider: 'MyService1',
      useClass: Service1,
    },
  ],
  exports: [],
})
export class ModuleProviderError {}

@Module({
  imports: [],
  controllers: [Controller5],
  services: [
    {
      provider: 'MyService1',
      useClass: ServiceWithoutInjectable,
    },
  ],
  exports: [],
})
export class ModuleProviderWithoutInjectable {}
