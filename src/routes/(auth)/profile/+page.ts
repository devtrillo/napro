import type { PageLoad } from './$types';

export const load = (async ({ url }) => {
	const tab = url.searchParams.get('tab');

	return { tab };
}) satisfies PageLoad;
