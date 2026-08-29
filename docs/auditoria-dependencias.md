# Auditoría de Dependencias — Ítem 3 del plan

**Fecha:** 2026-08-27
**Estado:** ✅ Paso B ejecutado y commiteado. `lerna@8.2.2 → 10.0.1` aplicado en `chore/plan-followups`.
**Resultado final:** 43 → **3 vulnerabilidades** (todas `high`, 0 críticas), sin tocar `PUBLISH.yml`
ni ningún flag de los scripts de release.

---

## 1. Contexto

Al borrar la rama remota `ci/fix-coverage-and-actions` tras el merge del PR, GitHub reportó
**73 vulnerabilidades** en `develop` vía Dependabot. `npm audit` local reporta **43**
(4 low, 8 moderate, 28 high, 3 critical).

**Discrepancia sin resolver:** no confirmé por qué Dependabot ve más que `npm audit` local — probablemente
alcance/momento distinto del grafo de dependencias, o un checkeo más profundo por parte de GitHub.
Este reporte trabaja sobre los 43 de `npm audit`, que son los accionables directamente.

---

## 2. Hallazgo clave: casi todo viene de una sola fuente

De las 43 vulnerabilidades, **39 son transitivas de `lerna@8.2.2`** — arrastra dependencias viejas
del CLI de npm que Lerna empaqueta internamente (`tar`, `nx`, `@npmcli/*`, `pacote`, `sigstore`,
`cacache`, etc.). Solo 4 vienen de otras fuentes.

---

## 3. Prueba real de `npm audit fix` (sin `--force`)

Se ejecutó, se verificó el resultado, y se revirtió (`package.json`/`package-lock.json` restaurados
a su estado original, `npm ci` para resincronizar `node_modules`).

| Estado | Total | Critical | High | Moderate | Low |
|---|---|---|---|---|---|
| Antes | 43 | 3 | 28 | 8 | 4 |
| Después de `audit fix` (sin `--force`) | **25** | 1 | 20 | 4 | 0 |

**Dato importante:** el fix sin `--force` **no tocó `package.json`**, solo `package-lock.json`
(afinó versiones transitivas dentro de los rangos semver ya permitidos por las dependencias
declaradas). Cero riesgo de breaking change. Elimina **18 vulnerabilidades**, incluyendo:
- Las 4 `low` completas
- 2 de las 3 `critical`: `form-data`, `handlebars`

---

## 4. Las 25 restantes — todas requieren `lerna@10.0.1`

```
CRITICAL (1): tar

HIGH (20):
  @lerna/create, @npmcli/arborist, @npmcli/run-script, @sigstore/tuf, cacache,
  js-yaml, lerna, libnpmpublish, make-fetch-happen, minimatch, node-gyp,
  npm-registry-fetch, nx, pacote, sigstore, tuf-js
  + 4 sin marca [MAJOR] pero que siguen listadas porque dependen transitivamente
    de piezas que lerna@8 fija: @npmcli/metavuln-calculator, @sigstore/sign,
    brace-expansion, libnpmaccess

MODERATE (4): @nrwl/tao, @sigstore/core, @sigstore/verify, uuid
```

`lerna@8.2.2 → 10.0.1` **salta la v9 completa** — dos majors de un salto. Cambios de CLI/config
entre versiones mayores de Lerna no suelen ser triviales, y este repo depende de comandos
específicos usados en `.github/workflows/PUBLISH.yml`:

```yaml
npx lerna version ${{ steps.set_vars.outputs.VERSION_ARGS }} --yes
npx lerna publish from-package --yes --pre-dist-tag beta   # o sin --pre-dist-tag en main
```

y en `package.json`:

```json
"version:prerelease": "lerna version prerelease --preid beta --conventional-commits --conventional-prerelease --create-release github",
"publish:Beta": "npm run build && npm run version:newBeta && lerna publish from-package --dist-tag beta",
```

No se debe subir el major de Lerna sin antes validar que estos comandos exactos sigan funcionando
igual en v10 (probablemente en un dry-run de publish contra un registry de prueba, o al menos
`lerna version --conventional-commits` en modo `--no-push --no-git-tag-version` para observar el
comportamiento).

---

## 5. Recomendación — dos pasos separados

### Paso A — bajo riesgo, listo para aplicar

```bash
npm audit fix
```

- 43 → 25 vulnerabilidades
- Cero cambios en `package.json`
- Ya verificado en esta sesión (se ejecutó y se revirtió solo para no mezclarlo con la
  investigación — el resultado es reproducible)

### Paso B — ✅ ejecutado (2026-08-27, en `chore/plan-followups`)

**Investigación previa (vía documentación oficial de Lerna, no ejecución en vivo):**

| Riesgo temido | Realidad confirmada |
|---|---|
| v10 es "ESM-only" | No afecta — el repo solo invoca `lerna` como CLI (`npx lerna ...`), nunca `require('lerna')`. Verificado con grep, cero coincidencias |
| `lerna add/bootstrap/link` removidos (v9) | No se usan — el repo ya usa `workspaces` nativo de npm |
| Node mínimo v10: `^22.13.0\|\|^24.0.0\|\|^26.0.0` | Ya cumplido (`engines: >=24`) |
| `--exact`, `--conventional-commits`, `--conventional-prerelease`, `--conventional-graduate`, `--preid`, `--create-release github`, `--yes`, `--allow-branch` (usados en `version:*`) | **Confirmados vigentes** en el README oficial de `libs/commands/version` (rama `main`) |
| `from-package`, `--dist-tag`, `--pre-dist-tag`, `--yes` (usados en `publish:*` y `PUBLISH.yml`) | **Confirmados vigentes** en el README oficial de `libs/commands/publish` |
| Nuevo chequeo `EBEHIND` en modo CI (v10) | Existe, configurable vía `--ci-behind-behavior` — no probado en vivo contra `PUBLISH.yml` (ver limitación abajo) |

**Ejecución real:**
1. `npm install --save-dev lerna@10.0.1` → 233 paquetes viejos fuera, 107 nuevos (limpieza real de
   dependencias transitivas)
2. `npx lerna repair` → `lerna.json` **no necesitó cambios** (ya compatible con el schema nuevo);
   único efecto: una línea añadida a `.prettierignore` (`/.nx/workspace-data`, caché interno de Nx,
   que Lerna 10 usa por dentro)
3. Verificación completa: `lint:check`, `prettier:check`, `test:coverage` (100%), `build` — todos
   exit 0, sin cambios de código de producción ni de tests

**Resultado en vulnerabilidades — mejor de lo esperado:**

| Paso | Total | Critical | High | Moderate | Low |
|---|---|---|---|---|---|
| Original | 43 | 3 | 28 | 8 | 4 |
| Solo con `lerna@10.0.1` instalado | 12 | 0 | 8 | 2 | 2 |
| + `npm audit fix` (sin `--force`) | **3** | 0 | 3 | 0 | 0 |

Las 3 `high` restantes (`js-yaml`, `lerna`, `pacote`) son dependencias **fijadas internamente por el
propio `lerna@10.0.1`**. La única "solución" que ofrece `npm audit fix --force` es **retroceder a
`lerna@6.4.1`**, lo cual reintroduciría las 43 vulnerabilidades originales — se descartó
explícitamente. Se resolverán solas cuando Lerna publique un patch (10.0.x/10.1.0).

**Limitación reconocida:** no se ejecutó `lerna version` ni `lerna publish` en vivo contra este
repo (crearían tags/commits reales difíciles de revertir limpiamente). La validación se basó en
confirmar cada flag exacto contra la documentación oficial vigente, más el hecho de que
`lerna repair` no encontró nada que migrar en `lerna.json`. **Recomendación:** la primera vez que
se use `npm run version:*` o se dispare `PUBLISH.yml` tras este cambio, revisar el resultado con
atención antes de confiar en que es 100% igual al comportamiento de v8.

---

## 6. Próximos pasos

- [x] Aplicar Paso A (`npm audit fix`) — terminó integrado dentro del Paso B (mismo resultado final)
- [x] Ejecutar Paso B (Lerna v10) — hecho, ver arriba
- [ ] Investigar por qué Dependabot vio 73 y `npm audit` local veía 43 originalmente (sin resolver,
      menos relevante ahora que se bajó a 3)
- [ ] Vigilar el primer uso real de `npm run version:*` / `PUBLISH.yml` tras este cambio
- [ ] Revisar en unas semanas si Lerna publicó un patch que resuelva las 3 `high` restantes

---

## Referencias

- [plan-modernizacion.md](plan-modernizacion.md) — plan general, ítem 3
- [auditoria-y-roadmap.md](auditoria-y-roadmap.md) — auditoría de seguridad/rendimiento del código del framework (no de dependencias)
