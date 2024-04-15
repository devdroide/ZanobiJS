import { Module } from "@zanobijs/common";
import { Controller1, Controller6 } from "./classDependencies.mock";

@Module({
  imports: [],
  controllers: [],
  services: [],
  exports: [],
})
export class ModuleEmpty {}

@Module({
  imports: [],
  controllers: [Controller1],
  services: [
    {
      provider: "TEXT_INJECT",
      useValue: "Hello world inject",
    },
  ],
  exports: [],
})
export class Module1 {}

@Module({
  imports: [Module1],
  controllers: [],
  services: [],
  exports: [],
})
export class Module2 {}

@Module({
  imports: [Module1],
  controllers: [],
  services: [],
  exports: [],
})
export class Module3 {}

@Module({
  imports: [],
  controllers: [Controller6],
  services: [],
  exports: [],
})
export class Module4 {}
