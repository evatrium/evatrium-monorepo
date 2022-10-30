import { describe, it, expect } from 'vitest';
import { deKebab } from './deKebab';

describe('deKabab', () => {
	it('returns expected output', () => {
		const result = deKebab('foo-bar');
		const expected = 'foo bar';
		expect(result).toMatchObject(expected);
	});
});
