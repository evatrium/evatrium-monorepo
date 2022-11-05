import {
  //types,
  DependencyList
} from 'react';
import { isWeb } from '@evatrium/utils';
import { resolveState } from '@evatrium/utils';

export { resolveState };
//

// ------------------------------

export type EffectCallback = (...args: any[]) => any;

export type EffectHook<
  Callback extends EffectCallback = EffectCallback,
  Deps extends DependencyList | undefined = DependencyList | undefined,
  RestArgs extends any[] = any[]
  > = ((...args: [Callback, Deps, ...RestArgs]) => void) | ((...args: [Callback, Deps]) => void);

// ------------------------------

export const shallowMerger = <A extends Record<string, any>, B extends keyof A>(
  prev: Pick<A, B>,
  next: Pick<A, B>
): Pick<A, B> => ({
  ...prev,
  ...next
});
