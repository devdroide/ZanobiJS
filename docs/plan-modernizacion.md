# Plan de Modernización — ZanobiJS

**Fecha:** 2026-08-26
**Estado:** propuesta, sin ejecutar
**Rama base:** `feature/general-update` (`e04f5b8`)

> **Principio rector:** un cambio por paso. Cada paso debe poder mergearse, verificarse y
> revertirse por separado. Nada se ejecuta sin aprobación explícita.

---

## 1. Por qué este plan

La rama `refactor/change-test-vitest` mezcla **seis cambios distintos** en un solo lote:

| # | Cambio | ¿Se pidió? |
|---|---|---|
| 1 | Migración Mocha → **Vitest** | ✅ Sí |
| 2 | Reemplazo de ESLint + Prettier por **Biome** | ❌ No |
| 3 | `engines` a Node ≥22 | ⚠️ Parcial (queremos 24) |
| 4 | Normalización masiva de imports a `import type` | ❌ No |
| 5 | Normalización de fin de línea CRLF → LF (~3.900 líneas de ruido) | ❌ No |
| 6 | Archivo nuevo `packages/common/interfaces/globals/globals.interface.ts` + cambio de comportamiento en `isEmpty` | ❌ No |

Mergear el lote completo mete Biome y cambios de código no solicitados. **El objetivo de este plan
es separar el punto 1 del resto.**

---

## 2. Lo que ya está verificado

Revisión ejecutada en worktree aislado sobre `refactor/change-test-vitest` (Node v22.22.1):

| Comprobación | Resultado |
|---|---|
| Merge hacia `feature/general-update` | Fast-forward, 0 conflictos |
| `npm test` (Vitest) | ✅ **147 tests / 15 archivos**, 5.4s |
| Cobertura | ✅ **100% stmts · 99.7% branch · 100% funcs · 100% lines** |
| `npm run build` | ✅ exit 0 |
| Conversión de specs | ✅ 15 archivos `chai`→`vitest`, 6 `sinon`→`vi`; 463/455 líneas reales |

**Conclusión: la migración a Vitest funciona y es rescatable.** El trabajo de conversión de los
specs no hay que rehacerlo, hay que *extraerlo*.

---

## 3. Pasos

### Paso 1 — Vitest, y solo Vitest 🎯

**Objetivo:** reemplazar el runner de tests sin tocar ESLint, Prettier ni el código de producción.

**Rama:** `refactor/vitest-runner`, nueva, desde `feature/general-update`.

**Incluye:**
- Añadir devDeps: `vitest`, `@vitest/coverage-v8`, `unplugin-swc`
- Añadir `vitest.config.ts`
- Quitar devDeps: `mocha`, `nyc`, `chai`, `sinon`, `sinon-chai`, `@types/mocha`, `@types/chai`, `@types/sinon`, `ts-node`
- Borrar `.mocharc.json` y `.nycrc`
- Reescribir los scripts `test*` de `package.json`
- Portar los 15 specs de `chai`/`sinon` a `vitest`/`vi` — ver **1.1 Estrategia de conversión** abajo

**NO incluye:** Biome, `import type`, CRLF→LF, `globals.interface.ts`, cambios en `isEmpty`.

---

#### 1.1 Estrategia de conversión de specs — *base de referencia, reescritura manual*

**Decisión:** la rama `refactor/change-test-vitest` se usa como **base de consulta**, no como
fuente para copiar. Cada archivo se rehace y se verifica aserción por aserción.

**Por qué no copiar tal cual —** la conversión de la rama debilitó sistemáticamente las
aserciones booleanas:

| Chai (hoy) | La rama tradujo a | Ocurrencias | Problema |
|---|---|---|---|
| `.to.be.true` | `toBeTruthy()` | 45 | Chai exige `=== true`; `toBeTruthy()` pasa con `1`, `"x"`, `{}`, `[]` |
| `.to.be.false` | `toBeFalsy()` | 10 | Pasa con `0`, `""`, `null`, `undefined` |
| — | `toBe(true)` / `toBe(false)` | **0** | Ninguna conservó la aserción estricta |

Son **55 aserciones que dejaron de verificar lo que verificaban**. Un test que debería fallar
porque la función devolvió un objeto en vez de `true`, ahora pasa. Los 147 tests están verdes,
pero 55 lo están con menos rigor que antes.

**Volumen real a convertir:** 15 archivos · **234 aserciones Chai** · **50 usos de Sinon**
(solo `sinon.spy` ×26 y `sinon.SinonSpy` ×24 → `vi.fn()` / `vi.spyOn` y `MockInstance`).

**Tabla de mapeo a aplicar** (frecuencias medidas sobre el código actual):

| Chai | Ocurrencias | Vitest correcto | ⚠️ |
|---|---|---|---|
| `.to.be.equal` | 82 | `toBe(...)` | Chai `equal` es estricto (`===`) |
| `.to.be.true` | 45 | `toBe(true)` | **no** `toBeTruthy()` |
| `.to.include` | 24 | `toContain(...)` / `toMatchObject(...)` | según sea string/array u objeto |
| `.to.be.an('X')` | 21 | `toBeInstanceOf(X)` / `toBeTypeOf('x')` | clase vs primitivo |
| `.to.have` | 20 | `toHaveProperty(...)` / `toHaveLength(...)` | |
| `.to.not.*` | 11 | `.not.*` | |
| `.to.be.false` | 10 | `toBe(false)` | **no** `toBeFalsy()` |
| `.to.be.empty` | 6 | `toHaveLength(0)` / `toEqual({})` | según tipo |
| `.to.equal` | 5 | `toBe(...)` | |
| `.to.be.instanceOf` | 4 | `toBeInstanceOf(...)` | |
| `.to.be.undefined` | 2 | `toBeUndefined()` | |

**Procedimiento por archivo:**
1. Partir del archivo actual (Mocha/Chai), no del de la rama.
2. Convertir aserción por aserción con la tabla de arriba.
3. Consultar el equivalente de la rama **solo como referencia** cuando haya duda de intención.
4. Correr ese archivo aislado y verificar que pasa.
5. Revisar que ninguna aserción quedó más débil que la original.

**Contaminación detectada en la rama** (a descartar si se consulta):
- Los **specs están limpios**: el `biome.json` usa `quoteStyle: single`, igual que tu Prettier →
  **0 imports con comillas dobles**.
- Los **mocks sí traen un cambio ajeno**: `private x` → `private readonly x` (autofix de linter,
  32 líneas en 5 archivos). **No lo necesita Vitest — descartar.**

**Detalle técnico que hay que conservar:** `vitest.config.ts` usa `unplugin-swc`. Es obligatorio —
el transform por defecto de Vitest (esbuild) **no emite `design:paramtypes`**, y sin eso todo el
sistema de DI se cae en los tests. SWC sí lo emite.

**Criterio de aceptación:**
```
npm test              → 147 passed
npm run test:coverage → ≥ 90% líneas
npm run lint:check    → exit 0  (sigue siendo ESLint)
npm run prettier:check → exit 0 (sigue siendo Prettier)
npm run build         → exit 0
git diff --stat vs base → 0 cambios en packages/**/*.ts fuera de __test__/
```

Esa última línea es la que garantiza que no se coló código de producción.

**Reversión:** borrar la rama; nada tocado fuera de tests y config de test.

---

### Paso 2 — Arreglar el CI (bloqueante, depende del Paso 1)

**Problema verificado:** `.github/workflows/CI-CD.yml` corre

```bash
COVERAGE=$(npx nyc report --reporter=text | grep "All files" | awk '{print $3}' | tr -d '%')
```

Con `nyc` fuera del proyecto, esto **rompe el CI**. Reproducido:

```
npm warn exec The following package was not found and will be installed: nyc@18.0.0
ENOENT: no such file or directory, scandir '.../.nyc_output'
```

`COVERAGE` queda vacío → `bc -l` falla → con `set -e`, job rojo.

**Solución:** añadir el reporter `json-summary` a `vitest.config.ts` y leer
`coverage/coverage-summary.json` con `node -p`, en vez de invocar `nyc`. Cambiar el paso
`npm run test` por `npm run test:coverage`.

**Nota:** `sonar-project.properties` apunta a `coverage/lcov.info`, que Vitest ya genera con el
reporter `lcov`. **Compatible, no hay que tocarlo.**

**Pendiente de decisión:** `MIN_COVERAGE` está en 90 y los `thresholds` de Vitest en 80/70.
Hay que unificar (la cobertura real es 100%).

**Criterio de aceptación:** el CI pasa en verde en un PR de prueba.

---

### Paso 3 — Node ≥24

**Objetivo:** subir el piso de runtime.

**Cambios:**
- `engines: { "node": ">= 24" }` en `packages/common/package.json` y `packages/core/package.json`
  → **hoy `engines` solo existe en el `package.json` raíz, que es `"private": true` y por tanto
  no llega a npm.** Los paquetes publicados no declaran nada.
- `package.json` raíz: `>= 24`
- CI y PUBLISH: `node-version: '24'`

**Requisito previo:** actualizar Node local. Hoy tienes **v22.22.1**; al declarar `>=24` tu propia
máquina queda fuera de `engines`.

**Sobre "no subir major":** subir el piso de `engines` es breaking por convención semver. Como
estás en `1.2.0-beta.x` publicando bajo dist-tag `beta`, cabe en la línea beta sin liberar un
major estable. Confirmar antes de ejecutar.

---

### Paso 4 — Biome: ❌ DESCARTADO

**Decisión tomada (2026-08-26): NO se adopta Biome.**

Se conservan **ESLint + Prettier** tal como están hoy. Ningún paso de este plan debe tocar
`eslint.config.js`, `.prettierrc` ni `.prettierignore`, ni los scripts `lint:*` / `prettier:*`
de `package.json`.

Si en el futuro se reconsidera, será en su propia rama y su propio PR, sin mezclarse con nada más.

---

### Paso 5 — Limpieza de huérfanos (independiente)

Hallazgos preexistentes, no relacionados con Vitest. Cada uno puede ir por separado:

1. **`.github/` contiene una copia duplicada completa del config raíz** — `package.json`,
   `lerna.json`, `tsconfig.json`, `gulpfile.mjs`, `.eslintrc.js`, `.prettierignore`. GitHub solo
   lee `workflows/` y `PULL_REQUEST_TEMPLATE.md`. Parece un respaldo viejo. **Revisar si se borra.**
2. **`gulp clean:ts` borra los `CHANGELOG.md` a propósito** (`gulp/gulpfile.mjs:9`) y `postpublish`
   lo ejecuta → tras cada publicación quedan los changelogs marcados como borrados en el working
   tree. Confirmar si es intencional.
3. **`npm run build` emite 59 archivos `.js` junto a los `.ts`.** Si después corres `npm test`,
   Vitest resuelve el `.js` y fallan 5 tests (reproducido). En CI no ocurre porque `build` va al
   final. Localmente hay que hacer `npm run clean` entre medio. Se arregla de raíz con un `outDir`
   real.
4. `actions/checkout@v3` y `setup-node@v3` en `CI-CD.yml` (PUBLISH.yml ya usa v4).

---

## 4. Diferido al próximo major

No entra ahora por decisión explícita de no subir mayor.

### ESM (CommonJS → ESM)

**No hace falta proyecto aparte, y probablemente tampoco build dual.** Con piso en Node ≥24,
`require(esm)` está activo por defecto y estable, así que un paquete ESM-only **sigue siendo
consumible desde CommonJS**. Node 24 además trae `import.meta.dirname`/`filename`, que elimina la
fricción de `__dirname`.

**Restricción a respetar:** `require(esm)` lanza `ERR_REQUIRE_ASYNC_MODULE` si el grafo usa
*top-level await*. Prohibido TLA en los entry points publicados.

> Esto corrige una contradicción del reporte anterior: la idea de cargar secretos en cold start
> con top-level await (`@zanobijs/config`) es incompatible. Debe resolverse con un hook
> `onModuleInit`.

### TypeScript 6

TS 6.0 salió en marzo 2026 (última versión del compilador en JS) y **TS 7.0 salió en agosto 2026**
(port nativo en Go). TS 6 no es destino, es el puente.

Impacto directo en tu `tsconfig.json`:

| Config actual | TS 6 | TS 7 |
|---|---|---|
| `"baseUrl": "."` | deprecado | **removido** |
| `moduleResolution` implícito `node10` | deprecado | **removido** |
| `strict` ausente | default pasa a `true` | igual |

**Los decoradores sobreviven:** tsgo sí emite `design:paramtypes`.

**Ventaja competitiva:** lo que bloquea a NestJS para adoptar TS 7 es que TS 7 no expone API
programática del compilador y `nest build` llama a `createProgram()`. ZanobiJS compila con
`tsc -b` (CLI puro) → **estás mejor posicionado que Nest**. Falta verificar que `tsc -b` con
project references funcione en tsgo.

**Bomba de tiempo detectada:** `coerceBooleanProperty(value: string)` se invoca con
`process.env.X`, que es `string | undefined`. Compila hoy porque no hay `strictNullChecks`;
**revienta cuando `strict` pase a default en TS 6.**

---

## 5. Orden propuesto

```
Paso 1 (Vitest solo)  →  Paso 2 (CI)  →  Paso 3 (Node 24)
                                   ↘
                          Paso 5 (limpieza, cuando quieras)

Paso 4 (Biome)        →  pendiente de tu decisión, aislado
Major futuro          →  ESM + TS 6
```

---

## 6. Decisiones

### Tomadas

| # | Decisión | Resultado |
|---|---|---|
| 1 | ¿Biome? | ❌ **No.** Se conservan ESLint + Prettier |
| 2 | ¿Specs: rescatar o rehacer? | 🔶 **Rama vieja como base de referencia; reescritura manual archivo por archivo** (ver 1.1) |
| 5 | Commit `56c033c` sobre la rama vitest | ✅ Eliminado. La rama volvió a `05738d6`; todos sus commits vuelven a ser tuyos |

### Pendientes

| # | Decisión | Opciones |
|---|---|---|
| 3 | ¿Node 24 en la línea beta actual, o espera al major? | beta ahora / diferir |
| 4 | `MIN_COVERAGE` del CI | mantener 90 / subir a 100 (la real es 100%) |
| 6 | `.github/` con copia duplicada del config raíz | borrar / conservar |

---

## 7. Estado de ejecución

**Nada ejecutado.** El repositorio está en `e04f5b8`, sin Biome ni Vitest:

- `feature/general-update` intacta, con Mocha + nyc + ESLint + Prettier
- `refactor/change-test-vitest` intacta en `05738d6` (solo commits tuyos)
- Solo existen sin commitear: tu `.gitignore` y esta carpeta `docs/`

Cada paso se propone, se aprueba y recién entonces se ejecuta.

---

## Anexo — Hallazgos de la revisión que no deben perderse

Cambios de comportamiento que la rama vieja introduce fuera de los tests:

- **`isEmpty` cambia de semántica**: ahora devuelve `true` para `null`/`undefined`. Solo afecta a
  `isFunction`, que **no se usa en producción**; los otros dos call sites (`injector.ts:143`,
  `module.ts:197`) están guardados. Riesgo bajo, pero es código de producción viajando en una
  rama de tests.
- **`coerceBooleanProperty` se estrecha de `any` a `string`** → ver "bomba de tiempo" arriba.
- **`shared.utils.ts` quedó sin formatear** en el commit `05738d6` (comillas dobles), lo que hacía
  fallar `biome check`. Solo relevante si se adopta Biome.

Los hallazgos de seguridad y rendimiento están en
[auditoria-y-roadmap.md](auditoria-y-roadmap.md).
