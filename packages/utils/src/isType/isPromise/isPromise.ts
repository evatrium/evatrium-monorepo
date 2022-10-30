import { isObject, isFunc } from '~/isType';

/**
 * is value a promise?
 */
export const isPromise = (value: any): boolean => isObject(value) && isFunc(value.then);
