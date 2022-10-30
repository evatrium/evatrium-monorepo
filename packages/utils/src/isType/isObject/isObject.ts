import { isNullOrUndefined } from '~/isType/isNullOrUndefined';
import { isObjectType } from '~/isType/isObjectType';

/**
 * is typeof value type object and not null
 */
export const isObject = (value: any): boolean => !isNullOrUndefined(value) && isObjectType(value);
