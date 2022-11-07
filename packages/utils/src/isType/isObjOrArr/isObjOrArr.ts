import { isObj, isArr } from '~/isType';

/**
 * is value plain object {} (not null) or array []
 */
export const isObjOrArr = (value: any): boolean => isObj(value) || isArr(value);

// : value is object | any[] =>
