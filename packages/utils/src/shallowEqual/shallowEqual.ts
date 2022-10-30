import { isObject } from '~/isType';

/**
 * like propsChanged but compares primitives as well
 * uses more strict Object.is
 * inspired by shallowequal: https://github.com/dashed/shallowequal
 */
export function shallowEqual(objA: any, objB: any) {
	if (Object.is(objA, objB)) return true;
	if (!isObject(objA) || !isObject(objB)) return false;
	const keysA = Object.keys(objA);
	const keysB = Object.keys(objB);
	if (keysA.length !== keysB.length) return false;
	const bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
	for (let idx = 0; idx < keysA.length; idx++) {
		const key = keysA[idx];
		if (!bHasOwnProperty(key)) return false;
		const valueA = objA[key];
		const valueB = objB[key];
		if (!Object.is(valueA, valueB)) return false;
	}
	return true;
}
