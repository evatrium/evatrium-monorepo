import { describe, it, expect } from 'vitest';
import { createLocalStore } from '~/createLocalStore';
import { wait } from '~/wait';

describe('createLocalStore', () => {
	it('should stringify and parse values from local storage', async () => {
		const ls = createLocalStore({ debounceTime: 10 });

		const item = { foo: 'bar' };

		ls.setItem('test', item);

		expect(ls.getItem('nope')).toBe(null);

		expect(ls.getItem('test')).toMatchObject(item);

		ls.removeItem('test');

		expect(ls.getItem('test')).toBe(null);

		ls.setItemDebounced('foo', item);

		await wait(20);

		expect(ls.getItem('foo')).toMatchObject(item);

		ls.clear();

		expect(ls.getItem('foo')).toBe(null);
	});

	it('should subscribe to storage events', async () => {
		const spyOnMe = {
			func: () => void 0
		};
		const funcSpy = vi.spyOn(spyOnMe, 'func');

		const ls = createLocalStore({ debounceTime: 10 });

		ls.subscribeToKey('test', spyOnMe.func);

		// @TODO: jsdom testing env doesn't emit the correct storage event
		// window.addEventListener('storage', (...args)=>{
		// 	console.log(...args);
		// })

		window.dispatchEvent(new Event('storage'));

		await wait(10);

		expect(funcSpy).toBeCalledTimes(1);
	});
});
