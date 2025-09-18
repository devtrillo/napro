import { Z } from 'zero-svelte';

import { schema } from './schema';

export function createZInstance(id: string) {
	console.log('Creating Z instance with userID:', id);
	return new Z({
		schema,
		server: 'http://localhost:4848',
		userID: id,
	});
}
