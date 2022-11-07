import { useEffect, useRef, EffectCallback, DependencyList } from 'react';
import { isEqual } from '@evatrium/utils';

type DepsEqualFnType<TDeps extends DependencyList> = (prevDeps: TDeps, nextDeps: TDeps) => boolean;

export const useDeepEqualEffect = <TDeps extends DependencyList>(
  f: EffectCallback,
  deps: TDeps,
  depsEqual: DepsEqualFnType<TDeps> = isEqual
) => {
  const ref = useRef<TDeps | undefined>(undefined);
  if (!ref.current || !depsEqual(ref.current, deps)) {
    ref.current = deps;
  }
  useEffect(f, ref.current); // eslint-disable-line
};
