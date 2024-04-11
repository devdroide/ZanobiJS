import { Module } from "@zanobijs/common";
import {
  ControllerWithDepenClass,
  ServiceToController,
} from "./classWithDependeciesClass.mock";
import {
  ControllerWithDepen2,
  ControllerDepenNoExists,
  ServiceToController2,
} from "./classWithDependeciesInject.mock";

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
  controllers: [ControllerDepenNoExists],
  services: [
    ServiceToController2,
    {
      provider: "API_KEY",
      useValue: "isApiKey_qwerty12345",
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
      useValue: "isApiSecret_cvbdfgert",
    },
    {
      provider: "API_WITHOUT_USE",
      useValue: "no use data",
    },
  ],
  exports: [],
})
export class ModuleTestAll {}

@Module({
  imports: [ModuleTestWithInjector],
  controllers: [],
  services: [
    {
      provider: "API_NUMBER",
      useValue: 1600,
    },
    {
      provider: "API_BOOLEAN",
      useValue: true,
    },
    {
      provider: "4PI_BOOLEAN",
      useValue: true,
    },
    {
      provider: "API_CLASS",
      useValue: new ServiceToController(),
    },
    {
      provider: "API_FUNCTION",
      useValue: function fnTest() {
        return 2;
      },
    },
    {
      provider: "12345",
      useValue: "no use data",
    },
  ],
  exports: [],
})
export class ModuleTestProviderWithout {}
