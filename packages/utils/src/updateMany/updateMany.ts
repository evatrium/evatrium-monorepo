import { getMatchBy, MatchBy, MatchByOptions } from '~/getMatchBy';
import { ObjArr } from '~/types';
import { DeepMerge, deepMerge } from '~/deepMerge';

export type UpdateManyOptions = Omit<MatchByOptions, 'matchByOnValue'> & {
	matchBy: MatchBy;
	updateFn?: DeepMerge;
};

/**
 * applies updates to many items in a nested object array
 * @param array - ObjArr to be updated
 * @param selections -ObjArr containing updates
 * @param options {
 *   matchBy: 'dot.walk' | custom equivalence function - (a,b) => (a === b)
 *   updateFn: (default:DeepMerge) - uses deepMerge by default or pass your custom merge function with same args
 * }
 * @returns - a new array containing the updates
 */
export const updateMany = (array: ObjArr, selections: ObjArr, options: UpdateManyOptions) => {
	const { matchBy, updateFn = deepMerge } = options || {};
	const itemsMatch = getMatchBy({ matchBy, matchByOnValue: true });

	array = [...array];

	for (let arrayIndex = 0; arrayIndex < array.length; arrayIndex++) {
		for (let selectionsIndex = 0; selectionsIndex < selections.length; selectionsIndex++) {
			const arrayItem = array[arrayIndex],
				selectionsItem = selections[selectionsIndex];

			if (arrayItem && selectionsItem && itemsMatch(arrayItem, selectionsItem)) {
				const result = updateFn(arrayItem, selectionsItem);

				if (result) array[arrayIndex] = result;
			}
		} // nested for
	} // outer for

	return array;
};
