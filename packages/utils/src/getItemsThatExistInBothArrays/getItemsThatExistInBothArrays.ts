import { createFindInArray } from '~/findInArray';
import { MatchByOptions } from '~/getMatchBy';

type Options = Omit<MatchByOptions, 'matchByOnValue'>;
/**
 * return items that exist in both arrays
 * @param arr1
 * @param arr2
 * @param options
 */
export const getItemsThatExistInBothArrays = (arr1: any[], arr2: any[], options?: Options) => {
	const isInArray = createFindInArray({ ...options, matchByOnValue: true });
	return [...arr1].filter((value) => isInArray(arr2, value));
};
