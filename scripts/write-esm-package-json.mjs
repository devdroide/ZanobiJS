import { writeFileSync } from 'node:fs';

// Node determina el tipo de módulo por el package.json más cercano. Sin este
// archivo, el .js generado en lib/esm se interpreta como CommonJS (hereda el
// package.json del package, sin "type") pese a tener sintaxis import/export,
// y falla en runtime con "SyntaxError: Named export not found" — hallazgo
// confirmado en el spike de .plans/plan-perf05-rollup.md.
const packages = ['common', 'core'];

for (const pkg of packages) {
  writeFileSync(`packages/${pkg}/lib/esm/package.json`, '{ "type": "module" }\n');
}
