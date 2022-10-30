import { describe, it, expect } from 'vitest';
import { isWeb } from '~/isWeb';

describe('isWeb', () => {
	it('returns expected output', () => {
		const result = isWeb();
		const expected = true; // cuz we have jsdom
		expect(result).toMatchObject(expected);
		const result2 = isWeb();
		// make sure it stores the result
		expect(result2).toMatchObject(expected);
	});
});
