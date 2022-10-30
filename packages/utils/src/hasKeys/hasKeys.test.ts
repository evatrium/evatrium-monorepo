import { describe, it, expect } from 'vitest';
import { hasKeys } from '~/hasKeys';

describe('hasKeys', () => {
	it('should return true when an object or function has keys', () => {
		expect(hasKeys({ foo: 'bar' })).toBeTruthy();
		const func = () => 0;
		func.foo = 'bar';
		expect(hasKeys(func)).toBeTruthy();
	});

	it('should return false when an object is empty or function has no keys', () => {
		expect(hasKeys({})).toBeFalsy();
		const func = () => 0;
		expect(hasKeys(func)).toBeFalsy();
	});
});
