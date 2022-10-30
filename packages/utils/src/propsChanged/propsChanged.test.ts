import { describe, it, expect } from 'vitest';
import { propsChanged, fixedPropsChanged } from '~/propsChanged';

describe('fixedPropsChanged', () => {
	it('should return true when values change on an object', () => {
		expect(fixedPropsChanged({ a: 1, b: 2 }, { a: 1, b: 4 })).toBeTruthy();
		expect(fixedPropsChanged({ a: 1, b: 2 }, { a: 1, b: 3 })).toBeTruthy();
	});
	it("should return false when values are the same '===' ", () => {
		expect(fixedPropsChanged({ a: 1, b: 2 }, { a: 1, b: 2 })).toBeFalsy();
		expect(fixedPropsChanged({}, {})).toBeFalsy();
	});
});

describe('propsChanged', () => {
	const comparator = propsChanged;
	it('should return true when values change on an object or number of keys change', () => {
		// values change
		expect(comparator({ a: 1, b: 2 }, { a: 1, b: 4 })).toBeTruthy();
		expect(comparator({ a: '1', b: '2' }, { a: '3', b: '4' })).toBeTruthy();
		expect(comparator({ a: true, b: true }, { a: false, b: true })).toBeTruthy();
		expect(comparator({ a: true, b: true }, { a: false, b: 1 })).toBeTruthy();
		// keys added
		expect(comparator({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 })).toBeTruthy();
		// keys removed
		expect(comparator({ a: 1, b: 2, c: 3 }, { a: 1, b: 2 })).toBeTruthy();
		// empty objects
		expect(comparator({}, { a: 1, b: 2 })).toBeTruthy();
		expect(comparator({ a: 1, b: 2 }, {})).toBeTruthy();
	});
	it("should return false when values are the same '===' and same number of keys", () => {
		expect(comparator({ a: 1, b: 2 }, { a: 1, b: 2 })).toBeFalsy();
		expect(comparator({}, {})).toBeFalsy();
	});
});
