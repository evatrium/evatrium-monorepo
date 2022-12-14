import { isNullOrUndefined } from '~/isType/isNullOrUndefined';
import { isObjectType } from '~/isType/isObjectType';

/**
 * is value "plain" object "{}"
 * - is value an object
 * - not null
 * - and .constructor === Object
 */
export const isObj = (value: any): value is Record<keyof any, unknown> =>
  !isNullOrUndefined(value) && isObjectType(value) && value?.constructor === Object;
