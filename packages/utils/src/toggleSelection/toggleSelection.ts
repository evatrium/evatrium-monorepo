import { MatchByOptions } from '~/getMatchBy';
import { findInArray } from '~/findInArray';
import { excludeItemsFromArray } from '~/excludeItemsFromArray';

type ToggleSelectionOptions = Omit<MatchByOptions, 'matchByOnValue'> & {
	returnAction?: boolean;
};

// attempt to type the conditional return type
// type True = true; // this resolves to string 'true'
// type ToggleSelectionOptionsWithReturnActionType = ToggleSelectionOptions & {
// 	returnAction?: True;
// };
// type ToggleSelectionReturnType<
// 	T extends ToggleSelectionOptions | ToggleSelectionOptionsWithReturnActionType
// > = T extends ToggleSelectionOptionsWithReturnActionType
// 	? [any[], ActonAdded | ActionRemoved]
// 	: any[];

/**
 * removes an item an array if it exists. adds item to array if it does not exist.
 * optionally return the action that was performed along with the item that was added or removed
 * @param selections
 * @param item
 * @param options
 * @returns - options.returnAction ? [updatedArray, {removed?:[], added?:[]} : updatedArray
 */
export const toggleSelection = (
	selections: any[],
	item: any,
	options?: ToggleSelectionOptions
): [any[], { added: any[] } | { removed: any[] }] | any[] => {
	const { matchBy, returnAction } = options || {};

	const matchByOnValue = !!matchBy;

	let out, action;

	if (!findInArray(selections, item, { matchBy, matchByOnValue })) {
		out = [...selections, item];
		action = { added: item };
	} else {
		const [update, removed] = excludeItemsFromArray(selections, [item], {
			matchBy,
			matchByOnValue,
			returnRemoved: true
		});
		out = update;
		action = { removed };
	}

	return returnAction ? [out, action] : out;
};
