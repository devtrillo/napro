import { redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { auth } from '$lib/features/authentication/auth';
import {
  addPasskeySchema,
  changePasswordSchema,
  editUserSchema,
} from '$lib/features/authentication/schemas';

import type { PageServerLoad } from './$types';

export const load = (async (event) => {
  const { request, depends } = event;
  console.log('run');
  depends('user:profile');
  const { session, user } = (await auth.api.getSession({ headers: request.headers })) || {};
  console.log(user?.name);
  if (!user || !session) redirect(302, '/authenticate');

  return {
    activeSessions: auth.api.listSessions({ headers: request.headers }),
    formAddNewPasskey: await superValidate(zod(addPasskeySchema)),
    formChangePassword: await superValidate(zod(changePasswordSchema)),
    formEditProfile: await superValidate({ name: user.name }, zod(editUserSchema)),
    session,
    user,
  };
}) satisfies PageServerLoad;
