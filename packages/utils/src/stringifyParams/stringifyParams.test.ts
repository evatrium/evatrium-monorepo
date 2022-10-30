import { describe, it, expect } from 'vitest';
import { stringifyParams } from '~/stringifyParams';

describe('stringifyParams', () => {
	it('returns expected output', () => {
		const result = stringifyParams({ foo: 'bar', baz: 'bing' });
		const expected = 'foo=bar&baz=bing';
		expect(result).toMatchObject(expected);
	});
});
