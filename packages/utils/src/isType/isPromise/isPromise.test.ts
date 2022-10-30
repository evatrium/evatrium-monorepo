import { describe, it, expect } from 'vitest';
import { isPromise } from '~/isType';

describe('isPromise', () => {
	const type = 'promise';
	const isType = isPromise;

	it(`should return true when value is ${type}`, () => {
		const prom = new Promise(() => 1);
		expect(isType(prom)).toBeTruthy();
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
