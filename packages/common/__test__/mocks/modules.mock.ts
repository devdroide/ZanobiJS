import { Module } from "../../index";
import { ControllerOnly } from "./controllers.mock";

@Module({
  imports: [],
  controllers: [],
  services: [],
  exports: [],
})
export class ModuleEmpty {}

@Module({
  imports: [],
  controllers: [ControllerOnly],
  services: [],
  exports: [],
})
export class ModuleWithController {}

