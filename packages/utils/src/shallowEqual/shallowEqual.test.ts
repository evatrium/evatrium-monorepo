import { describe, it, expect } from 'vitest';
import { shallowEqual } from '~/shallowEqual';

// some test cases are from:
// https://github.com/dashed/shallowequal/blob/master/test/shallowequal.test.js#L46
describe('shallowEqual', () => {
	const comparator = shallowEqual;

	it('returns false if either argument is null', () => {
		expect(comparator(null, {})).toBeFalsy();
		expect(comparator({}, null)).toBeFalsy();
	});

	it('returns true if both arguments are null or undefined', () => {
		expect(comparator(null, null)).toBeTruthy();
		expect(comparator(undefined, undefined)).toBeTruthy();
	});

	it('returns true if arguments are shallow equal', () => {
		expect(comparator({ a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 3 })).toBeTruthy();
	});

	it('returns false if arguments are not objects and not equal', () => {
		expect(comparator(1, 2)).toBeFalsy();
	});

	it('returns false if only one argument is not an object', () => {
		expect(comparator(1, {})).toBeFalsy();
	});

	it('returns false if first argument has too many keys', () => {
		expect(comparator({ a: 1, b: 2, c: 3 }, { a: 1, b: 2 })).toBeFalsy();
	});

	it('returns false if second argument has too many keys', () => {
		expect(comparator({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 })).toBeFalsy();
	});

	it('returns true if values are not primitives but are ===', () => {
		const obj = {};
		expect(comparator({ a: 1, b: 2, c: obj }, { a: 1, b: 2, c: obj })).toBeTruthy();
	});

	it('should treat objects created by `Object.create(null)` like any other plain object', () => {
		function Foo(this: any) {
			this.a = 1;
		}

		Foo.prototype.constructor = null;

		const object2 = { a: 1 };
		// @ts-ignore
		expect(comparator(new Foo(), object2)).toBeTruthy();

		const object1 = Object.create(null);
		object1.a = 1;
		expect(comparator(object1, object2)).toBeTruthy();
	});
});
