import { describe, it, expect } from 'vitest';
import { includesAll } from '~/includesAll';

describe('includesAll', () => {
	it('should return true if the array1 includes all items from array2', () => {
		expect(includesAll(['a', 'b', 'c'], ['a', 'b', 'c'])).toBeTruthy();
		expect(includesAll(['a', 'b', 'c'], ['a', 'c', 'b'])).toBeTruthy();
		expect(includesAll(['a', 'b', 'c', 'd'], ['a', 'c', 'b'])).toBeTruthy();
		expect(includesAll(['a', 'b', 'c'], [])).toBeTruthy();
	});
	it('should return false if the array1 does not have all items from array2', () => {
		expect(includesAll(['a', 'b', 'c'], ['a', 'b', 'c', 'd'])).toBeFalsy();
		expect(includesAll(['a', 'b', 'c'], ['a', 'b', 'd'])).toBeFalsy();
		expect(includesAll([], ['a', 'b', 'd'])).toBeFalsy();
	});
});
