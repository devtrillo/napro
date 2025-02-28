import { redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
  const { user, session } = locals;
  if (!user || !session) redirect(302, '/authenticate');
  return {
    session,
    user,
  };
}) satisfies PageServerLoad;
