import { useMemo, useRef } from 'react';
import { useIsomorphicEffect } from '~/useIsomorphicEffect';

/**
 * Like `useRef`, but it returns immutable ref that contains actual value.
 *
 * @param value
 */
export const useSyncedRef = <T>(value: T): { readonly current: T } => {
  const ref = useRef(value);

  useIsomorphicEffect(() => {
    ref.current = value;
  }, [value]);

  return useMemo(
    () =>
      Object.freeze({
        get current() {
          return ref.current;
        }
      }),
    []
  );
};
