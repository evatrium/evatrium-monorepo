import { prefixPx } from './prefixPx';
import { isFunc, isObj } from '@evatrium/utils';
import { sheet } from '~/cssinjs/parse';
import { StyleObjOrFunc, Theme, Obj } from '~/cssinjs/types';

export const jsToRules = (styleObj: Obj) => {
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

export const createThemedGlobalStyles = (theme: Theme) => {
  return (styleObjOrFunc: StyleObjOrFunc) => {
    let css = isFunc(styleObjOrFunc) ? styleObjOrFunc(theme) : styleObjOrFunc;
    jsToRules(css).forEach((rule) => sheet({ global: true }).insert(rule));
  };
};
