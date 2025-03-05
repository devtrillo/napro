import { passkeyClient, twoFactorClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/svelte';

import { PUBLIC_ORIGIN } from '$env/static/public';

const client = createAuthClient({
  baseURL: PUBLIC_ORIGIN,
  plugins: [
    passkeyClient(),
    twoFactorClient({
      onTwoFactorRedirect() {
        window.location.href = '/two-factor';
      },
    }),
  ],
});

export const {
  signIn,
  signUp,
  signOut,
  passkey,
  useSession,
  twoFactor,
  sendVerificationEmail,
  revokeSession,
  updateUser,
  listSessions,
  getSession,
  changePassword,
  useListPasskeys,
} = client;
