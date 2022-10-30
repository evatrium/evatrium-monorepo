import { isObj, isDateObject, isPrimitive } from '~/isType';

/**
 * deeply compares nested objects and nested arrays,
 * date objects and primitives, best suited for serializable data
 * for more robust comparisons, use lodash or search deep equal
 */
export const isEqual = (x: any, y: any): boolean => {
	if (isPrimitive(x) || isPrimitive(y)) return x === y;
	if (isDateObject(x) && isDateObject(y)) return x.getTime() === y.getTime();
	const keys1 = Object.keys(x);
	const keys2 = Object.keys(y);
	if (keys1.length !== keys2.length) return false;
	for (const key of keys1) {
		const val1 = x[key];
		const val2 = y[key];
		if (!keys2.includes(key)) return false;
		if (
			(isDateObject(val1) && isDateObject(val2)) ||
			(isObj(val1) && isObj(val2)) ||
			(Array.isArray(val1) && Array.isArray(val2))
				? !isEqual(val1, val2)
				: val1 !== val2
		)
			return false;
	}
	return true;
};
