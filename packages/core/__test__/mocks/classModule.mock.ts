import { Module } from "@zanobijs/common";
import { ControllerWithDepenClass, ServiceToController } from "./classWithDependeciesClass.mock";
import { ControllerWithDepen2, ServiceToController2 } from "./classWithDependeciesInject.mock";

@Module({
  imports: [],
  controllers: [],
  services: [],
  exports: [],
})
export class ModuleTestEmpty {}

@Module({
  imports: [],
  controllers: [ControllerWithDepenClass],
  services: [ServiceToController],
  exports: [],
})
export class ModuleTest {}

@Module({
  imports: [],
  controllers: [ControllerWithDepen2],
  services: [
    ServiceToController2,
    {
      provider: "API_KEY",
      useValue: "isApiKey_qwerty12345"
    },
  ],
  exports: [],
})
export class ModuleTestWithInjector {}

@Module({
  imports: [ModuleTestWithInjector],
  controllers: [],
  services: [],
  exports: [],
})
export class ModuleTestWithImports {}

@Module({
  imports: [ModuleTestWithInjector],
  controllers: [ControllerWithDepen2],
  services: [
    ServiceToController2,
    {
      provider: "API_SECRET",
      useValue: "isApiSecret_cvbdfgert"
    },
  ],
  exports: [],
})
export class ModuleTestAll {}
