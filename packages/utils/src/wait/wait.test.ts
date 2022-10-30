import { describe, it, expect } from 'vitest';
import { wait } from '~/wait';

describe('wait', () => {
	it('returns expected output', async () => {
		let num = 0;
		setTimeout(() => num++, 10);
		await wait(20);
		expect(num).toBe(1);
	});
});
