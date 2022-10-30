import { describe, it, expect } from 'vitest';
import { updateMany } from '~/updateMany';

describe('updateMany', () => {
	it('returns expected output', () => {
		const arr = [
			{ id: 1, name: { first: 'Robert', last: 'Ford' } },
			{ id: 3, name: { first: 'Bernard', last: 'Lowe' } },
			{ id: 4, name: { first: 'Teddy', last: 'Flood' } }
		];

		const selections = [
			{ id: 3, name: { first: 'first' } },
			{ id: 4, name: { first: 'first' } }
		];

		const result = updateMany(arr, selections, {
			matchBy: 'id'
		});

		expect(result).toMatchObject([
			{ id: 1, name: { first: 'Robert', last: 'Ford' } },
			{ id: 3, name: { first: 'first', last: 'Lowe' } },
			{ id: 4, name: { first: 'first', last: 'Flood' } }
		]);
	});
});
