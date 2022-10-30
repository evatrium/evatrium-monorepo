import { describe, expect, it, vi } from 'vitest';
import { createSubscription } from '~/createSubscription';

describe('createSubscription', () => {
	it('subscribes listeners, publishes data, and unsubscribes', async () => {
		const { sub, pub } = createSubscription();

		const spyOnMe = {
			listener: () => void 0
		};
		const funcSpy = vi.spyOn(spyOnMe, 'listener');

		const unsub = sub(spyOnMe.listener);

		pub('foo', 'bar');

		expect(funcSpy).toBeCalledWith('foo', 'bar');

		pub('yo yo');
		expect(funcSpy).toBeCalledWith('yo yo');

		unsub();

		pub('yo yo');
		pub('yo yo');
		expect(funcSpy).toBeCalledTimes(2);
	});
});
