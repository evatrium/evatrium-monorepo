import { isObj, isDateObject, isSet, isMap } from '~/isType';

export type SimpleDeepCopy = <T>(data: T, _copier?: SimpleDeepCopy) => T;
/**
 * Simple deep copy of basic nested objects and arrays.
 * Ideal for state trees and json like objects, aka serializable data
 * For more robust features, use fast-copy - @see https://github.com/planttheidea/fast-copy
 */ // T extends JsonLikeType
export const simpleDeepCopy: SimpleDeepCopy = (data, _copier?) => {
	_copier = _copier || simpleDeepCopy;
	const isArr = Array.isArray(data);
	if (isArr || isObj(data)) {
		const copy: any = isArr ? [] : {};
		for (const key in data) {
			if (key === '__proto__') continue;
			copy[key] = _copier(data[key], _copier);
		}
		return copy;
	}
	return data;
};

// export type SimpleDeepCopy<T> = T extends JsonType ? JsonType :

/**
 * Deep copy of basic nested objects and arrays.
 * Ideal for state trees and json like objects, aka serializable data.
 * Handles basic primitives as well as maps, sets and date objects.
 * For more robust features, use fast-copy - @see https://github.com/planttheidea/fast-copy
 */
export const deepCopy = <T>(data: T): any => {
	if (isDateObject(data)) return new Date(data);
	else if (isSet(data)) return new Set(data);
	else if (isMap(data)) return new Map(data);
	return simpleDeepCopy(data, deepCopy);
};
