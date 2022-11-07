import { useMemo, useRef, DependencyList } from 'react';
import { isEqual } from '@evatrium/utils';

type DepsEqualFnType<TDeps extends DependencyList> = (prevDeps: TDeps, nextDeps: TDeps) => boolean;

export const useDeepEqualMemo = <TDeps extends DependencyList>(
  f: () => any,
  deps: TDeps,
  depsEqual: DepsEqualFnType<TDeps> = isEqual
) => {
  const ref = useRef<TDeps | undefined>(undefined);
  if (!ref.current || !depsEqual(ref.current, deps)) {
    ref.current = deps;
  }
  return useMemo(f, ref.current); // eslint-disable-line
};
