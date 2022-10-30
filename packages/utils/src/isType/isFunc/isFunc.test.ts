import { describe, it, expect } from 'vitest';

import { isFunc } from '~/isType';

describe('isFunc', () => {
	const type = 'function';
	const isType = isFunc;

	it(`should return true when value is ${type}`, () => {
		expect(isType(() => null)).toBeTruthy();
		expect(
			isType(function foo() {
				return null;
			})
		).toBeTruthy();
	});

	it(`should return false when value is not ${type}`, () => {
		expect(isType(null)).toBeFalsy();
		expect(isType(undefined)).toBeFalsy();
		expect(isType(-1)).toBeFalsy();
		expect(isType(0)).toBeFalsy();
		expect(isType(1)).toBeFalsy();
		expect(isType(new String('test'))).toBeFalsy();
		expect(isType(new Blob())).toBeFalsy();
		expect(isType({})).toBeFalsy();
		expect(isType([])).toBeFalsy();
	});
});
