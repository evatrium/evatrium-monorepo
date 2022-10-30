import { useCallback } from 'react';
import { useSafeState } from '~/useSafeState';
import { resolveState, shallowMerger } from '~/util';

export type SetState<S extends Record<string, any>> = <K extends keyof S>(
  state: Pick<S, K> | null | ((prevState: Readonly<S>) => Pick<S, K> | S | null)
) => void;

export const useMergeState = <S extends Record<string, any>, K extends keyof S>(
  initial: S | (() => S),
  merger = shallowMerger
): [S, SetState<S>] => {
  const [state, setState] = useSafeState<S>(initial || {});
  const mergeState = useCallback(
    (update: any) => {
      // @TODO fix types
      // @ts-ignore
      setState((prev) => merger(prev, resolveState(update, prev)));
    },
    [] // eslint-disable-line
  );
  return [state, mergeState];
};
