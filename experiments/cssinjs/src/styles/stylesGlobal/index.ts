import { vars } from './vars.js';
import { base } from './base.js';
import { keyframes } from './keyframes.js';
import { aspectRatio } from './aspectRatio.js';
import { reduceMerge } from '~/styles/util/reduceMerge';
import { Theme } from '~/styles';

export const stylesGlobal = (theme: Theme) => {
  return reduceMerge(theme, vars, base, keyframes, aspectRatio);
};
