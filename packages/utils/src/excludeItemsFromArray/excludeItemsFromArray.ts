import { getMatchBy, MatchByOptions } from '~/getMatchBy';

type ExcludeItemsFromArrayOptions = MatchByOptions & {
	returnRemoved?: boolean;
};

/**
 * removes many items from an array
 * @param arr - the array to exclude items from
 * @param toExclude - items to exclude from arr
 * @param options {
 *   matchBy: (default:undefined) - value getter 'dot.walk.t[0].value' or custom equality function: (a,b) => (a===b)
 *   matchByOnValue: (default:true) - apply value getter on searchValue. N/A if custom equality function passed to matchBy
 *   returnRemoved: (default:undefined) - if true, will return a tuple containing the array and items removed
 * }
 * @returns [updated] | [ [updated], [removed] ]
 */
export const excludeItemsFromArray = (
	arr: any[],
	toExclude: any[],
	options?: ExcludeItemsFromArrayOptions
): any[] | [any[], any[]] => {
	const { matchBy, matchByOnValue = true, returnRemoved } = options || {};
	const itemsMatch = getMatchBy({ matchBy, matchByOnValue });
	let removed: any[] = [];
	arr = [...arr];
	for (let i = 0; i < toExclude.length; i++) {
		const index = arr.findIndex((arrItem) => itemsMatch(arrItem, toExclude[i]));
		if (index > -1) {
			const items = arr.splice(index, 1);
			removed = [...removed, ...items];
		}
	}
	return returnRemoved ? [arr, removed] : arr;
};
