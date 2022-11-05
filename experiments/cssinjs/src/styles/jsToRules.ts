import { prefixPx } from './prefixPx';
import { Obj, StyleObject } from '~/styles/types';
import { isObj } from '@evatrium/utils';

export const jsToRules = (styleObj: StyleObject) => {
  let rules = [];
  for (let key in styleObj) {
    const declarations = Object.keys(styleObj[key]).reduce((acc, curr) => {
      let part;
      if (isObj(styleObj[key][curr])) {
        let nested = Object.keys(styleObj[key][curr]).reduce(
          (a, c) => `${a}${prefixPx(c, styleObj[key][curr][c])}`,
          ''
        );
        part = `${curr}{${nested}}`;
      } else {
        part = prefixPx(curr, styleObj[key][curr]);
      }
      return `${acc}${part}`;
    }, '');

    rules.push(`${key}{${declarations}}`);
  }
  return rules;
};
