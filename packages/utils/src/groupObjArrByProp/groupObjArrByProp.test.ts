import { describe, it, expect } from 'vitest';
import { groupObjArrByProp } from '~/groupObjArrByProp';

describe('groupObjArrByProp', () => {
	it('groups items based on string keyname', () => {
		const movies = [
			{ genre: 'comedy', name: 'idiocracy' },
			{ genre: 'scifi', name: 'ex machina' },
			{ genre: 'scifi', name: 'the matrix' },
			{ name: 'the revenant' }
		];

		const [groups, others] = groupObjArrByProp(movies, 'genre');

		expect(groups).toMatchObject({
			comedy: [{ genre: 'comedy', name: 'idiocracy' }],
			scifi: [
				{ genre: 'scifi', name: 'ex machina' },
				{ genre: 'scifi', name: 'the matrix' }
			]
		});

		expect(others).toMatchObject([{ name: 'the revenant' }]);
	});

	it('groups items based on string returned from function getter', () => {
		const movies = [
			{ genre: 'comedy', name: 'idiocracy' },
			{ genre: 'scifi', name: 'ex machina' },
			{ genre: 'scifi', name: 'the matrix' },
			{ name: 'the revenant' }
		];

		const [groups, others] = groupObjArrByProp(movies, (item) => item.genre);

		expect(groups).toMatchObject({
			comedy: [{ genre: 'comedy', name: 'idiocracy' }],
			scifi: [
				{ genre: 'scifi', name: 'ex machina' },
				{ genre: 'scifi', name: 'the matrix' }
			]
		});

		expect(others).toMatchObject([{ name: 'the revenant' }]);
	});

	it('groups items abiding to the condition function passed', () => {
		const movies = [
			{ genre: 'comedy', name: 'idiocracy' },
			{ genre: 'scifi', name: 'ex machina' },
			{ genre: 'scifi', name: 'the matrix' },
			{ genre: 'action', name: 'the revenant' },
			{ name: 'the room' }
		];

		const [groups, others] = groupObjArrByProp(movies, 'genre', (groupName) => {
			return ['scifi', 'comedy'].includes(groupName);
		});

		expect(groups).toMatchObject({
			comedy: [{ genre: 'comedy', name: 'idiocracy' }],
			scifi: [
				{ genre: 'scifi', name: 'ex machina' },
				{ genre: 'scifi', name: 'the matrix' }
			]
		});

		expect(others).toMatchObject([{ genre: 'action', name: 'the revenant' }, { name: 'the room' }]);
	});
});
