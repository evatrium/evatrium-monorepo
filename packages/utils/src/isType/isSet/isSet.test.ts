import { describe, it, expect } from 'vitest';
import { isSet } from '~/isType';

describe('isSet', () => {
	const type = 'instance of set';
	const isType = isSet;

	it(`should return true when value is ${type}`, () => {
		expect(isType(new Set())).toBeTruthy();
	});

	it(`should return false when value is not ${type}`, () => {
		expect(isType(null)).toBeFalsy();
		expect(isType(new Map())).toBeFalsy();
		expect(isType(true)).toBeFalsy();
		expect(isType(false)).toBeFalsy();
		expect(isType(undefined)).toBeFalsy();
		expect(isType(-1)).toBeFalsy();
		expect(isType(0)).toBeFalsy();
		expect(isType(1)).toBeFalsy();
		expect(isType(NaN)).toBeFalsy();
		expect(isType(new String('test'))).toBeFalsy();
		expect(isType(() => null)).toBeFalsy();
		expect(isType(new Blob())).toBeFalsy();
		expect(isType({})).toBeFalsy();
		expect(isType([])).toBeFalsy();
	});
});
