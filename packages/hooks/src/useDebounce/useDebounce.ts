import { debounce } from '@evatrium/utils';
import { useMemo, useRef } from 'react';
import { useWillUnmount } from '~/useWillUnmount';

export interface DebouncedFunction<Fn extends (...args: any[]) => any> {
  (this: ThisParameterType<Fn>, ...args: Parameters<Fn>): void;
}

/**
 * wraps the passed callback in a debounce.
 * will cancel an active debounce on unmount
 * @param callback - the function to delay
 * @param wait - time to wait after execution stops. if changes - will cancel the current debounce
 * @param deps - optional deps to watch for that should update the callback if they change
 * @returns - the wrapped callback with additional cancel method
 */
export const useDebounce = <Fn extends (...args: any[]) => any>(
  callback: Fn,
  wait = 100,
  deps = []
): DebouncedFunction<Fn> => {
  const cr = useRef<() => any>(() => {});

  const debouncedCallback = useMemo(() => {
    cr.current();
    const wrapped = debounce(callback, wait);
    cr.current = wrapped.cancel;
    return wrapped;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wait, ...deps]);

  useWillUnmount(cr.current);

  return debouncedCallback;
};
