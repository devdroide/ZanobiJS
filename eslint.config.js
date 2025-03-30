// Importamos las configuraciones necesarias
const js = require("@eslint/js");
const ts = require("typescript-eslint");

module.exports = ts.config(js.configs.recommended, ts.configs.recommended, {
  files: ["packages/**/*.ts"],
  languageOptions: {
    parserOptions: {
      project: [
        "./packages/common/tsconfig.json",
        "./packages/core/tsconfig.json",
      ],
      tsconfigRootDir: __dirname,
      sourceType: "module",
    },
  },
  rules: {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "off",
    "no-console": "warn",
    "no-debugger": "error",
    quotes: ["error", "double"],
  },
});
