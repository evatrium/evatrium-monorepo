import { describe, it, expect } from 'vitest';
import { deSnake } from './deSnake';

describe('deSnake', () => {
	it('returns expected output', () => {
		const result = deSnake('foo_bar_baz');
		const expected = 'foo bar baz';
		expect(result).toBe(expected);
	});
});
