<p align="center">
  <a href="https://zanobijs.vercel.app/" target="blank"><img src="https://zanobijs.vercel.app/_astro/ZanobiHero.__7I9OCQ_ZkaY1J.webp" width="120" alt="ZanobiJS Logo" /></a>
</p>

<H1 align="center">Welcome to ZanobiJS</H1>

[![npm](https://img.shields.io/badge/npm-v1.0.0-darkorange.svg)](https://www.npmjs.com/package/@zanobijs/cli)
[![coverage](https://img.shields.io/badge/coverage-98-green.svg)](https://mochajs.org/)
[![test](https://img.shields.io/badge/test-mocha-CC0000.svg)](https://mochajs.org/)
[![nodejs](https://img.shields.io/badge/nodejs->=16.0.0-darkgreen.svg)](https://nodejs.org)
[![typescrit](https://img.shields.io/badge/TS->=5.2.2-darkblue.svg)](https://www.typescriptlang.org/)
[![licence](https://img.shields.io/badge/licence-MIT-purple.svg)](https://en.wikipedia.org/wiki/MIT_License)
[![Doc](https://img.shields.io/badge/ZNB-Documentation-blue.svg)](https://zanobijs.vercel.app/)

It is a mini-framework for Node.js that allows you to build server-side microservices in an efficient and scalable way. It is designed to be small and efficient, but powerful enough for enterprise applications. ZanobiJS is written in TypeScript and JavaScript, giving you the flexibility to choose the language you prefer.
## Features

- Small and efficient.
- Written in TypeScript/JavaScript.
- Ideal for building server-side microservices.
- Optimized scalability and performance.

## Getting started

If you want to consult the [guide](https://zanobijs.vercel.app/en/) and learn about the project, visit [zanobijs.vercel.app](https://zanobijs.vercel.app/en/)

## Installation

Install my-project with npm

```bash
  npm install @zanobijs/common @zanobijs/core
```
    
## Directories

    ├── ...
    ├── example                   # Feature example
    │   ├── example.controller.ts # Controller
    |   ├── example.service.ts    # Service
    ├── app.module.ts             # Main Module
    ├── index.ts                  # Handler or bootstrap
    └── ...
## Usage/Examples

### example.service.ts

```javascript
import { Inject, Injectable } from "@zanobijs/common";

@Injectable()
export class ServiceExample {
  constructor(
    @Inject("API_CLIENT") private apiClient: string,
    @Inject("API_KEY") private apiKey: string
  ) {}
  getHello() {
    return "Hello ServiceExample";
  }
  getApiClient(){
    return this.apiClient
  }
  getApiKey(){
    return this.apiKey
  }
}

```
### example.controller.ts

```javascript
import { Controller, Inject } from "@zanobijs/common";
import { ServiceExample } from "./example.service";

@Controller()
export class ControllerExample {
  constructor(
    private sExample: ServiceExample,
    @Inject("API_URL") private apiUrl: string
  ) {
    this.apiUrl = apiUrl;
  }

  getApiUrl() {
    return this.apiUrl;
  }
  getHelloService() {
    return this.sExample.getHello();
  }
  getClienteService() {
    return this.sExample.getApiClient();
  }
  getKeyService() {
    return this.sExample.getApiKey();
  }
}
```
### AppModule.ts

```javascript
import { Module } from "@zanobijs/common";
import { ControllerExample } from "./example/example.controller";
import { ServiceExample } from "./example/example.service";

@Module({
  imports: [],
  controllers: [ControllerExample],
  services: [
    ServiceExample,
    {
      provider: "API_URL",
      useValue: "https://url.com",
    },
    {
      provider: "API_KEY",
      useValue: "myKey12345API",
    },
    {
      provider: "API_CLIENT",
      useValue: "thisClientAPI",
    },
  ],
  exports: [],
})
export class AppModule {}

```

### Index.ts

```javascript
import { Factory } from "@zanobijs/core";
import { AppModule } from "./app.module";
import { ControllerExample } from "./example/example.controller";


const bootstrap = () => {
  const factory = new Factory(AppModule);
  const app = factory.create();
  const controllerExample = app.get<ControllerExample>(
    "controllerExample"
  );
  console.log(controllerExample.getHelloService());
  console.log(controllerExample.getApiUrl());
  console.log(controllerExample.getClienteService());
  console.log(controllerExample.getKeyService());
}
bootstrap();
// Hello ServiceExample
// https://url.com
// thisClientAPI
// myKey12345API
```
> [!Note]
> It can also be used in [AWS lambda](https://zanobijs.vercel.app/en/01-getting-started/first-step/#setting), see how to do it in the [guide](https://zanobijs.vercel.app/en/01-getting-started/first-step/#setting)

## Use Logger

- Import logger service of @zanobij/common/utils.
- Define whether the record is visible. [Default is false]
- Get the service.
- Use the different events (success, info, warn, error, debug).

```javascript
// Index.ts - This is important for the operation
const factory = new Factory(AppModule, {
  activeLoggerUser: true
});

// use en services controllers, etc

import { LoggerUser } from "@zanobijs/common/utils";

const logUser = LoggerUser();

logUser.success("Lorem ipsum success");
logUser.info("Lorem ipsum info");
logUser.warn("Lorem ipsum warn");
logUser.error("Lorem ipsum error");
logUser.debug("Lorem ipsum debug");

// ***** PRINT *****
// [SUCCESS]: Lorem ipsum success     <green print>
// [INFO]: Lorem ipsum info           <blue print>
// [WARN]: Lorem ipsum warn           <yellow print>
// [ERROR]: Lorem ipsum error         <red print>
// [DEBUG]: Lorem ipsum debug         <white print>

```
## Authors

- [@devdroide](https://www.github.com/devdroide)


## Credits

ZanobiJS is heavily inspired by [NestJS](https://nestjs.com/) and [AngularJS](https://angularjs.org/).

Additionally, it is used [Awilix](https://github.com/jeffijoe/awilix#readme) which is a container for Extremely powerful and effective dependency injection.

Finally, it is an effort that we make and that we hope can help in the construction of projects.

## License

Private - Read License
