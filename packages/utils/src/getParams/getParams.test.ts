import { describe, it, expect } from 'vitest';
import { getParams } from '~/getParams';

describe('getParams', () => {
	it('returns expected output', () => {
		const result = getParams('foo=bar&baz=bing');
		const expected = { foo: 'bar', baz: 'bing' };
		expect(result).toMatchObject(expected);
	});
});
