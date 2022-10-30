import { describe, it, expect } from 'vitest';

import { isBigInt } from '~/isType';

describe('isBigInt', () => {
	const type = 'bigint';
	const isType = isBigInt;

	it(`should return true when value is ${type}`, () => {
		const bigInt = BigInt(Number.MAX_SAFE_INTEGER);

		expect(isType(bigInt)).toBeTruthy();

		const bigInt_n = 123n;
		expect(isType(bigInt_n)).toBeTruthy();
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
	});
});
