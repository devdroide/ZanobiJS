# ZanobiJS

It is a mini-framework for Node.js that allows you to build server-side microservices in an efficient and scalable way. It is designed to be small and efficient, but powerful enough for enterprise applications. ZanobiJS is written in TypeScript and JavaScript, giving you the flexibility to choose the language you prefer.
## Features

- Small and efficient.
- Written in TypeScript/JavaScript.
- Ideal for building server-side microservices.
- Optimized scalability and performance.


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
## Use Logger

- Import logger service of @zanobij/common/utils.
- Define whether the record is visible. [Default is false]
- Get the service.
- Use the different events (success, info, warn, error, debug).

```javascript
import { Logger } from "@zanobijs/common/utils";

process.env.ZANOBIJS_LOGGER = "true";

const logger = Logger();

logger.success("Lorem ipsum success");
logger.info("Lorem ipsum info");
logger.warn("Lorem ipsum warn");
logger.error("Lorem ipsum error");
logger.debug("Lorem ipsum debug");

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

ZanobiJS is heavily inspired [NestJS](https://nestjs.com/) and [AngularJS](https://angularjs.org/). Credits

Finally, it is an effort to provide help with the construction of lambdas initially.
## License

Private - Read License
