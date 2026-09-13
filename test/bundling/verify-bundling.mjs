// Verifica el mitigación documentada de SEC-02: un consumidor que bundlea
// ZanobiJS con esbuild y usa `keepNames: true` (recomendado en el README y
// en .wiki/modules/decorators.md) debe seguir resolviendo dependencias
// clase-a-clase implícitas (sin @Inject) correctamente después de minificar.
//
// No asume nada del caso SIN keepNames — lo corre igual y reporta qué pasa
// realmente, en vez de dar por sentado el resultado (así lo pedía el propio
// hallazgo SEC-02 del roadmap: "debe medirse, no asumirse").
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as esbuild from 'esbuild';

const __dirname = dirname(fileURLToPath(import.meta.url));
const compiledEntry = join(__dirname, 'compiled', 'run.js');
const outDir = join(__dirname, 'out');
const EXPECTED_OUTPUT = '["alice","bob"]';

if (!existsSync(compiledEntry)) {
  console.error(
    `❌ No se encontró ${compiledEntry}. Correr "tsc -p test/bundling/tsconfig.json" primero.`,
  );
  process.exit(1);
}

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

async function buildBundle(fileName, keepNames) {
  const outfile = join(outDir, fileName);
  await esbuild.build({
    entryPoints: [compiledEntry],
    bundle: true,
    minify: true,
    keepNames,
    platform: 'node',
    format: 'cjs',
    outfile,
  });
  return outfile;
}

/**
 * Extrae un resumen legible del stderr de Node. El bundle está minificado
 * a una sola línea gigante — el formateador de errores de Node imprime esa
 * línea completa como "contexto" antes del error real. Nos quedamos solo
 * con la línea `NombreDeError [Error]: mensaje` en adelante.
 */
function summarizeError(stderr) {
  // Nombres minificados pierden el sufijo "Exception"/"Error" del original
  // (ej. ContainerResolutionEntityException -> "In"), así que no se puede
  // matchear por nombre — solo por la forma "<algo> [Error]: mensaje".
  const match = stderr.match(/^\S+ \[Error\]:.*$/m);
  const detail = stderr.match(/detail: ".*"/);
  return [match?.[0], detail?.[0]].filter(Boolean).join('\n') || stderr.slice(0, 300);
}

function runBundle(path) {
  try {
    const stdout = execFileSync('node', [path], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    return { ok: true, output: stdout.trim() };
  } catch (error) {
    return { ok: false, error: summarizeError(error.stderr || error.message) };
  }
}

const withKeepNames = await buildBundle('with-keepnames.js', true);
const withoutKeepNames = await buildBundle('without-keepnames.js', false);

const resultWith = runBundle(withKeepNames);
const resultWithout = runBundle(withoutKeepNames);

console.log('--- keepNames: true (mitigación documentada) ---');
console.log(resultWith.ok ? `stdout: ${resultWith.output}` : `FALLÓ: ${resultWith.error}`);

console.log('--- keepNames: false (default de esbuild) ---');
console.log(resultWithout.ok ? `stdout: ${resultWithout.output}` : `FALLÓ: ${resultWithout.error}`);

// El único contrato que este test protege de verdad: seguir la mitigación
// documentada (keepNames: true) debe funcionar. Es lo que garantizamos en
// el README/wiki — si esto se rompe, la documentación miente.
if (!resultWith.ok || resultWith.output !== EXPECTED_OUTPUT) {
  console.error(
    `\n❌ Con keepNames: true, se esperaba "${EXPECTED_OUTPUT}" y se obtuvo: ${resultWith.ok ? resultWith.output : resultWith.error}`,
  );
  process.exit(1);
}
console.log('\n✅ keepNames: true produce el resultado correcto tras bundlear + minificar.');

// Diagnóstico, no assertion dura: reporta si el caso SIN keepNames también
// funciona o no, sin asumir el resultado de antemano.
if (resultWithout.ok && resultWithout.output === EXPECTED_OUTPUT) {
  console.log(
    'ℹ️  Nota: sin keepNames también funcionó en esta corrida — no reproduce el riesgo de forma determinística con este fixture/versión de esbuild. No es un fallo del test.',
  );
} else {
  console.log(
    'ℹ️  Confirmado: sin keepNames, la resolución de dependencias se rompe bajo minificación (SEC-02) — justifica seguir recomendando keepNames: true.',
  );
}
