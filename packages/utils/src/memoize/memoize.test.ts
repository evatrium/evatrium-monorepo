import { describe, expect, it, vi } from 'vitest';
import { memoize } from '~/memoize';

describe('memoize', () => {
	it('should only call the source function if its called with new arguments, and when cache is cleared', () => {
		const spyOnMe = {
			func: (a: any = '', b: any = '', c: any = ''): string => {
				return `${a}${b}${c}`;
			}
		};

		const funcSpy = vi.spyOn(spyOnMe, 'func');

		const memoizedFunc = memoize(spyOnMe.func);

		let res = memoizedFunc('a', 'b', 'c');

		expect(res).toBe('abc');
		expect(funcSpy).toBeCalledTimes(1);

		const arg: Record<string, any> = { id: 'asdf', users: ['bob', 'joe'] };
		res = memoizedFunc(arg);

		expect(res).toBe(`${arg}`);
		expect(funcSpy).toBeCalledTimes(2);

		// should hit cache
		res = memoizedFunc(arg);
		expect(res).toBe(`${arg}`);
		expect(funcSpy).toBeCalledTimes(2);

		// should hit cache
		res = memoizedFunc(arg);
		expect(res).toBe(`${arg}`);
		expect(funcSpy).toBeCalledTimes(2);

		// should call func
		arg.foo = 'bar';
		res = memoizedFunc(arg);
		expect(res).toBe(`${arg}`);
		expect(funcSpy).toBeCalledTimes(3);

		// should hit cache
		res = memoizedFunc(arg);
		expect(res).toBe(`${arg}`);
		expect(funcSpy).toBeCalledTimes(3);

		// should hit cache
		delete arg.foo;
		res = memoizedFunc(arg);
		expect(res).toBe(`${arg}`);
		expect(funcSpy).toBeCalledTimes(3);

		// clear cache
		memoizedFunc.clear();
		expect(memoizedFunc.cache).toMatchObject({});

		// should call func
		res = memoizedFunc(arg);
		expect(res).toBe(`${arg}`);
		expect(funcSpy).toBeCalledTimes(4);
	});
});
