import { getMatchBy, MatchByOptions } from '~/getMatchBy';

/**
 * finds item in array with equal value
 * @param arr
 * @param searchValue
 * @param options
 * @returns - the item you are looking for
 */
export const findInArray = (arr: any[], searchValue: any, options?: MatchByOptions) => {
	const itemsMatch = getMatchBy(options);
	return arr.find((arrItem) => itemsMatch(arrItem, searchValue));
};

/**
 * stubs out a findInArray function for other helper functions that use
 * this functionality internally. Less steps performed when iterating over many items
 * @param options {matchBy, matchByOnValue}
 */
export const createFindInArray = (options?: MatchByOptions) => {
	const itemsMatch = getMatchBy(options);
	return (arr: any[], item: any) => arr.find((arrItem) => itemsMatch(arrItem, item));
};
