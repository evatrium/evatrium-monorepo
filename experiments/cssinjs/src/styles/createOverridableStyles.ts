import styles from '~/styles/styles';
import { StyleObjOrFunc, JoinedClassNamesString } from '~/styles/types';
import { useMemo } from 'react';

const EMPTY_DEPS: any[] = [];

export default function createOverridableStyles(
  styleObjOrFunc: StyleObjOrFunc,
  { invokeOnCreate = true } = {}
) {
  let className: string;
  if (invokeOnCreate) className = styles(styleObjOrFunc, true) as string;
  return function useStyles(overrides?: StyleObjOrFunc | boolean, deps = EMPTY_DEPS) {
    return useMemo(() => {
      return overrides
        ? (styles([styleObjOrFunc, overrides], true) as string)
        : invokeOnCreate
        ? className
        : styles(styleObjOrFunc, true);
    }, deps);
  };
}
