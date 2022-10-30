import { describe, it, expect } from 'vitest';
import { toggleSelection } from '~/toggleSelection';

describe('toggleSelection', () => {
	it('(simple arrays) adds item if it does not exist, removes it if it does exist', () => {
		let selections = ['apples', 'bananas', 'pears'];

		selections = toggleSelection(selections, 'carrots') as string[];

		expect(selections).toMatchObject(['apples', 'bananas', 'pears', 'carrots']);

		selections = toggleSelection(selections, 'carrots') as string[];

		expect(selections).toMatchObject(['apples', 'bananas', 'pears']);
	});

	it('(object arrays) adds item if it does not exist, removes it if it does exist', () => {
		let selections = [{ name: 'apples' }, { name: 'bananas' }, { name: 'pears' }];

		selections = toggleSelection(selections, { name: 'carrots' }, { matchBy: 'name' }) as any[];

		expect(selections).toMatchObject([
			{ name: 'apples' },
			{ name: 'bananas' },
			{ name: 'pears' },
			{ name: 'carrots' }
		]);

		const [results, action] = toggleSelection(
			selections,
			{ name: 'carrots' },
			{ matchBy: 'name', returnAction: true }
		);

		expect(results).toMatchObject([{ name: 'apples' }, { name: 'bananas' }, { name: 'pears' }]);

		expect(action).toMatchObject({
			removed: [{ name: 'carrots' }]
		});
	});
});
