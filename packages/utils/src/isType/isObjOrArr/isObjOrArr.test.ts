import { describe, it, expect } from 'vitest';

import { isObjOrArr } from '~/isType';

describe('isObjOrArr', () => {
	const type = 'plain object {} or array []';
	const isType = isObjOrArr;

	it(`should return true when value is ${type}`, () => {
		expect(isType([])).toBeTruthy();
		expect(isType({ foo: 'bar' })).toBeTruthy();
	});

	it(`should return false when value is not ${type}`, () => {
		expect(isType(null)).toBeFalsy();
		expect(isType(undefined)).toBeFalsy();
		expect(isType(-1)).toBeFalsy();
		expect(isType(0)).toBeFalsy();
		expect(isType(1)).toBeFalsy();
		expect(isType(new String('test'))).toBeFalsy();
		expect(isType(() => null)).toBeFalsy();
		expect(isType(new Blob())).toBeFalsy();
	});
});
