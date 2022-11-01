import { prefixPx } from '~/prefixPx.js';
import { sheet } from '~/sheet.js';
import { isObj } from '@evatrium/utils';

const alphabet = 'abcdefghijklmnopqrstuvwxyz_-1234567890';
export const makeClassName = (num, result = '') => {
  const alphaLen = alphabet.length;
  let charIndex = num % alphaLen,
    quotient = num / alphaLen;
  if (charIndex - 1 === -1) {
    charIndex = alphaLen;
    quotient--;
  }
  result = alphabet.charAt(charIndex - 1) + result;
  return quotient >= 1 ? makeClassName(parseInt(quotient), result) : result;
};

const classNamePrefix = 'c-';
const noAnd = (s) => s.replace(/&/g, '').trim();
const makeRule = (cn, child, key, val) => `.${cn + noAnd(child)}{${prefixPx(key, val)}}`;
let allRules = [];

let cache = {};
// csx inspired yet customized
export const parse = (obj, child = '', media) => {
  return Object.keys(obj)
    .map((key) => {
      const val = obj[key];
      if (val === null) return '';
      if (isObj(val)) {
        const isAtMediaKey = /^@/.test(key) ? key : null;
        const nextChild = isAtMediaKey ? child : child + key;
        return parse(val, nextChild, isAtMediaKey || media);
      }
      const _key = key + val + child + media;
      if (cache[_key]) return cache[_key];
      let cn = classNamePrefix + makeClassName(allRules.length);
      let rule = makeRule(cn, child, key, val);
      sheet({ id: media || 'main', isMedia: media }).insert(rule);
      cache[_key] = cn;
      return cn;
    })
    .join(' ');
};
