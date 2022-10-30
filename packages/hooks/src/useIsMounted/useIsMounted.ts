import { useRef, useEffect, useCallback } from 'react';

/**
 * returns a function for retrieving the mounted state of the component
 * @param initialValue Initial value. By default, this hook assumes that hook is
 * not mounted yet at first render.
 * @returns () => boolean // true if mounted
 * @example
 * 	const isMounted = useIsMounted();
 * 	useEffect(()=>{
 * 	    console.log(isMounted()); // true
 * 	},[]);
 */
export const useIsMounted = (initialValue = false): (() => boolean) => {
  const isMounted = useRef(initialValue);
  const get = useCallback(() => isMounted.current, []);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return get;
};
