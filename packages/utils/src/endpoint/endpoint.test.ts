import { describe, it, expect } from 'vitest';
import { endpoint } from '~/endpoint';

// @TODO
describe('endpoint', () => {
	it('returns expected output', () => {
		const result = endpoint`post:foo/${'bar'}?${{ id: 123, group: 1 }} ${{
			message: 'hello'
		}}`;
		const expected = {
			method: 'POST',
			url: 'foo/bar?id=123&group=1',
			search: 'id=123&group=1',
			body: JSON.stringify({ message: 'hello' })
		};
		expect(result).toMatchObject(expected);
	});
});
