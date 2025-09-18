import z from 'zod';

import { form, getRequestEvent } from '$app/server';
import { auth } from '$lib/server/auth';
import zodErrorToObject from '$lib/utils/zodErrorToString';

const schema = z.object({
	email: z.email(),
});

export const LoginUser = form(async (formData) => {
	const result = schema.safeParse(Object.fromEntries(formData));
	if (!result.success) return { errors: zodErrorToObject(result.error), success: false };

	const { request } = getRequestEvent();

	await auth.api.signInMagicLink({
		body: {
			callbackURL: '/app',
			email: result.data.email,
		},
		headers: request.headers,
	});

	return { success: true };
});
