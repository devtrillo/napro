import type z from 'zod';

type ZodErrorObject<T extends Record<string, unknown>> = Record<
	keyof T,
	{ code: string; message: string }
>;

export default function zodErrorToObject<T extends Record<string, unknown>>(
	errors: z.ZodError<T>,
): ZodErrorObject<T> {
	if (!errors?.issues) return {} as ZodErrorObject<T>;
	return errors.issues.reduce((acc, curr) => {
		const issuePath = curr.path.join('.');
		return {
			...acc,
			[issuePath]: {
				code: curr.code,
				message: curr.message,
			},
		};
	}, {}) as ZodErrorObject<T>;
}
