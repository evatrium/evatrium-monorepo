import { describe, it, expect } from 'vitest';
import { isDateObject } from '~/isType';

describe('isDateObject', () => {
	const type = 'date';
	const isType = isDateObject;

	it(`should return true when value is ${type}`, () => {
		const date = new Date();
		expect(isType(date)).toBeTruthy();
	});

	it(`should return false when value is not ${type}`, () => {
		expect(isType(null)).toBeFalsy();
		expect(isType(new Map())).toBeFalsy();
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
