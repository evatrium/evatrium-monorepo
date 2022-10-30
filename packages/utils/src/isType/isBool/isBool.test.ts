import { describe, it, expect } from 'vitest';
import { isBool } from '~/isType';

describe('isBool', () => {
	const type = 'boolean';
	const isType = isBool;

	it(`should return true when value is ${type}`, () => {
		expect(isType(true)).toBeTruthy();
		expect(isType(false)).toBeTruthy();
	});

	it(`should return false when value is not ${type}`, () => {
		expect(isType(null)).toBeFalsy();
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
