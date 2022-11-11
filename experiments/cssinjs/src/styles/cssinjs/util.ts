import { isFunc, ObjStrKey } from '@evatrium/utils';
import { StyleObjOrFunc, Theme, StyleObj } from '~/styles';

export const convertVars = (name: string, styleObj: StyleObj) => {
  if (!styleObj) return {};
  return Object.keys(styleObj).reduce((acc, curr) => {
    acc[`--${name}-${curr}`] = (styleObj as StyleObj)[curr];
    return acc;
  }, {} as ObjStrKey);
};
