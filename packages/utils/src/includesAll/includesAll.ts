import { MatchByOptions } from '~/getMatchBy';
import { createFindInArray } from '~/findInArray';

/**
 * Checks if arr1 includes all items from arr2
 * @param arr1 the array to inspect
 * @param arr2 items that arr1 must contain
 * @param options
 */
export const includesAll = (arr1: any[], arr2: any[], options?: MatchByOptions): boolean => {
	const isInArray = createFindInArray(options);
	const len1 = arr1.length;
	const len2 = arr2.length;
	// if arr1 is empty then it fails the inspection
	if (!len1 && len2) return false;
	for (let i = len2; i--; ) if (!isInArray(arr1, arr2[i])) return false;
	return true;
};
