import z from 'zod';

import { form, getRequestEvent } from '$app/server';
import { auth } from '$lib/server/auth';
import zodErrorToObject from '$lib/utils/zodErrorToString';

const schema = z.object({
	name: z.string().min(2).max(100),
});

export const updateUser = form(async (formData) => {
	const result = schema.safeParse(Object.fromEntries(formData));
	if (!result.success) return { errors: zodErrorToObject(result.error), success: false };
	await auth.api.updateUser({
		body: {
			name: result.data.name,
		},
		headers: getRequestEvent().request.headers,
	});
	return { success: true };
});

const fertilityPreferencesSchema = z.object({});
export const updateFertilityPreferences = form(async (formData, e) => {
	console.log('updateFertilityPreferences called', formData, e);
	const result = fertilityPreferencesSchema.safeParse(Object.fromEntries(formData));
	if (!result.success) return { errors: zodErrorToObject(result.error), success: false };
	// await auth.api.updateUser({
	// 	body: {
	// 		name: result.data.name,
	// 	},
	// 	headers: getRequestEvent().request.headers,
	// });
	return { success: true };
});
