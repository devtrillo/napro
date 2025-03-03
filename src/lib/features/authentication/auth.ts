import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { jwt, twoFactor } from 'better-auth/plugins';
import { passkey } from 'better-auth/plugins/passkey';

import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
import { PUBLIC_PROJECT_NAME } from '$env/static/public';

import { db } from '../../server/db';

export const auth = betterAuth({
  account: {
    accountLinking: {
      trustedProviders: ['google'],
    },
  },
  appName: PUBLIC_PROJECT_NAME,
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
    async sendResetPassword(data) {
      console.log(data);
    },
  },
  emailVerification: {
    async sendVerificationEmail({ user, url }) {
      console.log(url);
    },
  },
  plugins: [
    jwt(),
    passkey(),
    twoFactor({
      otpOptions: {
        async sendOTP({ user, otp }) {
          console.log(otp, user);
        },
      },
    }),
  ],
  socialProviders: {
    google: {
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    },
  },
});
