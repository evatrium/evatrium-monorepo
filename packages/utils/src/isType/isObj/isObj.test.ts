import { describe, it, expect } from 'vitest';

import { isObj } from '~/isType';

describe('isObj', () => {
	const type = 'plain object {} and not null';
	const isType = isObj;

	it(`should return true when value is a ${type}`, () => {
		expect(isType({})).toBeTruthy();
		expect(isType({ foo: 'bar' })).toBeTruthy();

		// expect(isType(Object.create(null))).toBeTruthy(); //@TODO: need to look into this one
	});

	it(`should return false when value is not a ${type}`, () => {
		expect(isType(Object)).toBeFalsy();
		expect(isType(null)).toBeFalsy();
		expect(isType(undefined)).toBeFalsy();
		expect(isType(new Promise(() => 0))).toBeFalsy();
		expect(isType(new Date())).toBeFalsy();
		expect(isType(-1)).toBeFalsy();
		expect(isType(0)).toBeFalsy();
		expect(isType(1)).toBeFalsy();
		expect(isType([])).toBeFalsy();
		expect(isType(new String('test'))).toBeFalsy();
		expect(isType(() => null)).toBeFalsy();
		expect(isType(new Blob())).toBeFalsy();
	});
});
