import { ObjArr, Obj } from '~/types';
import { isFunc, isNum } from '~/isType';

type ValueGetter = (item: Obj) => number;
/**
 * Aggregate the value of a number of a prop in an ObjArr
 * @param objArr
 * @param prop - the property name of the value you want to add, or a function to retrieve the value
 * @param initial = 0
 *
 * @example
 * const objArr = [
 * 	{num: 1},
 * 	{num: 1},
 * 	{num: 1},
 * ];
 *
 * const result = getTotalOfPropInObjArr(objArr, 'num');
 * console.log(result); // 3
 *
 */
export const getTotalOfPropInObjArr = (objArr: ObjArr, prop: string | ValueGetter, initial = 0) => {
	const propGetterIsFunc = isFunc(prop);
	return objArr.reduce((acc: number, curr: Obj) => {
		const val = propGetterIsFunc ? prop(curr) : curr[prop];
		if (isNum(val)) acc += val;
		return acc;
	}, initial);
};
