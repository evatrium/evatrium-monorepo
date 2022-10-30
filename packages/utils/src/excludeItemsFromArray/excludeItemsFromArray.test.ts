import { describe, it, expect } from 'vitest';
import { excludeItemsFromArray } from '~/excludeItemsFromArray';

describe('excludeItemsFromArray', () => {
	it('removes items from simple arrays', () => {
		const arr = ['foo', 'bar', 'baz', 'bing'];

		const toExclude = ['bar', 'baz'];

		const expected = ['foo', 'bing'];

		const result = excludeItemsFromArray(arr, toExclude);

		expect(result).toMatchObject(expected);
	});

	it('removes items from nested arrays', () => {
		const arr = [
			{ data: { name: 'foo' } },
			{ data: { name: 'bar' } },
			{ data: { name: 'baz' } },
			{ data: { name: 'bing' } }
		];

		const toExclude = [{ data: { name: 'bar' } }, { data: { name: 'baz' } }];

		const expected = [{ data: { name: 'foo' } }, { data: { name: 'bing' } }];

		const result = excludeItemsFromArray(arr, toExclude, { matchBy: 'data.name' });

		expect(result).toMatchObject(expected);
	});

	it('removes items from nested arrays while matchByOnValue false', () => {
		const arr = [
			{ data: { name: 'foo' } },
			{ data: { name: 'bar' } },
			{ data: { name: 'baz' } },
			{ data: { name: 'bing' } }
		];

		const toExclude = ['bar', 'baz'];

		const expected = [{ data: { name: 'foo' } }, { data: { name: 'bing' } }];

		const result = excludeItemsFromArray(arr, toExclude, {
			matchBy: 'data.name',
			matchByOnValue: false
		});

		expect(result).toMatchObject(expected);
	});

	it('removes items from nested arrays while matchByOnValue false, and returns removed when option passed', () => {
		const arr = [
			{ data: { name: 'foo' } },
			{ data: { name: 'bar' } },
			{ data: { name: 'baz' } },
			{ data: { name: 'bing' } }
		];

		const toExclude = ['bar', 'baz'];

		const expected = [{ data: { name: 'foo' } }, { data: { name: 'bing' } }];

		const [result, removed] = excludeItemsFromArray(arr, toExclude, {
			matchBy: 'data.name',
			matchByOnValue: false,
			returnRemoved: true
		});

		expect(result).toMatchObject(expected);

		expect(removed).toMatchObject([{ data: { name: 'bar' } }, { data: { name: 'baz' } }]);
	});
});
