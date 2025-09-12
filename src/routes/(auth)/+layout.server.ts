import { redirect } from '@sveltejs/kit';

import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if (!locals.session?.id) redirect(302, '/login');
	return { user: locals.user };
}) satisfies LayoutServerLoad;
