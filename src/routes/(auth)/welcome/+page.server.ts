import { redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

const ready = true; // TODO: determine if user setup is complete

export const load = (async ({ locals }) => {
	if (ready) return redirect(303, '/app');
	return { user: locals.user };
}) satisfies PageServerLoad;
