/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
const js = require('@eslint/js');
const ts = require('typescript-eslint');
const prettier = require('eslint-config-prettier');
const pluginPrettier = require('eslint-plugin-prettier');

module.exports = [
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    files: ['packages/**/*.ts'],
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      // Reglas específicas del proyecto
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      'no-console': 'warn',
      'no-debugger': 'error',

      // Reglas de estilo
      quotes: ['error', 'single', { avoidEscape: true }],

      // Prettier como fuente de verdad del estilo
      'prettier/prettier': [
        'error',
        {
          semi: true,
          singleQuote: true,
          printWidth: 80,
          tabWidth: 2,
          endOfLine: 'auto',
        },
      ],
    },
  },
  // Aplica configuración de Prettier para desactivar conflictos
  prettier,
];
