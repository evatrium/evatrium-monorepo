import { useCallback } from 'react';
import { useSafeState } from '~/useSafeState';
import { isBool } from '@evatrium/utils';

export const useToggle = (defaultBool?: boolean): [boolean, (override?: boolean) => void] => {
  const [bool, setBool] = useSafeState(!!defaultBool);
  const toggle = useCallback((override?: boolean): void => {
    const isbool = isBool(override);
    isbool && setBool((b: boolean) => (isbool ? override : !b));
  }, []); // eslint-disable-line
  return [bool, toggle];
};
