import { isObj } from '~/isType/isObj';

/**
 * is value plain object {} (not null) or array []
 */
export const isObjOrArr = (value: any): boolean => isObj(value) || Array.isArray(value);

// : value is object | any[] =>
