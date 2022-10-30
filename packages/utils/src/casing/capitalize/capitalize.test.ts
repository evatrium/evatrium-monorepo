import { describe, it, expect } from 'vitest';
import { capitalize } from './capitalize';

describe('capitalize', () => {
	it('returns expected output', () => {
		const result = capitalize('foobar');
		expect(result).toMatchObject('Foobar');
	});
});
