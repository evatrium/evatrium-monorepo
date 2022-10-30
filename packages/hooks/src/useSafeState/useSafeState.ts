import {
  useCallback,
  useState,
  //types
  Dispatch,
  SetStateAction
} from 'react';
import { useIsMounted } from '~/useIsMounted';

export function useSafeState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
export function useSafeState<S = undefined>(): [
  S | undefined,
  Dispatch<SetStateAction<S | undefined>>
];

/**
 * Like `useState` but its state setter is guarded against sets on unmounted component.
 */
export function useSafeState<S>(
  initialState?: S | (() => S)
): [S | undefined, Dispatch<SetStateAction<S>>] {
  const [state, setState] = useState(initialState);
  const isMounted = useIsMounted(true);

  return [
    state,

    useCallback((value) => {
      isMounted() && setState(value as S);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) as Dispatch<SetStateAction<S>>
  ];
}
