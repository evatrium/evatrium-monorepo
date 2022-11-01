import { prefixPx } from './prefixPx';
import { isObj } from '@evatrium/utils';

export const jsToRules = (obj) => {
  let rules = [];
  for (let key in obj) {
    const declarations = Object.keys(obj[key]).reduce((acc, curr) => {
      let part;
      if (isObj(obj[key][curr])) {
        let nested = Object.keys(obj[key][curr]).reduce(
          (a, c) => `${a}${prefixPx(c, obj[key][curr][c])}`,
          ''
        );
        part = `${curr}{${nested}}`;
      } else {
        part = prefixPx(curr, obj[key][curr]);
      }
      return `${acc}${part}`;
    }, '');

    rules.push(`${key}{${declarations}}`);
  }
  return rules;
};
