import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
import swc from 'unplugin-swc';

// unplugin-swc es obligatorio: el transform por defecto de Vitest (esbuild)
// no emite `design:paramtypes`, y sin eso el sistema de DI del framework
// (basado en reflect-metadata) no funciona en los tests.
export default defineConfig({
  plugins: [swc.vite()],
  resolve: {
    // Con el `exports` map de PERF-05, Node/Vite resuelve @zanobijs/* contra
    // el build compilado en packages/*/lib/. Estos alias fuerzan resolución
    // directa contra el .ts fuente para que los tests siempre corran contra
    // código en vivo, nunca contra un build (posiblemente viejo/inexistente).
    alias: {
      '@zanobijs/common/utils/constants': path.resolve(
        __dirname,
        'packages/common/utils/constants.ts',
      ),
      '@zanobijs/common/utils/shared.utils': path.resolve(
        __dirname,
        'packages/common/utils/shared.utils.ts',
      ),
      '@zanobijs/common/exceptions/runtime.exception': path.resolve(
        __dirname,
        'packages/common/exceptions/runtime.exception.ts',
      ),
      '@zanobijs/common/services/base.logger.service': path.resolve(
        __dirname,
        'packages/common/services/base.logger.service.ts',
      ),
      '@zanobijs/common/utils': path.resolve(__dirname, 'packages/common/utils/index.ts'),
      '@zanobijs/common': path.resolve(__dirname, 'packages/common/index.ts'),
    },
    // Vite resuelve .js antes que .ts por defecto. Sin esto, un `npm run build`
    // local seguido de `npm test` sin `npm run clean` de por medio hace que
    // los tests carguen el .js compilado en vez del .ts fuente en imports
    // relativos dentro del propio package.
    extensions: ['.ts', '.mts', '.js', '.mjs', '.json'],
  },
  test: {
    globals: true,
    environment: 'node',
    include: ['packages/**/__test__/**/*.spec.ts'],
    testTimeout: 10000,
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage',
      reporter: ['text', 'json', 'json-summary', 'html', 'lcov'],
      include: ['packages/**/*.ts'],
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/*.spec.ts',
        '**/*.mock.ts',
        'packages/**/__test__/**',
      ],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
    },
  },
});
