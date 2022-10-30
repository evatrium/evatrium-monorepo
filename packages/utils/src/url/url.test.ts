import { describe, it, expect } from 'vitest';
import { url } from '~/url';

describe('url', () => {
	it('returns expected output', () => {
		const result = url`foo/bar?${{ id: 123 }}`;
		const expected = 'foo/bar?id=123';
		expect(result).toMatchObject(expected);
	});
});
