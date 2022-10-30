import { describe, it, expect } from 'vitest';

import { isObject } from '~/isType';

describe('isObject', () => {
	const type = 'object and not null';
	const isType = isObject;

	it(`should return true when value is ${type}`, () => {
		expect(isType(new Promise(() => 0))).toBeTruthy();
		expect(isType(new Date())).toBeTruthy();
		expect(isType({ foo: 'bar' })).toBeTruthy();
		expect(isType({})).toBeTruthy();
		expect(isType([])).toBeTruthy();
	});

	it(`should return false when value is not ${type}`, () => {
		expect(isType(null)).toBeFalsy();
		expect(isType('foo')).toBeFalsy();
		expect(isType(undefined)).toBeFalsy();
		expect(isType(-1)).toBeFalsy();
		expect(isType(0)).toBeFalsy();
		expect(isType(1)).toBeFalsy();
		expect(isType(() => null)).toBeFalsy();
	});
});
