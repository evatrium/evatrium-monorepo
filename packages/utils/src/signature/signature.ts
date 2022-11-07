import { isObj, isArr } from '~/isType';

/**
 * signature
 * stable stringify
 * converts serializable data into string thumbprint
 */

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

/**
 * stringify - fast
 * quickly converts serializable data into string thumbprint
 * for things like cache key lookup.
 */
const fast = (data: any): string => {
  const isArrr = isArr(data),
    isObject = isObj(data);
  if (!(isArrr || isObject)) return `${data}`;
  let out = '';
  for (const key in data) out += `${key}${fast(data[key])}`;
  return out;
};

const signature = (obj: any): string => {
  return '' + stringify(obj, false);
};

signature.fast = fast;

export { signature };
