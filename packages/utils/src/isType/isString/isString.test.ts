import { describe, it, expect } from 'vitest';

import { isString } from '~/isType';

describe('isString', () => {
	const type = 'string';
	const isType = isString;

	it(`should return true when value is ${type}`, () => {
		expect(isType('')).toBeTruthy();
		expect(isType('foo')).toBeTruthy();
	});

	it(`should return false when value is not ${type}`, () => {
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
