import { StyleObject, StyleObjOrFunc, Theme } from '~/styles/types';
import { isFunc, isObj } from '@evatrium/utils';
import { prefixPx } from '~/styles/cssinjs/prefixPx';
import { markers, sheets } from '~/styles/cssinjs/parse';

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

export const insertGlobalStyles = (theme: Theme, styleObjOrFunc: StyleObjOrFunc) => {
  let css = isFunc(styleObjOrFunc) ? styleObjOrFunc(theme) : styleObjOrFunc;
  jsToRules(css).forEach((rule) => sheets({ namespace: markers.GLOBAL }).insert(rule));
};
