const { defineConfig } = require("vitest/config");
const swc = require("unplugin-swc");
const path = require("path");

const swcPlugin = swc.vite || (swc.default && swc.default.vite);

module.exports = defineConfig({
  plugins: [swcPlugin()],
  test: {
    globals: true,
    environment: "node",
    include: ["packages/**/__test__/**/*.spec.ts", "packages/**/*.test.ts"],
    testTimeout: 10000,
    coverage: {
      provider: "v8", // El más rápido para Node 22
      reportsDirectory: "./coverage", // Dónde se guardarán los reportes
      reporter: ["text", "json", "html", "lcov"], // Formatos de salida
      include: ["packages/**/*.ts"], // Solo queremos medir el código fuente
      exclude: [
        "**/node_modules/**",
        "**/dist/**",
        "**/*.spec.ts", // Excluir los archivos de test de la medición
        "**/*.mock.ts",
        "packages/**/__test__/**",
        "packages/testing/**",
      ],
      // Umbrales de calidad (opcional)
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 70,
        statements: 80,
      },
    },
    // deps: {
    //   interopDefault: true,
    // },
  },
});
