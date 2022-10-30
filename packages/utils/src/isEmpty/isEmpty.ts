import { hasKeys } from '~/hasKeys';
import { isMap, isSet, isFunc, isObject } from '~/isType';

/**
 * Checks if a data structure is empty: [], {}, Map, Set
 * and if a function is passed, checks if it has keys
 * returns true if any other given value is falsy
 */
export const isEmpty = (value: any): boolean => {
	if (Array.isArray(value)) return value.length === 0;
	else if (isMap(value) || isSet(value)) return value.size === 0;
	else if (isObject(value) || isFunc(value)) return !hasKeys(value);
	return !value;
};
