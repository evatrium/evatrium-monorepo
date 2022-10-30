import { describe, it, expect } from 'vitest';

import { isRegExp } from '~/isType';

describe('isRegexp', () => {
	const type = 'regex';
	const isType = isRegExp;

	it(`should return true when value is a ${type}`, () => {
		expect(isType(new RegExp('[a-z]'))).toBeTruthy();
	});

	it(`should return false when value is not a ${type}`, () => {
		expect(isType(null)).toBeFalsy();
		expect(isType(undefined)).toBeFalsy();
		expect(isType(-1)).toBeFalsy();
		expect(isType(0)).toBeFalsy();
		expect(isType(1)).toBeFalsy();
		expect(isType({})).toBeFalsy();
		expect(isType([])).toBeFalsy();
		expect(isType(new String('test'))).toBeFalsy();
		expect(isType(() => null)).toBeFalsy();
	});
});
