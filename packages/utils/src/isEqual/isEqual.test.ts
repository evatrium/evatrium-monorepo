import { describe, it, expect } from 'vitest';
import { isEqual } from '~/isEqual/index';

// some tests copied and remixed from:
// https://github.com/react-hook-form/react-hook-form/blob/master/src/__tests__/utils/deepEqual.test.ts
describe('isEqual', () => {
	const comparator = isEqual;

	it('should return false when two sets dont match', () => {
		expect(comparator([{ test: '123' }, { test: '455' }, { test: '455' }], [])).toBeFalsy();

		expect(
			comparator(
				[{ test: '123' }, { test: '455' }, { test: '455' }],
				[{ test: '123' }, { test: '455' }, { test: '455', test1: 'what' }]
			)
		).toBeFalsy();

		expect(comparator([{}], [])).toBeFalsy();

		expect(comparator([], [{}])).toBeFalsy();
		expect(comparator(new Date(), new Date('1999'))).toBeFalsy();

		expect(
			comparator(
				{
					unknown: undefined,
					userName: '',
					fruit: ''
				},
				{
					userName: '',
					fruit: '',
					break: {}
				}
			)
		).toBeFalsy();
	});

	it('should return false when either type is primitive', () => {
		expect(comparator(null, [])).toBeFalsy();
		expect(comparator([], null)).toBeFalsy();
		expect(comparator({}, undefined)).toBeFalsy();
		expect(comparator(undefined, {})).toBeFalsy();
	});

	it('should return true when two sets matches', () => {
		expect(comparator([{ name: 'asdf' }], [{ name: 'asdf' }])).toBeTruthy();

		expect(
			comparator(
				[{ test: '123' }, { test: '455' }, { test: '455' }],
				[{ test: '123' }, { test: '455' }, { test: '455' }]
			)
		).toBeTruthy();

		expect(comparator({}, {})).toBeTruthy();

		expect(comparator([], [])).toBeTruthy();

		expect(
			comparator([{ test: '123' }, { test: '455' }], [{ test: '123' }, { test: '455' }])
		).toBeTruthy();

		expect(
			comparator(
				[
					{
						test: '123',
						nestedArray: [{ test: '123' }, { test: '455' }, { test: '455' }]
					},
					{
						test: '455',
						nestedArray: [{ test: '123' }, { test: '455' }, { test: '455' }]
					}
				],
				[
					{
						test: '123',
						nestedArray: [{ test: '123' }, { test: '455' }, { test: '455' }]
					},
					{
						test: '455',
						nestedArray: [{ test: '123' }, { test: '455' }, { test: '455' }]
					}
				]
			)
		).toBeTruthy();

		expect(
			comparator(
				{
					prop1: 'value1',
					prop2: 'value2',
					prop3: 'value3',
					prop4: {
						subProp1: 'sub value1',
						subProp2: {
							subSubProp1: 'sub sub value1',
							subSubProp2: [1, 2, { prop2: 1, prop: 2 }, 4, 5]
						}
					},
					prop5: 1000,
					prop6: new Date(2016, 2, 10)
				},
				{
					prop5: 1000,
					prop3: 'value3',
					prop1: 'value1',
					prop2: 'value2',
					prop6: new Date('2016/03/10'),
					prop4: {
						subProp2: {
							subSubProp1: 'sub sub value1',
							subSubProp2: [1, 2, { prop2: 1, prop: 2 }, 4, 5]
						},
						subProp1: 'sub value1'
					}
				}
			)
		).toBeTruthy();
	});

	it('should compare date time object valueOf', () => {
		expect(comparator({ test: new Date('1990') }, { test: new Date('1990') })).toBeTruthy();
	});
});
