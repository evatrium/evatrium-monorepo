import { useEffect } from 'react';
import { setHarmonicInterval, clearHarmonicInterval } from '@evatrium/utils';

import type { Fn } from '~/types';
import { useSyncedRef } from '~/useSyncedRef';

export const useHarmonicInterval = (fn: Fn, delay: number | null = 0) => {
  const func = useSyncedRef(fn);

  useEffect(() => {
    if (delay !== null) {
      const interval = setHarmonicInterval(() => func.current(), delay);
      return () => clearHarmonicInterval(interval);
    }
    return () => {};
  }, [delay]); // eslint-disable-line
};
