<p align="center">
  <a href="https://zanobijs.vercel.app/" target="blank"><img src="https://zanobijs.vercel.app/_astro/ZanobiHero.__7I9OCQ_ZkaY1J.webp" width="120" alt="ZanobiJS Logo" /></a>
</p>

<H1 align="center">Welcome to ZanobiJS</H1>

[![npm](https://img.shields.io/npm/v/@zanobijs/core.svg?label=npm&color=darkorange)](https://www.npmjs.com/package/@zanobijs/core)
[![coverage](https://img.shields.io/badge/coverage-100-green.svg)](https://vitest.dev/)
[![test](https://img.shields.io/badge/test-vitest-6E9F18.svg)](https://vitest.dev/)
[![nodejs](https://img.shields.io/badge/nodejs->=22.13.0-darkgreen.svg)](https://nodejs.org)
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

If you want to consult:
 - The [guide](https://zanobijs.vercel.app/en/) and learn about the project, visit [zanobijs.vercel.app](https://zanobijs.vercel.app/en/)
 - La [Guia](https://zanobijs.vercel.app/es/) y aprender acerca del proyecto, visita [zanobijs.vercel.app](https://zanobijs.vercel.app/en/)

## Dependency Lifetime

`@Injectable`/`@Controller` accept a `lifetime` option: `'singleton'` (default), `'request'`, or `'transient'`.

```ts
@Injectable({ lifetime: 'request' })   // fresh instance per invocation, discarded after
export class RequestContext { ... }

@Injectable()                          // default: one instance for the whole process
export class UserRepository { ... }
```

This matters in Lambda/serverless: the execution environment is reused across invocations (warm start). A `singleton` (default) is safe for stateless services and reusable clients (DB pools, HTTP agents — reuse is the point). A class holding per-invocation state (request/response, correlation data) must be `'request'`, or that state leaks between unrelated invocations sharing the same warm container.

```ts
// app.ts — built once, reused across warm invocations
export const createApp = () => new Factory(AppModule).create();
const factory = createApp();

// handler.ts — one scope per invocation, cheap (no re-scan, no re-registration)
export const handler = async (event) => {
  const app = factory.createRequestScope();
  const context = app.get<RequestContext>('RequestContext');   // fresh, isolated
  const userService = app.get<UserRepository>('UserRepository'); // reused singleton
  ...
};
```

**Rule:** a class can only depend on lifetimes equal or longer than its own — a `singleton` must never depend on a `request`-lifetime class (it would capture a stale instance forever). `Factory` runs in `awilix` strict mode by default, so this misconfiguration throws at startup instead of silently leaking state.

## Bundling / Minification

`ZanobiJS` resolves class-to-class dependencies (any constructor parameter **without** `@Inject`) by reading the class name and the parameter name from the source code at runtime. Aggressive minification (the default in most Lambda build pipelines) can rename both, breaking dependency resolution silently.

**`@Inject(token)` is not affected** — its token is a string literal, immune to minification. This only applies to implicit class-based injection:

```ts
// Implicit — resolved by class name, needs the config below when bundled
constructor(private userRepo: UserRepository) {}

// @Inject — token is a literal string, safe with any bundler, no config needed
constructor(@Inject('UserRepository') private userRepo: UserRepository) {}
```

If your build uses a bundler, preserve function/class names:

| Tool | Config |
|---|---|
| esbuild (direct) | `build({ keepNames: true })` |
| AWS SAM | `Metadata.BuildProperties.KeepNames: true` in `template.yaml` |
| AWS CDK `NodejsFunction` | `bundling: { keepNames: true }` |
| Serverless Framework (`serverless-esbuild`) | `custom.esbuild.keepNames: true` |
| terser (webpack) | `terserOptions: { keep_fnames: true, keep_classnames: true }` |

## Issues

Please be sure to read the [Issue Reporting Checklist](https://github.com/devdroide/ZanobiJS/blob/main/CONTRIBUTING.md) before opening an issue. Issues not conforming to the guidelines may be closed immediately.

## Contribute

If you want to contribute, read the following [Contributors' guide](https://github.com/devdroide/ZanobiJS/blob/main/CONTRIBUTING.md#-submitting-an-issue)

## Authors

- [@devdroide](https://www.github.com/devdroide)

## Website

- [zanobijs.vercel.app](https://zanobijs.vercel.app/en/)

## Credits

ZanobiJS is heavily inspired by [NestJS](https://nestjs.com/) and [AngularJS](https://angularjs.org/).

Additionally, it is used [Awilix](https://github.com/jeffijoe/awilix#readme) which is a container for Extremely powerful and effective dependency injection. Finally, it is an effort that we make and that we hope can help in the construction of projects.

## License

Private - [Read License](https://github.com/devdroide/ZanobiJS/blob/main/LICENSE)
