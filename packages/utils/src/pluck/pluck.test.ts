import { describe, it, expect } from 'vitest';
import { pluck } from '~/pluck';

describe('pluck', () => {
	it('should assign keys from pluck list to new object', () => {
		const obj = { a: '1', b: '2', c: '3' };

		const keysToPluck = ['b', 'c'];

		const result = pluck(obj, keysToPluck);

		expect(obj).toMatchObject(obj);

		expect(result).toMatchObject({ b: '2', c: '3' });
	});
});
