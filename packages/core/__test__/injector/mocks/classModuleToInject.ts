import { Module } from '@zanobijs/common';
import {
  Controller1,
  Controller2,
  Controller3,
  Controller4,
  Controller5,
  Service1,
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
