import { useEffect } from 'react';
import { useSyncedRef } from '~/useSyncedRef';

/**
 * Run effect only when component is unmounted.
 *
 * @param effect Effector to run on unmount
 */
export const useWillUnmount = (effect: CallableFunction): void => {
  const unmountRef = useSyncedRef(effect);

  useEffect(
    () => () => {
      unmountRef.current && unmountRef.current();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
};
