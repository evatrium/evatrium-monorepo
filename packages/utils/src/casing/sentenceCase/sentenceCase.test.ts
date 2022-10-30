import { describe, it, expect } from 'vitest';
import { sentenceCase } from './sentenceCase';

describe('sentenceCase', () => {
	it('returns expected output', () => {
		const result = sentenceCase('foo bar bing baz');
		expect(result).toBe('Foo Bar Bing Baz');
	});
});
