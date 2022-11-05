import { Theme } from '~/styles/types';
import { deepMergeSimple, resolveState } from '@evatrium/utils';

export const reduceMerge = (theme: Theme, ...args: any[]) =>
  args.reduce((acc, curr) => deepMergeSimple(acc, resolveState(curr, theme)), {});
