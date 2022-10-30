import { excludeItemsFromArray } from '~/excludeItemsFromArray';
import { MatchByOptions } from '~/getMatchBy';

/**
 * combines two arrays and removes duplicates
 * @param arr1
 * @param arr2
 * @param options
 */
export const combineArraysAndDeduplicate = (arr1: any[], arr2: any[], options?: MatchByOptions) => {
	return [...arr1, ...excludeItemsFromArray(arr2, arr1, options)];
};
