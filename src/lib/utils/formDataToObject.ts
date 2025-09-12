/**
 * Converts a `FormData` object into a plain JavaScript object.
 * Handles multiple values for the same key by storing them in an array.
 *
 * @typeParam T - The shape of the resulting object, typically inferred.
 * @param formData - The `FormData` instance to convert.
 * @returns An object representation of the form data, where keys map to their corresponding values.
 *
 * @example
 * ```typescript
 * const formData = new FormData();
 * formData.append('name', 'Alice');
 * formData.append('hobby', 'reading');
 * formData.append('hobby', 'cycling');
 * const obj = formDataToObject(formData);
 * // obj = { name: 'Alice', hobby: ['reading', 'cycling'] }
 * ```
 */
function formDataToObject<T extends Record<string, unknown>>(formData: FormData): T {
	return Array.from(formData.entries()).reduce((acc, [key, value]) => {
		// Handle multiple values for same key
		if (acc[key]) {
			if (Array.isArray(acc[key])) {
				acc[key].push(value);
			} else {
				//@ts-expect-error because of how generic work
				acc[key] = [acc[key], value];
			}
		} else {
			//@ts-expect-error because of how generic work
			acc[key] = value;
		}
		return acc;
	}, {} as T);
}

export default formDataToObject;
