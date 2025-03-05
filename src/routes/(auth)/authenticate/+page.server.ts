import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { loginSchema, registerSchema } from '$lib/features/authentication/schemas';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => ({
  loginForm: await superValidate(zod(loginSchema)),
  registerForm: await superValidate(zod(registerSchema)),
});
