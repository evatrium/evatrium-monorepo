import { describe, it, expect } from 'vitest';
import { isPrimitive } from '~/isType';

describe('isPrimitive', () => {
	it('should return true when value is a string', () => {
		expect(isPrimitive('foobar')).toBeTruthy();
	});

	it('should return true when value is a boolean', () => {
		expect(isPrimitive(false)).toBeTruthy();
	});

	it('should return true when value is a number', () => {
		expect(isPrimitive(123)).toBeTruthy();
	});

	it('should return true when value is bigInt', () => {
		expect(isPrimitive(123n)).toBeTruthy();
	});

	it('should return true when value is a symbol', () => {
		expect(isPrimitive(Symbol('asdf'))).toBeTruthy();
	});

	it('should return true when value is null', () => {
		expect(isPrimitive(null)).toBeTruthy();
	});

	it('should return true when value is undefined', () => {
		expect(isPrimitive(undefined)).toBeTruthy();
	});

	it('should return false when value is an object', () => {
		expect(isPrimitive({})).toBeFalsy();
	});

	it('should return false when value is an array', () => {
		expect(isPrimitive([])).toBeFalsy();
	});
});
