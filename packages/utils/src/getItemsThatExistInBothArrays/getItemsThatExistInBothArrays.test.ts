import { describe, it, expect } from 'vitest';
import { getItemsThatExistInBothArrays } from '~/getItemsThatExistInBothArrays';

describe('getItemsThatExistInBothArrays', () => {
	it('returns items that exist in two simple string arrays', () => {
		const arr1 = ['foo', 'bing', 'bar'];

		const arr2 = ['bar', 'baz', 'bing'];

		const result = getItemsThatExistInBothArrays(arr1, arr2);

		const expected = ['bing', 'bar'];

		expect(result).toMatchObject(expected);
	});

	it('returns items that exist in two nested object arrays', () => {
		const arr1 = [{ data: { name: 'foo' } }, { data: { name: 'bar' } }, { data: { name: 'baz' } }];

		const arr2 = [{ data: { name: 'foo' } }, { data: { name: 'bar' } }, { data: { name: 'bing' } }];

		const result = getItemsThatExistInBothArrays(arr1, arr2, {
			matchBy: 'data.name'
		});

		const expected = [{ data: { name: 'foo' } }, { data: { name: 'bar' } }];

		expect(result).toMatchObject(expected);
	});
});
