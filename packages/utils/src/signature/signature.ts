import { isObjOrArr } from '~/isType';

/**
 * nonstandard stringify
 * quickly converts serializable data into string thumbprint
 * for things like cache key lookup.
 * here is a more robust solution: https://github.com/streamich/fastest-stable-stringify
 */
// export const signature = (data: any): string => {
//   if (!isObjOrArr(data)) return `${data}`;
//   let out = ''; // @ts-ignore
//   for (const key in data) out += `${key}${signature(data[key])}`;
//   return out;
// };

const keyList = Object.keys;
const stringy = JSON.stringify;

function stringify(val: any, allowUndefined?: boolean): string | undefined | null {
  let i, max, str, keys, key, propVal, typeOf;

  typeOf = typeof val;

  if (typeOf === 'string') return stringy(val);
  if (val === true) return 'true';
  if (val === false) return 'false';
  if (val === null) return 'null';

  if (val instanceof Array) {
    str = '[';
    max = val.length - 1;
    for (i = 0; i < max; i++) str += stringify(val[i], false) + ',';
    if (max > -1) {
      str += stringify(val[i], false);
    }

    return str + ']';
  }

  if (val instanceof Object) {
    if (typeof val.toJSON === 'function') return stringify(val.toJSON(), allowUndefined);

    // only object is left
    keys = keyList(val).sort();
    max = keys.length;
    str = '';
    i = 0;
    while (i < max) {
      key = keys[i];
      propVal = stringify(val[key], true);
      if (propVal !== undefined) {
        if (i && str !== '') {
          //if the string is empty, don't add comma to avoid the json to become invalid.
          str += ',';
        }
        str += stringy(key) + ':' + propVal;
      }
      i++;
    }
    return '{' + str + '}';
  }

  switch (typeOf) {
    case 'function':
    case 'undefined':
      return allowUndefined ? undefined : null;
    default:
      return isFinite(val) ? val : null;
  }
}

export const signature = (obj: any): string => {
  return '' + stringify(obj, false);
};
