import {
  useEffect,
  useLayoutEffect,
  //types,
  DependencyList
} from 'react';
import { isWeb } from '@evatrium/utils';
//

//---------- resolve state -------------
export type InitialState<State> = State | (() => State);
export type NextState<State, PrevState = State> = State | ((prevState: PrevState) => State);

export function resolveState<State>(nextState: InitialState<State>): State;

export function resolveState<State, PrevState = State>(
  nextState: NextState<State, PrevState>,
  prevState: PrevState
): State;
export function resolveState<State, PrevState = State>(
  nextState: InitialState<State> | NextState<State, PrevState>,
  prevState?: PrevState
): State {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  if (typeof nextState === 'function') return (nextState as CallableFunction)(prevState);

  return nextState;
}

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
