import { vars } from './vars.js';
import { base } from './base.js';
import { keyframes } from './keyframes.js';
import { aspectRatio } from './aspectRatio.js';
import { reduceMerge } from '~/styles/util/reduceMerge.ts';

export const stylesGlobal = (theme) => {
  return reduceMerge(theme, vars, base, keyframes, aspectRatio);
};
