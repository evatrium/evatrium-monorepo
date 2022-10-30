import { describe, it, expect } from 'vitest';

import { isNullOrUndefined } from '~/isType';

describe('isNullOrUndefined', () => {
	const type = 'null or undefined';
	const isType = isNullOrUndefined;

	it(`should return true when value is ${type}`, () => {
		expect(isType(null)).toBeTruthy();
		expect(isType(undefined)).toBeTruthy();
	});

	it(`should return false when value is not ${type}`, () => {
		expect(isType(-1)).toBeFalsy();
		expect(isType(0)).toBeFalsy();
		expect(isType(1)).toBeFalsy();
		expect(isType('')).toBeFalsy();
		expect(isType(new String('test'))).toBeFalsy();
		expect(isType(() => null)).toBeFalsy();
		expect(isType(new Blob())).toBeFalsy();
		expect(isType({})).toBeFalsy();
		expect(isType([])).toBeFalsy();
	});
});
