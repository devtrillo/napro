import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		alias: {
			$features: 'src/features',
			$lib: 'src/lib'
		},
		adapter: adapter(),
		experimental: { remoteFunctions: true }
	},
	compilerOptions: {
		experimental: { async: true }
	}
};

export default config;
