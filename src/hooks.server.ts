import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { svelteKitHandler } from 'better-auth/svelte-kit';

import { auth } from '$lib/features/authentication/auth';
import { i18n } from '$lib/i18n';

const handleParaglide: Handle = i18n.handle();

const authHandler: Handle = async function handle({ event, resolve }) {
  const session = await auth.api.getSession({
    headers: event.request.headers,
  });
  event.locals.session = session?.session;
  event.locals.user = session?.user;

  return svelteKitHandler({ auth, event, resolve });
};

export const handle: Handle = sequence(handleParaglide, authHandler);
