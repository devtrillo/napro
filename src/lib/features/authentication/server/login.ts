import { type Action, fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { db } from '$lib/server/db';
import { user } from '$lib/server/db/auth-schema';

import { signIn, signUp } from '../auth-client';
import { loginSchema } from '../schemas';

export async function LoginLoad() {
  return await superValidate(zod(loginSchema));
}

export const LoginAction: Action = async (event) => {
  const form = await superValidate(event, zod(loginSchema));
  if (!form.valid) return fail(400, { form });
  const existingUser = await db.query.user.findFirst({
    where: eq(user.email, form.data.email),
  });
  console.log('existingUser', existingUser);
  // if user exists, login user
  if (existingUser) {
    const user = await signIn.email({
      callbackURL: '/',
      email: form.data.email,
      password: form.data.password,
      rememberMe: true,
    });
    console.log('user', user);
  } else {
    const signup = await signUp.email({
      email: form.data.email,
      name: form.data.email,
      password: form.data.password,
    });
    console.log('console.log', signup);
    // if user does not exist, create user
  }

  console.log('Form is valid:', form);
  return { form };
};
