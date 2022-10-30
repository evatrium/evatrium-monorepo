import { useEffect, useRef, useCallback } from 'react';
import { useSyncedRef } from '~/useSyncedRef';
import { isFunc, isNullOrUndefined } from '@evatrium/utils';
import { useIsMounted } from '~/useIsMounted';

type UseIntervalControls = {
  start: () => void;
  stop: () => void;
};
type IntervalID = ReturnType<typeof setInterval> | null;

/**
 * call a function at an interval rate
 * @param callback - the function to call
 * @param time - time in milliseconds
 * @param startOnMount -  start the interval on mount
 * @returns  {
 *   start, - manually start it
 *   stop - manually stop it
 * }
 */
export const useInterval = (
  callback: () => void,
  { time, startOnMount }: { time?: number; startOnMount?: boolean } = {}
): UseIntervalControls => {
  const isMounted = useIsMounted();
  const cbRef = useSyncedRef(callback);
  const timeRef = useSyncedRef(time);
  const intervalRef = useRef<IntervalID>();

  const stop = useCallback(() => {
    intervalRef.current && clearInterval(intervalRef.current);
  }, []);

  const start = useCallback(
    (/*_time*/) => {
      // maybe allow optionally passing time through here
      stop();
      if (isNullOrUndefined(timeRef.current)) return; /* _time || */
      intervalRef.current = setInterval(() => {
        isMounted() && isFunc(cbRef.current) && cbRef.current(); //{ start, stop } // maybe pass these back?
      }, /* _time || */ timeRef.current);
    },
    []
  );

  useEffect(() => {
    if (startOnMount) start();
    return stop;
  }, [startOnMount, time]);

  return {
    start,
    stop
  };
};
