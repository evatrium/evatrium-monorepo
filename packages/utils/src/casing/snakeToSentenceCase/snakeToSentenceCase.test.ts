import { describe, it, expect } from 'vitest';
import { snakeToSentenceCase } from './snakeToSentenceCase';

describe('snakeToSentenceCase', () => {
	it('returns expected output', () => {
		const result = snakeToSentenceCase('wow_cool_underscore_very_django');
		const expected = 'Wow Cool Underscore Very Django';
		expect(result).toMatchObject(expected);
	});
});
