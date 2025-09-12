import prettier from 'eslint-config-prettier';
import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

import boundaries from 'eslint-plugin-boundaries';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import sortKeysFix from 'eslint-plugin-sort-keys-fix';
import unusedImport from 'eslint-plugin-unused-imports';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

const boundariesConfig = {
	files: ['**/*.svelte', '**/*.ts', ],
	ignores:['**/*.spec.ts','**/*.spec.js','**/*.test.ts','**/*.test.js'],
	plugins: {
		boundaries
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
						from: ['feature']
					},
					{ allow: ['shared', 'feature'], from: ['app', 'neverImport'] },
					{ allow: [['app', { fileName: '*.css' }]], from: ['app'] }
				]
			}
		],
		'boundaries/no-unknown': ['error'],
		'boundaries/no-unknown-files': ['error']
	},
	settings: {
		'boundaries/elements': [
			{
				mode: 'full',
				pattern: [
					'src/lib/components/**/*',
					'src/lib/hooks/**/*',
					'src/lib/**/*',
					'src/server/**/*'
				],
				type: 'shared'
			},
			{
				capture: ['featureName'],
				mode: 'full',
				pattern: ['src/features/*/**/*'],
				type: 'feature'
			},
			{
				capture: ['_', 'fileName'],
				mode: 'full',
				pattern: ['src/routes/**/*'],
				type: 'app'
			},
			{
				mode: 'full',
				pattern: ['src/*', 'src/tasks/**/*'],
				type: 'neverImport'
			}
		],
		'boundaries/include': ['src/**/*']
	}
};
const customConfig = {
	files: ['**/*.svelte', '**/*.ts'],
	plugins: {
		'simple-import-sort': simpleImportSort,
		'sort-keys-fix': sortKeysFix,
		'unused-imports': unusedImport
	},
	rules: {
		'simple-import-sort/exports': 'error',
		'simple-import-sort/imports': 'error',
		'sort-keys': ['error', 'asc', { caseSensitive: true, minKeys: 2, natural: false }],
		'sort-keys-fix/sort-keys-fix': 'warn',
		'unused-imports/no-unused-imports': 'error'
	}
};
export default ts.config(
	includeIgnoreFile(gitignorePath),
	{ ignores:['src/paraglide/**'] },
	boundariesConfig,
	customConfig,
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs.recommended,
	prettier,
	...svelte.configs.prettier,
	{
		
		languageOptions: {
			globals: { ...globals.browser, ...globals.node }
		},
		rules: {
			// typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
			// see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
			'no-undef': 'off'
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser,
				svelteConfig
			}
		}
	}
);
