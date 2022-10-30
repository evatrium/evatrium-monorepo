import { describe, it, expect } from 'vitest';

import { isNum } from '~/isType';

describe('isNum', () => {
	const type = 'number';
	const isType = isNum;
	const bigInt = BigInt(Number.MAX_SAFE_INTEGER);
	const bigInt_n = 123n;

	it(`should return true when value is ${type}`, () => {
		expect(isType(-1)).toBeTruthy();
		expect(isType(0)).toBeTruthy();
		expect(isType(1)).toBeTruthy();
		expect(isType(1.1)).toBeTruthy();
		expect(isType(1e5)).toBeTruthy();
	});

	it(`should return false when value is not ${type}`, () => {
		expect(isType(null)).toBeFalsy();
		expect(isType('0')).toBeFalsy();
		expect(isType('1')).toBeFalsy();
		expect(isType(Infinity)).toBeFalsy();
		expect(isType(undefined)).toBeFalsy();
		expect(isType(NaN)).toBeFalsy();
		expect(isType(new String('test'))).toBeFalsy();
		expect(isType(new Blob())).toBeFalsy();
		expect(isType({})).toBeFalsy();
		expect(isType([])).toBeFalsy();

		expect(isType(bigInt)).toBeFalsy();
		expect(isType(bigInt_n)).toBeFalsy();
	});
});
