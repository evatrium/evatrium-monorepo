import { describe, it, expect } from 'vitest';

import { isObjectType } from '~/isType';

describe('isObjectType', () => {
	const type = 'object type';
	const isType = isObjectType;

	it(`should return true when value is ${type}`, () => {
		expect(isType({})).toBeTruthy();
		expect(isType([])).toBeTruthy();
		expect(isType(null)).toBeTruthy();
		expect(isType(new Blob())).toBeTruthy();
		expect(isType(new Promise(() => 0))).toBeTruthy();
		expect(isType(new Date())).toBeTruthy();
	});

	it(`should return false when value is not ${type}`, () => {
		expect(isType(undefined)).toBeFalsy();
		expect(isType(-1)).toBeFalsy();
		expect(isType(0)).toBeFalsy();
		expect(isType(1)).toBeFalsy();
		expect(isType(() => null)).toBeFalsy();
	});
});
