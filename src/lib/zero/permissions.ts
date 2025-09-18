import { ANYONE_CAN, definePermissions, type PermissionsConfig } from '@rocicorp/zero';

import { type Schema, schema } from './schema';

export const permissions = definePermissions<unknown, Schema>(schema, () => {
	return {
		todo: {
			row: {
				delete: ANYONE_CAN,
				insert: ANYONE_CAN,
				select: ANYONE_CAN,
				update: {
					postMutation: ANYONE_CAN,
					preMutation: ANYONE_CAN,
				},
			},
		},
	} satisfies PermissionsConfig<unknown, Schema>;
});
