import { fileURLToPath } from 'node:url';

import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import boundaries from 'eslint-plugin-boundaries';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import sortKeysFix from 'eslint-plugin-sort-keys-fix';
import svelte from 'eslint-plugin-svelte';
import unusedImport from 'eslint-plugin-unused-imports';
import globals from 'globals';
import ts from 'typescript-eslint';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

const boundariesConfig = {
  plugins: {
    boundaries,
  },
  rules: {
    'boundaries/element-types': [
      'error',
      {
        default: 'disallow',
        rules: [
          { allow: ['shared'], from: ['shared'] },
          {
            allow: ['shared', ['feature', { featureName: '${from.featureName}' }]],
            from: ['feature'],
          },
          { allow: ['shared', 'feature'], from: ['app', 'neverImport'] },
          { allow: [['app', { fileName: '*.css' }]], from: ['app'] },
        ],
      },
    ],
    'boundaries/no-unknown': ['error'],
    'boundaries/no-unknown-files': ['error'],
  },
  settings: {
    'boundaries/elements': [
      {
        mode: 'full',
        pattern: [
          'src/lib/components/**/*',
          'src/lib/hooks/**/*',
          'src/lib/**/*',
          'src/server/**/*',
        ],
        type: 'shared',
      },
      {
        capture: ['featureName'],
        mode: 'full',
        pattern: ['src/lib/features/*/**/*'],
        type: 'feature',
      },
      {
        capture: ['_', 'fileName'],
        mode: 'full',
        pattern: ['src/routes/**/*'],
        type: 'app',
      },
      {
        mode: 'full',
        pattern: ['src/*', 'src/tasks/**/*'],
        type: 'neverImport',
      },
    ],
    'boundaries/include': ['src/**/*'],
  },
};

const customConfig = {
  files: ['**/*.svelte', '**/*.ts'],
  plugins: {
    'simple-import-sort': simpleImportSort,
    'sort-keys-fix': sortKeysFix,
    'unused-imports': unusedImport,
  },
  rules: {
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'sort-keys': ['error', 'asc', { caseSensitive: true, minKeys: 2, natural: false }],
    'sort-keys-fix/sort-keys-fix': 'warn',
    'unused-imports/no-unused-imports': 'error',
  },
};

export default ts.config(
  includeIgnoreFile(gitignorePath),
  boundariesConfig,
  customConfig,
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs['flat/recommended'],
  prettier,
  ...svelte.configs['flat/prettier'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.svelte'],

    languageOptions: {
      parserOptions: {
        parser: ts.parser,
      },
    },
  },
);
