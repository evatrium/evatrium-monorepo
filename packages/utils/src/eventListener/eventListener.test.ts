import { describe, it, expect } from 'vitest';
import { eventListener, off, on } from '~/eventListener';
import { wait } from '~/wait';

describe('eventListener', () => {
	it('listens and unlistens to events', async () => {
		const spyOnMe = {
			func: () => undefined
		};
		const funcSpy = vi.spyOn(spyOnMe, 'func');

		on(window, 'click', spyOnMe.func);

		window.dispatchEvent(new Event('click'));

		await wait(10);

		expect(funcSpy).toBeCalledTimes(1);

		off(window, 'click', spyOnMe.func);

		window.dispatchEvent(new Event('click'));

		await wait(10);

		expect(funcSpy).toBeCalledTimes(1);
	});

	it('listens and unlistens to events', async () => {
		const spyOnMe = {
			func: () => undefined
		};
		const funcSpy = vi.spyOn(spyOnMe, 'func');

		const unlisten = eventListener(window, 'click', spyOnMe.func);

		window.dispatchEvent(new Event('click'));

		await wait(10);

		expect(funcSpy).toBeCalledTimes(1);

		unlisten();

		window.dispatchEvent(new Event('click'));

		await wait(10);

		expect(funcSpy).toBeCalledTimes(1);
	});
});
