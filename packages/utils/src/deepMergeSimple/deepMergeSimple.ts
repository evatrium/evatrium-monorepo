// import {  Obj } from '~/types';
import { isObj } from '~/isType';
//
// function isObj(item: unknown): item is Record<keyof any, unknown> {
//   return item !== null && typeof item === 'object' && item.constructor === Object;
// }

export type DeepMergeSimpleOptions = { clone?: boolean };

export const deepMergeSimple = <T>(
  target: T,
  source: unknown,
  options: DeepMergeSimpleOptions = { clone: true }
): T => {
  let out = options.clone ? { ...target } : target;
  if (isObj(target) && isObj(source)) {
    for (let key in source) {
      if (key === '__proto__') {
        continue;
      }

      if (isObj(source[key]) && isObj(target[key])) {
        (out as Record<keyof any, unknown>)[key] = deepMergeSimple(
          target[key],
          source[key],
          options
        );
      } else {
        (out as Record<keyof any, unknown>)[key] = source[key];
      }
    }
  }

  return out;
};
