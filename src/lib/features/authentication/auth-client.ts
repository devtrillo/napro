import { createAuthClient } from 'better-auth/svelte';

import { PUBLIC_ORIGIN } from '$env/static/public';

const client = createAuthClient({ baseURL: PUBLIC_ORIGIN });

export const { signIn, signUp, signOut, useSession, sendVerificationEmail } = client;
