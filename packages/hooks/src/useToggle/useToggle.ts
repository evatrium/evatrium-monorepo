import { useCallback } from 'react';
import { useSafeState } from '~/useSafeState';

export const useToggle = (defaultBool?: boolean): [boolean, (override?: boolean) => void] => {
  const [bool, setBool] = useSafeState(!!defaultBool);
  const toggle = useCallback((override?: boolean): void => {
    setBool((b: boolean) => (typeof override === 'boolean' ? override : !b));
  }, []);
  return [bool, toggle];
};
