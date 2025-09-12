import { redirect } from '@sveltejs/kit';

import { resolve } from '$app/paths';
import { auth } from '$lib/server/auth';

import type { PageServerLoad } from './$types';

export const load = (async ({ request }) => {
	await auth.api.signOut({ headers: request.headers });
	throw redirect(302, resolve('/login'));
}) satisfies PageServerLoad;
