import { describe, expect, it } from 'vitest';
import z from 'zod';

import formDataToObject from './formDataToObject';
import zodErrorToObject from './zodErrorToString';

describe('The formDataToObject utility', () => {
	it('should convert FormData to an object correctly', () => {
		const fd = new FormData();
		fd.append('name', 'Alice');
		fd.append('age', '30');
		const obj = formDataToObject(fd);
		expect(obj).toEqual({ age: '30', name: 'Alice' });
	});

	it('should convert FormData to an object correctly with array items', () => {
		const fd = new FormData();
		fd.append('hobby', 'reading');
		fd.append('hobby', 'cycling');
		fd.append('hobby', 'swimming');
		const obj = formDataToObject(fd);
		expect(obj).toEqual({ hobby: ['reading', 'cycling', 'swimming'] });
	});

	it('should convert FormData to an object correctly with falsy values', () => {
		const fd = new FormData();
		fd.append('empty', '');
		fd.append('zero', '0');
		fd.append('false', 'false');
		const obj = formDataToObject(fd);
		expect(obj).toEqual({ empty: '', false: 'false', zero: '0' });
	});

	it('should convert FormData to an object correctly with nested objects', () => {
		const fd = new FormData();
		fd.append('user', JSON.stringify({ age: 25, name: 'Bob' }));
		const obj = formDataToObject(fd);
		expect(obj).toEqual({ user: '{"name":"Bob","age":25}' });
	});

	it('should convert empty FormData to an empty object', () => {
		const fd = new FormData();
		const obj = formDataToObject(fd);
		expect(obj).toEqual({});
	});

	it('should handle mixed single and multiple values', () => {
		const fd = new FormData();
		fd.append('name', 'Charlie');
		fd.append('hobby', 'guitar');
		fd.append('hobby', 'piano');
		fd.append('city', 'Paris');
		const obj = formDataToObject(fd);
		expect(obj).toEqual({ city: 'Paris', hobby: ['guitar', 'piano'], name: 'Charlie' });
	});
});

describe('zodErrorToObject', () => {
	it('should convert a simple ZodError to an object', () => {
		const schema = z.object({
			age: z.number(),
			name: z.string(),
		});
		const result = schema.safeParse({ age: 'abc', name: 123 });
		expect(result.success).toBe(false);
		const errorObj = zodErrorToObject(result.error!);
		expect(errorObj).toStrictEqual({
			age: {
				code: 'invalid_type',
				message: 'Invalid input: expected number, received string',
			},
			name: {
				code: 'invalid_type',
				message: 'Invalid input: expected string, received number',
			},
		});
	});

	it('should handle nested objects', () => {
		const schema = z.object({
			user: z.object({
				email: z.email(),
				profile: z.object({
					age: z.number().min(18),
				}),
			}),
		});
		const result = schema.safeParse({
			user: {
				email: 'not-an-email',
				profile: { age: 10 },
			},
		});
		expect(result.success).toBe(false);
		const errorObj = zodErrorToObject(result.error!);
		expect(errorObj).toStrictEqual({
			'user.email': {
				code: 'invalid_format',
				message: 'Invalid email address',
			},
			'user.profile.age': {
				code: 'too_small',
				message: 'Too small: expected number to be >=18',
			},
		});
	});

	it('should return an empty object for no issues', () => {
		const schema = z.object({ name: z.string() });
		const result = schema.safeParse({ name: 'Alice' });
		expect(result.success).toBe(true);
		// Should not call zodErrorToObject if no error, but test for empty issues
		const errorObj = zodErrorToObject(result.error!);
		expect(errorObj).toEqual({});
	});

	it('should handle array fields', () => {
		const schema = z.object({
			tags: z.array(z.string().min(3)),
		});
		const result = schema.safeParse({ tags: ['ok', 'no', 'good'] });
		expect(result.success).toBe(false);
		const errorObj = zodErrorToObject(result.error!);
		expect(errorObj).toMatchInlineSnapshot(`
			{
			  "tags.0": {
			    "code": "too_small",
			    "message": "Too small: expected string to have >=3 characters",
			  },
			  "tags.1": {
			    "code": "too_small",
			    "message": "Too small: expected string to have >=3 characters",
			  },
			}
		`);
	});
});
