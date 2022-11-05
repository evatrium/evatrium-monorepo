import { isFunc } from '@evatrium/utils';
import { sheets } from '~/styles/parse';
import { StyleObjOrFunc, Theme } from '~/styles/types';
import { jsToRules } from '~/styles/jsToRules';

export const createThemedGlobalStyles = (theme: Theme) => {
  return (styleObjOrFunc: StyleObjOrFunc) => {
    let css = isFunc(styleObjOrFunc) ? styleObjOrFunc(theme) : styleObjOrFunc;
    jsToRules(css).forEach((rule) => sheets({ namespace: 'global' }).insert(rule));
  };
};
