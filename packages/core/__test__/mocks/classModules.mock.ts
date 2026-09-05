import { Module } from '@zanobijs/common';
import {
  AbsUserRepository,
  Controller1,
  Controller6,
  Controller7,
  ControllerUser,
  RegisterUserUseCase,
  ServiceRequestScoped,
  ServiceThatThrowsOnConstruct,
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
  services: [
    {
      provider: 'SOME_INJECT',
      useValue: 'some-injected-value',
    },
  ],
  exports: [],
})
export class Module5 {}

@Module({
  imports: [],
  controllers: [ControllerUser],
  services: [
    RegisterUserUseCase,
    {
      provider: 'TEXT_INJECT',
      useValue: 'Hello world inject',
    },
    {
      provider: AbsUserRepository,
      useClass: UserImplements,
    },
  ],
  exports: [],
})
export class ModuleRepository {}

@Module({
  imports: [],
  controllers: [],
  services: [ServiceThatThrowsOnConstruct],
  exports: [],
})
export class ModuleWithThrowingConstructor {}

@Module({
  imports: [],
  controllers: [],
  services: [ServiceRequestScoped],
  exports: [],
})
export class ModuleRequestScope {}

/**
 * Diamante real: Module2 y Module3 ya importan Module1 cada uno por su
 * lado (ver arriba). Al unirlos bajo un mismo padre, Module1 se alcanza
 * por dos rutas distintas del grafo de imports.
 */
@Module({
  imports: [Module2, Module3],
  controllers: [],
  services: [],
  exports: [],
})
export class DiamondAppModule {}

/**
 * Ciclo real entre dos módulos. No se puede escribir con `@ClassA` /
 * `@ClassB` referenciándose directo por el orden de declaración de clases
 * en JS (TDZ), así que se aplica el decorador manualmente después de
 * declarar ambas clases — equivalente a `@Module(config) class X {}`.
 */
export class CircularModuleA {}
export class CircularModuleB {}

Module({
  imports: [CircularModuleB],
  controllers: [],
  services: [],
  exports: [],
})(CircularModuleA);

Module({
  imports: [CircularModuleA],
  controllers: [],
  services: [],
  exports: [],
})(CircularModuleB);
