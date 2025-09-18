import { sql } from 'drizzle-orm';
import {
	boolean,
	decimal,
	index,
	integer,
	pgEnum,
	pgTable,
	text,
	timestamp,
	unique,
	uuid,
} from 'drizzle-orm/pg-core';

import { user } from './auth-schema';
import { timestamps } from './helpers';

export * from './auth-schema';

export const todo = pgTable('todo', {
	completed: boolean().default(false),
	id: uuid().primaryKey(),
	title: text(),
});
export const trackingEnum = pgEnum('tracking_method', ['creighton']);

export const fertilityPreferences = pgTable('fertility_preferences', {
	avgCycleLength: integer('avg_cycle_length').notNull().default(28),
	dailyReminder: timestamp('daily_reminder', { withTimezone: false }).notNull().default(),
	trackingMethod: trackingEnum(),
	userId: text('user_id')
		.references(() => user.id, { onDelete: 'cascade' })
		.primaryKey(),
});

export const cycles = pgTable(
	'cycles',
	{
		...timestamps,
		cycleLength: integer('cycle_length'),
		endDate: timestamp('end_date', { mode: 'date' }),
		id: uuid('id').primaryKey().defaultRandom(),
		isComplete: boolean('is_complete').default(false),
		notes: text('notes'),
		number: integer('cycle_number').notNull(),
		peakDay: integer('peak_day'),
		postPeakPhaseLength: integer('post_peak_phase_length'),
		startDate: timestamp('start_date', { mode: 'date' }).defaultNow().notNull(),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
	},
	(t) => [
		unique().on(t.number, t.userId),
		index('idx_cycles_user_date').on(t.userId, t.startDate),
		index('idx_cycles_user_number').on(t.userId, t.number),
	],
);

export const bleedingColor = pgEnum('bleeding_color', ['red', 'brown']);
export const bleedingFlow = pgEnum('bleeding_flow', ['heavy', 'moderate', 'light', 'very_light']);
export const dailyObservations = pgTable(
	'daily_observations',
	{
		bleedingColor: bleedingColor(),
		bleedingFlow: bleedingFlow(),
		countOfThree: boolean('count_of_three').default(false),
		cycleDay: integer('cycle_day').notNull(),
		cycleId: uuid('cycle_id')
			.notNull()
			.references(() => cycles.id, { onDelete: 'cascade' }),
		id: uuid('id').primaryKey().defaultRandom(),
		intercourse: boolean('intercourse').default(false),
		mucusColor: text('mucus_color'),
		mucusConsistency: text('mucus_consistency'),
		mucusSensation: text('mucus_sensation'),
		notes: text('notes'),
		observationDate: timestamp('observation_date', { mode: 'date' }).notNull(),
		peakDay: boolean('peak_day').default(false),
		primaryCode: text('primary_code'),
		secondaryCodes: text('secondary_codes'),
		specialCircumstances: text('special_circumstances'),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		...timestamps,
	},
	(t) => [
		unique().on(t.cycleId, t.cycleDay),
		index('idx_observations_user_date').on(t.userId, t.observationDate),
		index('idx_observations_cycle').on(t.cycleId, t.cycleDay),
		index('idx_observations_peak')
			.on(t.userId, t.peakDay)
			.where(sql`peak_day = TRUE`),
	],
);

export const cycleInsights = pgTable(
	'cycle_insights',
	{
		...timestamps,
		algoritmVersion: text('algorithm_version').default('1.0'),
		confidenceLevel: decimal('confidence_level', { precision: 2 }),
		cycleId: uuid('cycle_id')
			.notNull()
			.references(() => cycles.id, { onDelete: 'cascade' }),
		cycleRegularityScore: integer('cycle_regularity_score'),
		fertileWindowEnd: timestamp('fertile_window_end', { mode: 'date' }),
		fertileWindowStart: timestamp('fertile_window_start', { mode: 'date' }),
		id: uuid('id').primaryKey().defaultRandom(),
		mucusPatternQuality: text('mucus_pattern_quality'),
		peakMucusDay: timestamp('peak_mucus_day', { mode: 'date' }),
		postPeakInfertileStart: timestamp('post_peak_infertile_start', { mode: 'date' }),
		predictedFertileWindowEnd: timestamp('predicted_fertile_window_end', { mode: 'date' }),
		predictedFertileWindowStart: timestamp('predicted_fertile_window_start', { mode: 'date' }),
		predictedNextCycleStart: timestamp('predicted_next_cycle_start', { mode: 'date' }),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
	},
	(t) => [
		unique().on(t.userId, t.cycleId),
		index('idx_insights_user_cycle').on(t.userId, t.cycleId),
		index('idx_insights_predictions').on(t.userId, t.predictedNextCycleStart),
	],
);
