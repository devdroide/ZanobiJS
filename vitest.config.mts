import { defineConfig } from 'vitest/config';
import swc from 'unplugin-swc';

// unplugin-swc es obligatorio: el transform por defecto de Vitest (esbuild)
// no emite `design:paramtypes`, y sin eso el sistema de DI del framework
// (basado en reflect-metadata) no funciona en los tests.
export default defineConfig({
  plugins: [swc.vite()],
  resolve: {
    // Vite resuelve .js antes que .ts por defecto. Los packages se publican
    // compilando el .js junto al .ts (sin dist/, porque hay imports profundos
    // tipo @zanobijs/common/utils/constants sin exports map) — sin esto, un
    // `npm run build` local seguido de `npm test` sin `npm run clean` de por
    // medio hace que los tests carguen el .js compilado en vez del .ts fuente.
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
