import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './db';
import { magicLink, organization } from 'better-auth/plugins';

export const auth = betterAuth({
	plugins: [
		organization(),
		magicLink({
			sendMagicLink: async ({ email, token, url }, request) => {
				console.log('Send email to:', email);
				console.log('With token:', token);
				console.log('And url:', url);
				// send email logic here
			}
		})
	],
	database: drizzleAdapter(db, { provider: 'pg' })
});
