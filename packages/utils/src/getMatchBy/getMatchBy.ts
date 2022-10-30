import { ObjOrArrType } from '~/types';
import { isFunc, isString } from '~/isType';
import { getIn } from '~/getInSetIn';

export type ItemsMatchFunc = (a: any, b: any) => boolean;

export type MatchBy = string | ItemsMatchFunc;

const defaultItemsMatch: ItemsMatchFunc = (arrItem, searchValue) => arrItem === searchValue;

export type MatchByOptions = {
	matchBy?: MatchBy;
	matchByOnValue?: boolean;
};
/**
 * returns an equality checker function for:
 * 	- findInArray
 * 	- createFindInArray
 * 	- excludeItemsFromArray
 * 	- updateMany
 * @param options
 * 	- matchBy - one of 3 options
 * 			- undefined : will use default equality check "a === b"
 * 			- a value getter 'dot.walk.t[0].value' or
 * 			- ItemsAreEqualFunc : custom equality checker function (a,b)=>(a===b)
 *  - matchByOnValue - (default: undefined) - if true, uses same value getter on searchValue,
 *  	otherwise compares searchValue directly with arrItem[matchBy].
 *  	N/A when custom equality checker function is passed to matchBy
 */
export const getMatchBy = (options?: MatchByOptions): ItemsMatchFunc => {
	const { matchBy, matchByOnValue } = options || {};
	if (isString(matchBy)) {
		return (arrItem: ObjOrArrType, searchValue: any) => {
			const it = matchByOnValue ? getIn(searchValue, matchBy) : searchValue;
			return getIn(arrItem, matchBy) === it;
		};
	}
	return isFunc(matchBy) ? matchBy : defaultItemsMatch;
};
