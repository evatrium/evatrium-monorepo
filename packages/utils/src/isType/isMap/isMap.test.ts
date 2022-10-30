import { describe, it, expect } from 'vitest';
import { isMap } from '~/isType';

describe('isMap', () => {
	const type = 'instance of map';
	const isType = isMap;

	it(`should return true when value is ${type}`, () => {
		expect(isType(new Map())).toBeTruthy();
	});

	it(`should return false when value is not ${type}`, () => {
		expect(isType(null)).toBeFalsy();
		expect(isType(new Set())).toBeFalsy();
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
