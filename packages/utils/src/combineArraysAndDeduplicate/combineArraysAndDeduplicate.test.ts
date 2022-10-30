import { describe, it, expect } from 'vitest';
import { combineArraysAndDeduplicate } from '~/combineArraysAndDeduplicate';

describe('combineArraysAndDeduplicate', () => {
	it('combines and deduplicates two simple arrays', () => {
		const arr1 = ['bar', 'baz', 'foo'];

		const arr2 = ['foo', 'bing', 'buzz'];

		const result = combineArraysAndDeduplicate(arr1, arr2);

		const expected = ['bar', 'baz', 'foo', 'bing', 'buzz'];

		expect(result).toMatchObject(expected);
	});

	it('combines and deduplicates two nested arrays', () => {
		const arr1 = [{ data: { name: 'bar' } }, { data: { name: 'baz' } }];

		const arr2 = [
			{ data: { name: 'foo' } },
			{ data: { name: 'bing' } },
			{ data: { name: 'baz' } },
			{ data: { name: 'bar' } }
		];

		const result = combineArraysAndDeduplicate(arr1, arr2, { matchBy: 'data.name' });

		const expected = [
			{ data: { name: 'bar' } },
			{ data: { name: 'baz' } },
			{ data: { name: 'foo' } },
			{ data: { name: 'bing' } }
		];

		expect(result).toMatchObject(expected);
	});

	it('combines and deduplicates two nested arrays using custom comparison', () => {
		const arr1 = [{ data: { name: 'bar' } }, { data: { name: 'baz' } }];

		const arr2 = [
			{ data: { name: 'foo' } },
			{ data: { name: 'bing' } },
			{ data: { name: 'baz' } },
			{ data: { name: 'bar' } }
		];

		const result = combineArraysAndDeduplicate(arr1, arr2, {
			matchBy: (a, b) => a.data.name === b.data.name
		});

		const expected = [
			{ data: { name: 'bar' } },
			{ data: { name: 'baz' } },
			{ data: { name: 'foo' } },
			{ data: { name: 'bing' } }
		];

		expect(result).toMatchObject(expected);
	});
});
