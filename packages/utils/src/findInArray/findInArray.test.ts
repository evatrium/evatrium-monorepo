import { describe, it, expect } from 'vitest';
import { createFindInArray, findInArray } from '~/findInArray';

describe('findInArray', () => {
	it('finds items in simple arrays ', () => {
		const simple = ['foo', 'bar', 'baz'];

		expect(findInArray(simple, 'foo')).toBe('foo');

		expect(
			findInArray(simple, 'foo', {
				matchBy: (a, b) => a === b
			})
		).toBe('foo');
	});

	it('finds items in object arrays ', () => {
		const objArr = [{ id: 1 }, { id: 2 }, { id: 3 }];

		expect(
			findInArray(objArr, 2, {
				matchBy: 'id'
			})
		).toMatchObject({ id: 2 });
	});

	it('finds items nested simple arrays ', () => {
		const nested = [
			{ id: 1, data: { name: 'foo' } },
			{ id: 2, data: { name: 'bar' } },
			{ id: 3, data: { name: 'baz' } }
		];

		const result = findInArray(nested, 'bar', {
			matchBy: 'data.name'
		});

		expect(result).toMatchObject({ data: { name: 'bar' } });
	});

	it('applies matchBy on search value', () => {
		const nested = [
			{ id: 1, data: { name: 'foo' } },
			{ id: 2, data: { name: 'bar' } },
			{ id: 3, data: { name: 'baz' } }
		];

		const result = findInArray(
			nested,
			{ data: { name: 'bar' } },
			{
				matchBy: 'data.name',
				matchByOnValue: true
			}
		);

		expect(result).toMatchObject({ data: { name: 'bar' } });
	});

	// ------------------------- same tests with createFindInArray

	it('finds items in simple arrays ', () => {
		const simple = ['foo', 'bar', 'baz'];

		const findIn = createFindInArray();

		expect(findIn(simple, 'foo')).toBe('foo');

		const findIn2 = createFindInArray({ matchBy: (a, b) => a === b });

		expect(findIn2(simple, 'foo')).toBe('foo');
	});

	it('finds items in object arrays ', () => {
		const objArr = [{ id: 1 }, { id: 2 }, { id: 3 }];

		const findIn = createFindInArray({ matchBy: 'id' });

		expect(findIn(objArr, 2)).toMatchObject({ id: 2 });
	});

	it('finds items in nested object arrays ', () => {
		const nested = [
			{ id: 1, data: { name: 'foo' } },
			{ id: 2, data: { name: 'bar' } },
			{ id: 3, data: { name: 'baz' } }
		];

		const findIn = createFindInArray({ matchBy: 'data.name' });

		const result = findIn(nested, 'bar');

		expect(result).toMatchObject({ data: { name: 'bar' } });
	});

	it('applies matchBy on search value', () => {
		const nested = [
			{ id: 1, data: { name: 'foo' } },
			{ id: 2, data: { name: 'bar' } },
			{ id: 3, data: { name: 'baz' } }
		];

		const findIn = createFindInArray({ matchBy: 'data.name', matchByOnValue: true });
		const result = findIn(nested, { data: { name: 'bar' } });

		expect(result).toMatchObject({ data: { name: 'bar' } });
	});
});
