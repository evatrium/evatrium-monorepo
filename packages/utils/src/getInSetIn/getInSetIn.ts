import { isObj } from '~/isType';
import { ObjOrArrType } from '~/types';

// https://youmightnotneed.com/lodash/
// toPath('a[0].b.c') // => ['a', '0', 'b', 'c']
const toPath = (path: string) => path.match(/([^[.\]])+/g) || [];

/**
 * Dot walk to deeply get a value from a nested object or array 'via.its.path'.
 * @example
 * 	const obj = {a:{b:{c:["foobar"]}}}
 * 	const value = getIn(obj, 'a.b.c[0]', 'fallback');
 * 	console.log(value) //-> foobar
 * @param objOrArr - the target you want to query
 * @param path - dot walk / bracket select to the item. ex: 'a.b.c[0]'
 * @param fallback - the default value if the item doesn't exist
 */
export function getIn(
	objOrArr: ObjOrArrType,
	path: string | Array<number | string>,
	fallback?: any
) {
	let p = 0;
	const pathArray = Array.isArray(path) ? path : toPath(path);
	while (objOrArr && p < pathArray.length) {
		objOrArr = objOrArr[<any>pathArray[p++]];
	}
	return objOrArr === undefined ? fallback : objOrArr;
}

/**
 * Deeply set a value in a nested object or array via its path
 * @example
 *	const obj = {a:{b:{c:["foobar"]}}};
 *  const result = setIn(obj, 'a.b.c[1]', 'asdf');
 *  console.log(result) //-> {a:{b:{c:["foobar", "asdf"]}}}
 *
 * This is a modified version of Jarad Palmer's version of _.setIn
 * It is better tailored for more accurate change detection in state management
 * For more details, @see https://github.com/formium/formik/blob/master/packages/formik/src/utils.ts
 * @param objOrArr - the target you want to set a value in
 * @param path - dot walk / bracket select to the item
 * @param value - the value you want to set in that path
 */
export function setIn(objOrArr: ObjOrArrType, path: string, value: any): any {
	const res: any = Array.isArray(objOrArr) ? [...objOrArr] : { ...objOrArr };
	let resVal: any = res;
	let i = 0;
	const pathArray = toPath(path);
	for (; i < pathArray.length - 1; i++) {
		const currentPath = pathArray[i];
		const currentObj = getIn(objOrArr, pathArray.slice(0, i + 1));
		let isArr;
		if (currentObj && (isObj(currentObj) || (isArr = Array.isArray(currentObj)))) {
			resVal = resVal[currentPath] = isArr ? [...currentObj] : { ...currentObj };
		} else {
			const nextPath = pathArray[i + 1];
			resVal = resVal[currentPath] = isInteger(nextPath) && Number(nextPath) >= 0 ? [] : {};
		}
	}
	// Return original object if new value is the same as current
	if ((i === 0 ? objOrArr : resVal)[pathArray[i]] === value) return objOrArr;
	if (value === undefined) delete resVal[pathArray[i]];
	else resVal[pathArray[i]] = value;
	// If the path array has a single element, the loop did not run.
	// Deleting on `resVal` had no effect in this scenario, so we delete on the result instead.
	if (i === 0 && value === undefined) delete res[pathArray[i]];
	return res;
}

const isInteger = (value: any): boolean => String(Math.floor(Number(value))) === value;
