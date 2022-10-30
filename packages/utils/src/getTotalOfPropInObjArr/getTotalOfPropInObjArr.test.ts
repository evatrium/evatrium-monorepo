import { describe, it, expect } from 'vitest';
import { getTotalOfPropInObjArr } from '~/getTotalOfPropInObjArr';

describe('getTotalOfPropInObjArr', () => {
	it('returns expected output. does not add values that are not numbers', () => {
		const objArr = [{ num: 1 }, { num: 1 }, { num: 1 }, { num: NaN }, { num: undefined }];
		const result = getTotalOfPropInObjArr(objArr, 'num');

		expect(result).toBe(3);
	});

	it('gets values from a provided getter', () => {
		const objArr = [{ num: 1 }, { num: 1 }, { num: 1 }];
		const result = getTotalOfPropInObjArr(objArr, (item) => item.num);

		expect(result).toBe(3);
	});
});
