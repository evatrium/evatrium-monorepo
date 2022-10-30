import { describe, it, expect } from 'vitest';
import { getMatchBy } from '~/getMatchBy';

describe('getMatchBy', () => {
	it('should return a default equality checker if a falsy value is provided', () => {
		const checker = getMatchBy();

		expect(checker('a', 'a')).toBe(true);
	});

	it('should return a function that compares keys when a string is provided', () => {
		const checker = getMatchBy({ matchBy: 'someKey' });

		const objA = { someKey: 1 };

		expect(checker(objA, 1)).toBe(true);
	});

	it('should return provided function', () => {
		const checker = getMatchBy({
			matchBy: () => false
		});

		const objA = { someKey: 2 };

		expect(checker(objA, 2)).toBe(false);
	});

	it('should check deeply nested values if a getIn option is provided', () => {
		const checker = getMatchBy({
			matchBy: 'someKey.thatIs'
		});

		const objA = { someKey: { thatIs: 'nested' } };

		const containsValue = 'nested';

		expect(checker(objA, containsValue)).toBe(true);

		const objB = { someKey: { thatIs: 'different' } };

		expect(checker(objB, containsValue)).toBe(false);
	});
});
