import { Module } from '@zanobijs/common';
import {
  AbsUserRepository,
  Controller1,
  Controller6,
  Controller7,
  ControllerUser,
  RegisterUserUseCase,
  UserImplements,
} from './classDependencies.mock';

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
      provider: 'TEXT_INJECT',
      useValue: 'Hello world inject',
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

@Module({
  imports: [Module1],
  controllers: [Controller7],
  services: [],
  exports: [],
})
export class Module5 {}

@Module({
  imports: [],
  controllers: [ControllerUser],
  services: [
    {
      provider: 'TEXT_INJECT',
      useValue: 'Hello world inject',
    },
    {
      provider: AbsUserRepository,
      useClass: UserImplements,
    },
    RegisterUserUseCase,
  ],
  exports: [],
})
export class ModuleRepository {}
