import { PrimitiveType } from '~/types';
import { isNullOrUndefined, isObjectType } from '~/isType';

/**
 * is value of primitive type
 * | null | undefined | string | number | boolean | symbol | bigint
 */
export const isPrimitive = (value: any): value is PrimitiveType =>
  isNullOrUndefined(value) || !isObjectType(value);
