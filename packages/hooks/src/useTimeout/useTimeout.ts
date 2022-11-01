import { useEffect, useRef, useCallback } from 'react';
import { useSyncedRef } from '~/useSyncedRef';
import { isFunc, isNullOrUndefined } from '@evatrium/utils';
import { useIsMounted } from '~/useIsMounted';

type UseTimeoutControls = {
  start: () => void;
  cancel: () => void;
};
type TimeoutID = ReturnType<typeof setTimeout> | null;

/**
 * call a function after a set time
 * @param callback - the function to call
 * @param time - time in milliseconds to wait
 * @param startOnMount - start the timeout on mount
 * @returns  {
 *   start, - manually start it
 *   cancel - manually stop it
 * }
 */
export const useTimeout = (
  callback: () => void,
  { time, startOnMount }: { time?: number; startOnMount?: boolean } = {}
): UseTimeoutControls => {
  const isMounted = useIsMounted();
  const cbRef = useSyncedRef(callback);
  const timeRef = useSyncedRef(time);
  const timeoutRef = useRef<TimeoutID>();

  const cancel = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  // maybe allow optionally passing time through here
  const start = useCallback(
    (/*_time*/) => {
      cancel();
      if (isNullOrUndefined(timeRef.current) /*check _time */) return;
      timeoutRef.current = setTimeout(() => {
        isMounted() && isFunc(cbRef.current) && cbRef.current(/*{ start, cancel }*/); // // maybe pass these back?
      }, /* _time || */ timeRef.current);
    },
    [] // eslint-disable-line
  );

  useEffect(() => {
    if (startOnMount) start();
    return cancel;
  }, [startOnMount, time]); // eslint-disable-line

  return {
    start,
    cancel
  };
};
