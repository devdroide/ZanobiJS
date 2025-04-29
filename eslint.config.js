// Importamos las configuraciones necesarias
const js = require("@eslint/js");
const ts = require("typescript-eslint");

module.exports = ts.config(js.configs.recommended, ts.configs.recommended, {
  files: ["packages/**/*.ts"],
  rules: {
    "@typescript-eslint/no-unused-expressions": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unsafe-function-type": "off",
    "no-console": "warn",
    "no-debugger": "error",
    quotes: ["error", "double"],
  },
});
