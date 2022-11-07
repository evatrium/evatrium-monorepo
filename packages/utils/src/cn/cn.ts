import { isNum, isObjectType, isString, isArr } from '~/isType';

/**
 * conditional classname string builder
 * similar to https://github.com/lukeed/clsx
 * @param args
 * @example
 * cn('foo', [1 && 'bar', { baz:false, bat:null }, ['hello', ['world']]], 'cya');
 */
export const cn = (...args: any[]) => {
  let i = 0,
    tmp,
    x,
    str = '';
  while (i < args.length) {
    (tmp = args[i++]) && (x = toVal(tmp)) && (str = whtspc(str, x));
  }
  return str;
};

const whtspc = (str: any, s: string) => (str && (str += ' '), (str += s), str);

const toVal = (mix: any) => {
  let k,
    y,
    str = '';
  if (isString(mix) || isNum(mix)) str += mix;
  else if (isObjectType(mix)) {
    if (isArr(mix))
      for (k = 0; k < mix.length; k++) {
        mix[k] && (y = toVal(mix[k])) && (str = whtspc(str, y));
      }
    else for (k in mix) mix[k] && (str = whtspc(str, k));
  }
  return str;
};
