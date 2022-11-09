import { shallowEqual } from '@evatrium/utils';
import { DependencyList, useCallback, useMemo, useRef } from 'react';

type DepsShallowEqualFnType<TDeps extends DependencyList> = (
  prevDeps: TDeps,
  nextDeps: TDeps
) => boolean;

export const useShallowEqualMemo = <TDeps extends DependencyList>(
  f: () => any,
  deps: TDeps,
  compareFn: DepsShallowEqualFnType<TDeps> = shallowEqual
) => {
  const ref = useRef<TDeps | undefined>(undefined);
  const isShallowEqual = useCallback(
    (depsA: TDeps, depsB: TDeps) => {
      if (depsA.length !== depsB.length) return false;
      return depsA.every((a, index) => compareFn(a as TDeps, depsB[index] as TDeps));
    },
    [compareFn]
  );

  if (!ref.current || !isShallowEqual(ref.current, deps)) {
    ref.current = deps;
  }
  return useMemo(f, ref.current); //eslint-disable-line
};
