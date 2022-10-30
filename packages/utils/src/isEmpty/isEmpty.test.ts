import { describe, it, expect } from 'vitest';
import { isEmpty } from '~/isEmpty/index';

describe('isEmpty', () => {
	it('should return true when a data structure is empty or function has no keys', () => {
		expect(isEmpty({})).toBeTruthy();
		expect(isEmpty([])).toBeTruthy();
		expect(isEmpty(new Map())).toBeTruthy();
		expect(isEmpty(new Set())).toBeTruthy();
		expect(isEmpty(() => 0)).toBeTruthy();
	});

	it('should return false when a data structure is not empty or function has keys', () => {
		expect(isEmpty({ foo: 'bar' })).toBeFalsy();
		expect(isEmpty(['foo'])).toBeFalsy();
		expect(isEmpty(new Map([['foo', 'bar']]))).toBeFalsy();
		expect(isEmpty(new Set(['foo']))).toBeFalsy();
		const func = () => 0;
		func.foo = 'bar';
		expect(isEmpty(func)).toBeFalsy();
	});

	it('should return true when a falsy value is provided', () => {
		expect(isEmpty(undefined)).toBeTruthy();
		expect(isEmpty(null)).toBeTruthy();
		expect(isEmpty(false)).toBeTruthy();
		expect(isEmpty(0)).toBeTruthy();
		expect(isEmpty(void 0)).toBeTruthy();
	});

	it('should return false when a truthy value is provided', () => {
		expect(isEmpty(1)).toBeFalsy();
		expect(isEmpty(-1)).toBeFalsy();
		expect(isEmpty('foo')).toBeFalsy();
		expect(isEmpty('false')).toBeFalsy();
		expect(isEmpty(true)).toBeFalsy();
	});
});
