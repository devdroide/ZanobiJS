# ZanobiJS — Auditoría de Seguridad/Rendimiento y Roadmap de Producto

**Fecha:** 2026-08-26
**Rama analizada:** `feature/general-update`
**Alcance:** `packages/common` (v1.2.0-beta.0) + `packages/core` (v1.2.0-beta.1)
**Método:** revisión estática de código verificado en disco + wiki operacional (`.wiki/`)

> **Qué NO incluye este reporte:** no se ejecutaron benchmarks, `npm audit`, ni pruebas de
> penetración. Los hallazgos marcados `VERIFICADO` se leyeron directamente en el código
> (se cita `archivo:línea`). Los marcados `A MEDIR` requieren instrumentación antes de actuar.

---

## 1. Resumen ejecutivo

ZanobiJS hoy es un **contenedor de inyección de dependencias por decoradores** sólido y pequeño,
construido sobre `awilix`, con un subsistema propio de logging y enmascarado de PII. La base
arquitectónica está bien separada: `common` escribe metadata, `core` la interpreta.

Para posicionarlo como *framework top para Lambda y microservicios* hay tres frentes:

| Frente | Estado | Riesgo si no se atiende |
|---|---|---|
| **A. Fragilidad del DI ante bundling** | 🔴 Crítico | El framework se rompe silenciosamente en cualquier deploy con esbuild/terser — que es el flujo por defecto de SAM, CDK y Serverless Framework |
| **B. Fail-open en el enmascarado de PII** | 🔴 Crítico | Fuga de datos sensibles a CloudWatch sin señal de error |
| **C. Ausencia de capa HTTP/validación** | 🟡 Bloqueante de adopción | Sin esto, no compite con NestJS/Middy; el usuario debe escribir el adapter a mano |

**Recomendación de secuencia:** resolver A y B antes de añadir features. Son la diferencia entre
"librería interesante" y "framework en el que confío para producción".

---

## 2. Checklist de Seguridad

### 🔴 SEC-01 — El enmascarado de PII falla en modo *fail-open* `VERIFICADO`

**Evidencia:** `packages/common/services/masker/process/providerPattern.service.ts:89-102`

```ts
apply(text: string, patterns: string[]): string {
  try {
    // ...aplica patrones en cadena
    return resultMasker;
  } catch {
    return text;        // ⚠️ devuelve el texto ORIGINAL sin enmascarar
  }
}
```

**Impacto:** un subsistema cuyo único propósito es ocultar datos sensibles, ante cualquier
excepción (patrón custom con bug, `RangeError` por recursión, `TypeError` en un `mask()`),
imprime el dato **en claro** en CloudWatch. No hay log de error, no hay métrica, no hay señal.
El fallo es invisible hasta que alguien audita los logs.

**Fix propuesto:**
```ts
apply(text: string, patterns: string[]): string {
  try {
    let resultMasker = text;
    for (const patternName of patterns) {
      const pattern = this.listPattern.get(patternName);
      if (pattern) resultMasker = pattern.apply(resultMasker);
    }
    return resultMasker;
  } catch (error) {
    // fail-closed: nunca devolver el original
    return this.options?.onMaskError === 'passthrough'
      ? text
      : '[MASKING_ERROR]';
  }
}
```
Hacer el comportamiento **configurable pero seguro por defecto** (`fail-closed`), y emitir el
error por el logger interno para que sea observable.

---

### 🔴 SEC-02 — Resolución de dependencias por parsing de `Function.toString()` `VERIFICADO`

**Evidencia:**
- `packages/common/utils/shared.utils.ts:150-166` (`getConstructorParamNames`)
- `packages/common/utils/shared.utils.ts:17-22` (`isClass`, regex `/^class\s/`)
- `packages/core/factory.ts:99` (`InjectionMode.CLASSIC` — awilix hace su propio parsing)

```ts
const ctorRegex = /constructor\s*\(([^)]*)\)/;
```

**Impacto (doble):**
1. **Correctitud/seguridad:** bajo minificación (esbuild, terser — el default de `sam build`,
   AWS CDK `NodejsFunction`, Serverless Framework), los nombres de parámetros cambian
   (`private userRepo` → `t`). `Injector.getInjectData` construye `injectData[paramName]` con
   el nombre viejo → la dependencia **no se inyecta y queda `undefined`**, sin lanzar error.
   Un servicio de autorización que llega `undefined` puede convertirse en un bypass de
   permisos según cómo lo consuma el usuario.
2. **`isClass` por regex:** una función cuyo cuerpo *contenga* la cadena `class ` en cierta
   posición, o código ya transpilado a ES5 (donde `class` desaparece), rompe la detección de tipo.

**Fix propuesto (por fases):**
- **Corto plazo:** documentar el requisito `keepNames: true` (esbuild) / `keep_fnames` (terser)
  y **fallar ruidosamente**: si `getInjectData` no encuentra un token registrado, hoy solo hace
  `logger.important(...)` (`injector.ts:120-124`) — debe lanzar excepción en modo estricto.
- **Medio plazo:** migrar a **tokens explícitos** como fuente de verdad primaria
  (`@Inject(TOKEN)` obligatorio para todo, nombres de parámetro solo como *fallback* opcional).
- **Largo plazo (estratégico):** un **transformer de TypeScript** o generación de código en
  build-time que emita un manifiesto de dependencias — elimina el parsing en runtime por
  completo. Es lo que separa un framework "de juguete" de uno production-grade.

---

### 🟠 SEC-03 — `Factory.get()` puede lanzar `TypeError` en vez del error de dominio `VERIFICADO`

**Evidencia:** `packages/core/factory.ts:120-121`

```ts
const classNameFound = resolutionError[0].match(/'([^']+)'/);
if (classNameFound[1] === className) {   // ⚠️ classNameFound puede ser null
```

**Impacto:** `String.match()` devuelve `null` si no hay coincidencia. Si `awilix` cambia el
formato de su mensaje de error (o el error proviene de otra fuente — por ejemplo, un error
lanzado *dentro del constructor* de la clase resuelta), se produce
`TypeError: Cannot read properties of null (reading '1')`. El error real queda **enmascarado**
por un crash del framework, dificultando el diagnóstico en producción.

**Fix propuesto:**
```ts
const classNameFound = resolutionError[0].match(/'([^']+)'/);
if (classNameFound?.[1] === className) {
  throw new ContainerResolutionEntityException(className, error.message);
}
```
Adicionalmente: **no depender del formato de mensaje de una dependencia externa.** `awilix`
expone `AwilixResolutionError`; usar `error instanceof AwilixResolutionError` es un contrato
estable, el string no lo es.

---

### 🟠 SEC-04 — No hay aislamiento de providers entre módulos `VERIFICADO`

**Evidencia:**
- `packages/core/injector/module.ts:29-30` — `listProviders` / `listProvidersClass` se crean
  **una sola vez** en el constructor de `Module`.
- `packages/core/factory.ts:32` — `Factory` crea **una única instancia** `new Module()` y la
  reutiliza vía `setup()` para todos los módulos del grafo.

**Impacto:** todo provider declarado en cualquier módulo queda visible para todos los demás.
No existe el concepto de módulo privado ni de `exports` efectivo (aunque `IModuleConfig` declara
`exports`, no se usa para restringir visibilidad). En un microservicio multi-dominio, un módulo
puede resolver por accidente el cliente de base de datos o el secreto de otro dominio.

**Fix propuesto:** implementar scoping real por módulo — un `Map` de providers por módulo, con
resolución que suba por la cadena de `imports` y respete `exports` como frontera de visibilidad.
Es un cambio de comportamiento → requiere **ADR** y major version.

---

### 🟠 SEC-05 — Estado global mutable y singletons cruzan invocaciones de Lambda `VERIFICADO`

**Evidencia:**
- `packages/core/factory.ts:27-28` — el constructor de `Factory` **escribe en `process.env`**
  (`ZANOBIJS_LOGGER`, `ZANOBIJS_LOGGER_USER`).
- Singletons de módulo: `Metadata`, `LoggerService`, `LoggerUserService`,
  `ProviderPatternService`, `ProcessDataService`.
- `processData.service.ts:16` — `schemaNamaSelected` es estado de instancia mutado por log.

**Impacto en Lambda:** el *execution environment* se reutiliza entre invocaciones. Consecuencias:
1. `schemaNamaSelected` puede quedar "pegado" de una invocación a otra si el flujo no llega a
   `deselectSchema()` (una excepción a mitad de `log()` lo impide) → la invocación B enmascara
   con el esquema de la invocación A, o no enmascara.
2. Instanciar dos `Factory` (p. ej. en tests, o un handler que compone dos apps) hace que la
   segunda **resetee los flags de logging de la primera**.
3. `process.env` es global del proceso: cualquier otra librería en el bundle lo ve.

**Fix propuesto:** mover la configuración de logging a estado de instancia (`IFactoryOptions` →
propiedad del logger, no `process.env`). Para el masker, hacer que el esquema sea un parámetro
del llamado, no estado mutable (`logger.masker('x').info(...)` puede devolver un *wrapper*
inmutable en lugar de mutar el singleton).

---

### 🟡 SEC-06 — Superficie de DoS en el procesamiento de logs `VERIFICADO`

**Evidencia:**
- `packages/common/services/masker/process/processData.service.ts:109-120` — `processString`
  hace `JSON.parse` de cualquier string que *parezca* objeto/array y **se llama recursivamente**
  sin límite de profundidad.
- `packages/common/services/base.logger.service.ts:37-42` — `util.inspect(arg, { depth: null })`
  serializa sin cota.

**Impacto:** un payload entrante con anidamiento profundo o un objeto muy grande que llegue a un
`logger.info(...)` puede provocar `RangeError: Maximum call stack size exceeded` o consumir
CPU/memoria de la Lambda. En un handler que loguea el evento de entrada (patrón habitual), el
input es controlado por el cliente.

**Fix propuesto:** añadir `maxDepth` (p. ej. 10) y `maxStringLength` configurables; cambiar
`depth: null` por un valor por defecto acotado; cortar con marcador `[TRUNCATED]`.

---

### 🟡 SEC-07 — Riesgo de ReDoS en patrones de enmascarado `A MEDIR`

**Evidencia:** `packages/common/services/masker/patterns/emailPattern.service.ts:16-17`

```ts
/([a-zA-Z0-9._%+-]{1,64})@([a-zA-Z0-9.-]{1,255}\.[a-zA-Z]{2,})/g
```

**Impacto:** los cuantificadores están acotados (`{1,64}`, `{1,255}`), lo que **limita** el
riesgo, pero `[a-zA-Z0-9.-]{1,255}` seguido de `\.` admite backtracking sobre entradas
adversariales largas. Debe medirse, no asumirse.

**Acción:** correr los 9 patrones contra un fuzzer de ReDoS (`recheck`, `safe-regex`) e integrarlo
al CI. Combinado con SEC-01 (fail-open), un timeout de regex hoy además **filtra el dato original**.

---

### 🟡 SEC-08 — Dependencias desactualizadas y runtime EOL `VERIFICADO`

**Evidencia:** `package.json` (raíz y ambos packages)

| Dependencia | Declarada | Observación |
|---|---|---|
| `reflect-metadata` | `^0.1.13` | Serie 0.2.x disponible desde hace tiempo |
| `awilix` | `10.0.2` (pin exacto) | Serie mayor muy por delante |
| `joi` | `^17.11.0` | Al día en su major |
| `engines.node` | `>= 16` | **Node 16 está EOL**; Lambda ya opera en nodejs20.x/22.x |

**Fix propuesto:** subir `engines` a `>=18` (mínimo) o `>=20` (recomendado), planificar migración
de `awilix` con ADR, y **añadir `npm audit --audit-level=high` + Dependabot/Renovate al CI**.

---

### 🔵 SEC-09 — Excepciones no exportadas por el barrel `VERIFICADO` *(ya documentado en la wiki)*

`packages/core/exceptions/index.ts` solo re-exporta `constant.message` e
`invalid.module.exception`. `InvalidProviderModuleException`, `ContainerResolutionException` y
`ContainerResolutionEntityException` no son alcanzables desde el API público → **el consumidor no
puede hacer `catch` tipado** de los errores más comunes del framework, y termina haciendo
`catch (e) { if (e.message.includes(...)) }`, que es frágil.

**Fix:** decidir explícitamente (ADR) si son públicas. Si lo son, exportarlas.

---

### Checklist de seguridad — resumen accionable

- [ ] **SEC-01** Cambiar el masker a *fail-closed* + emitir error observable
- [ ] **SEC-02** Estrategia de tokens explícitos + `keepNames` documentado + fallo ruidoso
- [ ] **SEC-03** `classNameFound?.[1]` y usar `instanceof AwilixResolutionError`
- [ ] **SEC-04** ADR de scoping de providers por módulo (respetar `exports`)
- [ ] **SEC-05** Sacar la config de logging de `process.env`; masker sin estado mutable
- [ ] **SEC-06** `maxDepth` / `maxStringLength` en inspect y en el procesamiento recursivo
- [ ] **SEC-07** Fuzzing ReDoS de los 9 patrones en CI
- [ ] **SEC-08** `engines >= 20`, actualizar deps, `npm audit` + Renovate en CI
- [ ] **SEC-09** ADR: superficie pública de excepciones
- [ ] Añadir `SECURITY.md` con política de reporte de vulnerabilidades
- [ ] Firmar releases / habilitar npm provenance (`--provenance`) en el publish

---

## 3. Checklist de Rendimiento

El costo en Lambda se divide en **cold start** (una vez por contenedor) y **per-invocation**
(cada request). La arquitectura actual concentra casi todo en cold start, lo cual es correcto —
pero hay ineficiencias concretas.

### PERF-01 — Doble recorrido completo del grafo de módulos `VERIFICADO`

**Evidencia:** `packages/core/factory.ts:33-35`

```ts
this.scanProviderModule(appModule);      // recorrido recursivo #1
this.registerProviderScanedModules();
this.processClassModule(appModule);      // recorrido recursivo #2
```

Ambos métodos recorren recursivamente `getImports()`. Además, **ninguno lleva registro de módulos
ya visitados**: si dos módulos importan un tercero (diamante), ese tercero se procesa **dos veces**;
un ciclo de imports produce **recursión infinita**.

**Fix propuesto:**
```ts
private readonly visited = new Set<TClass>();
private scanProviderModule(module: TClass): void {
  if (this.visited.has(module)) return;   // memoización + corta ciclos
  this.visited.add(module);
  // ...
}
```
Impacto: elimina trabajo O(2^profundidad) en grafos con diamantes y previene un stack overflow
por ciclo. **Es el fix de mayor relación beneficio/esfuerzo del reporte.**

---

### PERF-02 — `Function.toString()` + regex por cada clase y parámetro `VERIFICADO`

`getConstructorParamNames` se invoca en `createClassDecorator` (por cada `@Controller`/
`@Injectable`) y en `@Inject` (por cada parámetro). `toString()` sobre una clase materializa su
código fuente completo como string. Ocurre en **import time**, es decir, cold start.

Además `InjectionMode.CLASSIC` hace que **awilix repita el mismo parsing** internamente.

**Fix:** cachear por clase (`WeakMap<Function, string[]>`) — barato e inmediato. La solución
definitiva es el manifiesto en build-time (ver SEC-02).

**A MEDIR:** cuantificar el peso real en cold start con un grafo de 50+ clases antes de invertir
en el transformer.

---

### PERF-03 — `scoped()` sin scope por request `VERIFICADO`

**Evidencia:** `injector.ts:142` (`asClass(target).scoped()`), `factory.ts:99-100`
(`createContainer` + `register`, sin `createScope()`).

Todo se registra como `scoped` pero nunca se crea un scope por invocación. En awilix, `scoped`
sin scope activo se comporta como singleton del contenedor raíz → **el estado de una invocación
puede filtrarse a la siguiente** (mismo problema que SEC-05, aquí visto como diseño de ciclo de vida).

**Fix:** exponer `factory.createRequestScope()` y documentar los tres ciclos de vida
(`singleton` para clientes AWS/pools, `scoped` para contexto de request, `transient`) como decisión
explícita del usuario. Es un requisito para correctitud en Lambda **y** una ventaja de rendimiento:
los clientes SDK deben ser singleton para reutilizar conexiones TCP.

---

### PERF-04 — Barrels que impiden tree-shaking `VERIFICADO`

`packages/common/index.ts` re-exporta `./decorators`, `./interfaces`, `./utils`; el módulo de
utils arrastra los loggers, que arrastran **todo el subsistema de masking** (9 patrones + 2
servicios) aunque el usuario nunca lo active.

**Impacto:** tamaño del bundle → tiempo de descarga/inicialización del contenedor Lambda.

**Fix:** `"sideEffects": false` en los `package.json`, `exports` map con subpaths
(`@zanobijs/common/logger`), y carga perezosa de los patrones de masking (registrar factories,
instanciar al primer uso).

---

### PERF-05 — Sin ESM ni salida dual `VERIFICADO`

`tsconfig.json` fija `"module": "commonjs"`. Lambda soporta ESM desde nodejs18.x, y ESM habilita
mejor tree-shaking y top-level `await` (útil para cargar secretos en cold start).

**Fix:** build dual CJS+ESM (tsup/unbuild) con `exports` condicional.

---

### PERF-06 — `util.inspect` con `depth: null` en cada log `VERIFICADO`

Ver SEC-06. Es simultáneamente un riesgo de DoS y un costo de CPU por invocación. Los loggers
hacen *early return* si están apagados (`logger.service.ts:60-62`), lo cual es correcto; el costo
solo aplica con logging activo — pero en producción `activeLoggerUser` suele estar activo.

---

### Checklist de rendimiento — resumen accionable

- [ ] **PERF-01** `Set` de visitados en ambos recorridos (memoización + anti-ciclo) ⭐ prioridad
- [ ] **PERF-02** `WeakMap` cache de `getConstructorParamNames`
- [ ] **PERF-03** API de scope por request + ciclos de vida explícitos ⭐ prioridad
- [ ] **PERF-04** `sideEffects: false`, `exports` map, masking perezoso
- [ ] **PERF-05** Build dual CJS/ESM
- [ ] **PERF-06** `depth` acotado en `util.inspect`
- [ ] Añadir un benchmark de cold start al CI (bootstrap de N módulos) para detectar regresiones

---

## 4. Roadmap de Producto: de framework DI a plataforma para Lambda/microservicios

La propuesta mantiene el principio actual (**núcleo pequeño, todo opcional**) y crece por
paquetes independientes. Nada de lo siguiente debe entrar a `core`.

### Fase 0 — Endurecimiento (prerrequisito, no negociable)

Resolver SEC-01, SEC-02, SEC-03, PERF-01, PERF-03. Sin esto, cada feature nueva se construye
sobre una base que falla bajo bundling y filtra PII.

**Entregable adicional:** suite de tests de integración que ejecute el framework **ya bundleado y
minificado** con esbuild. Ese test es la red de seguridad de todo el proyecto.

---

### Fase 1 — `@zanobijs/http` (la pieza que desbloquea la adopción)

El diferenciador frente a Express-sobre-Lambda es no pagar el costo de un servidor HTTP simulado.

```ts
@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<UserDto> {
    return this.userService.findOne(id);
  }

  @Post('/')
  @HttpCode(201)
  async create(@Body() dto: CreateUserDto): Promise<UserDto> {
    return this.userService.create(dto);
  }
}

// handler.ts
export const handler = ZanobiHttp.createLambdaHandler(AppModule);
```

**Requisitos de diseño:**
- Adapters para **API Gateway REST (v1)**, **HTTP API (v2)**, **ALB** y **Function URL** —
  los cuatro tienen formas de evento distintas; abstraerlas es valor real.
- Router precompilado en cold start (árbol de rutas, no `Array.find` por request).
- Serialización/deserialización con límites de tamaño explícitos.
- Modo servidor local (`node dev`) para desarrollo sin desplegar.

---

### Fase 2 — `@zanobijs/validation`

`joi` ya es dependencia de `common`, pero solo valida la config de `@Module`. Extenderlo al
request es un paso natural y de bajo costo.

```ts
export class CreateUserDto {
  @IsString() @MinLength(3)  name: string;
  @IsEmail()                 email: string;
  @IsOptional() @IsInt()     age?: number;
}
```

**Decisión pendiente (ADR):** ¿`joi` (ya presente, runtime-first) o `zod` (inferencia de tipos
superior, estándar de facto actual)? Recomendación: **abstraer tras una interfaz `IValidator`** y
ofrecer ambos adapters — evita casarse con una librería y es un argumento de venta.

Debe integrarse con `@zanobijs/http` para responder `400` con un cuerpo de error estructurado y
consistente (RFC 7807 / Problem Details).

---

### Fase 3 — Pipeline de ejecución

Sin esto no se pueden implementar *cross-cutting concerns* y cada usuario reinventa la rueda.

- **Middlewares / Interceptors** — antes y después del handler.
- **Guards** — autorización declarativa (`@UseGuards(JwtGuard)`).
- **Exception Filters** — mapeo centralizado excepción → respuesta HTTP. Aquí encajan de forma
  natural las excepciones ya existentes (`RuntimeException` y su jerarquía).
- **Lifecycle hooks** — `onModuleInit` (cargar secretos en cold start), `onShutdown`
  (`SIGTERM` de Lambda, drenar conexiones).

---

### Fase 4 — Módulos de ecosistema

| Paquete | Propósito | Por qué importa en Lambda |
|---|---|---|
| `@zanobijs/config` | Config tipada desde env/SSM/Secrets Manager, validada al arrancar | Falla en cold start, no en la request #10.000 |
| `@zanobijs/aws` | Providers listos de DynamoDB/S3/SQS/SNS/EventBridge | Clientes como **singleton** = reutilización de conexión TCP; es de los mayores ahorros de latencia |
| `@zanobijs/events` | Handlers tipados para SQS/SNS/EventBridge/Kinesis/DynamoDB Streams | Los microservicios modernos son más event-driven que HTTP; incluye batch item failures parciales |
| `@zanobijs/observability` | Logs JSON estructurados, correlation ID desde el contexto Lambda, OpenTelemetry, métricas EMF | Convierte el logger actual en algo consultable en producción |
| `@zanobijs/testing` | Construir el contenedor con dependencias sustituidas | Sin esto, testear una app ZanobiJS es incómodo — impacta directo en la adopción |
| `@zanobijs/resilience` | Circuit breaker, reintentos con backoff, timeouts, bulkhead | Comunicación entre microservicios |
| `@zanobijs/cli` | Scaffolding, `dev` local, análisis del grafo de dependencias | El badge del README ya lo anuncia; hoy no existe en el repo |

---

### Fase 5 — Diferenciadores estratégicos

Lo que convertiría a ZanobiJS en algo que *NestJS no ofrece bien* en serverless:

1. **DI en tiempo de compilación.** Un transformer que emita el grafo resuelto. Elimina
   `reflect-metadata` y el parsing en runtime: cold start casi nulo, inmune a minificación, y
   **errores de DI detectados en build, no en producción**. Es la apuesta técnica más
   diferenciadora del proyecto.
2. **Validación del grafo en build-time.** Detectar dependencias faltantes, ciclos y providers
   no usados antes de desplegar.
3. **Presupuesto de cold start.** Que el CLI reporte el peso del bundle y el tiempo de bootstrap,
   y falle el build si excede un umbral configurado.
4. **Modo *single-table* / handler compartido.** Un solo artefacto que enrute a múltiples
   funciones lógicas, reduciendo el número de contenedores fríos.

---

## 5. Priorización sugerida

| Prioridad | Ítems | Justificación |
|---|---|---|
| **P0 — ahora** | SEC-01, SEC-02, SEC-03, PERF-01, PERF-03 | Correctitud y seguridad; PERF-01 es un `Set`, media hora de trabajo |
| **P1 — siguiente ciclo** | SEC-05, SEC-06, SEC-08, SEC-09, PERF-02, `@zanobijs/http` | Desbloquean uso real en producción |
| **P2** | `@zanobijs/validation`, pipeline (Fase 3), `@zanobijs/testing`, PERF-04/05 | Paridad de features con el mercado |
| **P3** | Fase 4 restante, SEC-04 (breaking → major) | Ecosistema |
| **P4 — investigación** | Fase 5 (DI en build-time) | Apuesta diferenciadora; requiere prototipo antes de comprometerse |

---

## 6. Métricas de éxito propuestas

Sin medición, "framework rápido" es una afirmación de marketing. Instrumentar desde ya:

- **Cold start** del bootstrap con 10 / 50 / 200 clases registradas (p50, p99)
- **Tamaño del bundle** de una app mínima, minificada, con y sin masking
- **Overhead por invocación** del pipeline HTTP vs. handler desnudo
- **Cobertura de tests sobre código bundleado + minificado** (no solo sobre fuentes)
- **Tiempo desde `npm init` hasta primer endpoint desplegado** (métrica de experiencia
  de desarrollo — es la que decide la adopción)

---

## 7. Próximos pasos concretos

1. Crear los ADRs de las decisiones abiertas: `joi` vs `zod`, scoping de providers,
   superficie pública de excepciones, política de `engines`/deps.
2. Abrir issues por cada ítem P0 con la evidencia `archivo:línea` de este reporte.
3. Añadir el test de bundling minificado (esbuild) — es la red de seguridad de SEC-02.
4. Añadir `npm audit` + benchmark de cold start al CI.
5. Prototipar `@zanobijs/http` con un solo adapter (API Gateway v2) para validar el diseño
   antes de escribir los cuatro.

---

## Referencias internas

- [.wiki/architecture/dependency-injection.md](../.wiki/architecture/dependency-injection.md) — flujo Factory → Module → Injector
- [.wiki/modules/masker.md](../.wiki/modules/masker.md) — subsistema de enmascarado (documenta el fail-open)
- [.wiki/modules/shared-utils.md](../.wiki/modules/shared-utils.md) — fragilidad de `toString()`
- [.wiki/modules/exceptions.md](../.wiki/modules/exceptions.md) — jerarquía de errores
- [.wiki/contracts/shared-contract.md](../.wiki/contracts/shared-contract.md) — entity registry
