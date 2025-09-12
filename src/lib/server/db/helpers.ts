import { timestamp } from 'drizzle-orm/pg-core';

export const timestamps = {
	created_at: timestamp().defaultNow().notNull(),
	deleted_at: timestamp(),
	updated_at: timestamp().$onUpdate(() => new Date()),
};
