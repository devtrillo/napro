import { paraglide } from '@inlang/paraglide-sveltekit/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    sveltekit(),
    tailwindcss(),
    paraglide({
      outdir: './src/lib/paraglide',
      project: './project.inlang',
    }),
  ],

  test: {
    workspace: [
      {
        extends: './vite.config.ts',
        plugins: [svelteTesting()],

        test: {
          clearMocks: true,
          environment: 'jsdom',
          exclude: ['src/lib/server/**'],
          include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
          name: 'client',
          setupFiles: ['./vitest-setup-client.ts'],
        },
      },
      {
        extends: './vite.config.ts',

        test: {
          environment: 'node',
          exclude: ['src/**/*.svelte.{test,spec}.{js,ts}'],
          include: ['src/**/*.{test,spec}.{js,ts}'],
          name: 'server',
        },
      },
    ],
  },
});
