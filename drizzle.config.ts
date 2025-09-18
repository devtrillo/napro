import { defineConfig } from 'drizzle-kit';

if (!process.env.ZERO_UPSTREAM_DB) throw new Error('ZERO_UPSTREAM_DB is not set');

export default defineConfig({
	dbCredentials: { url: process.env.ZERO_UPSTREAM_DB },
	dialect: 'postgresql',
	schema: './src/lib/server/db/schema.ts',
	strict: true,
	verbose: true,
});
