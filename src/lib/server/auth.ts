import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { magicLink, organization } from 'better-auth/plugins';
import { sveltekitCookies } from 'better-auth/svelte-kit';

import { getRequestEvent } from '$app/server';

import { db } from './db';

export const auth = betterAuth({
	baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:5173',
	database: drizzleAdapter(db, { provider: 'pg' }),
	logger: {
		disabled: false,
		level: 'info',
		log: (level, message, ...args) => {
			console.log(`BA [${level}] ${message}`, ...args);
		},
	},
	plugins: [
		organization(),
		magicLink({
			sendMagicLink: async ({ email, token, url }) => {
				console.log('Send email to:', email);
				console.log('With token:', token);
				console.log('And url:', url);
				// send email logic here
			},
		}),
		sveltekitCookies(getRequestEvent),
	],
});
