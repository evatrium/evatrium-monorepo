// import * as React from 'react';
import { useEffect, useId as useReactId, useState } from 'react';
// credit MUI utils

let globalId = 0;
const useGlobalId = (idOverride?: string): string | undefined => {
  const [defaultId, setDefaultId] = useState(idOverride);
  const id = idOverride || defaultId;
  useEffect(() => {
    if (defaultId == null) {
      // Fallback to this default id when possible.
      // Use the incrementing value for client-side rendering only.
      // We can't use it server-side.
      // If you want to use random values please consider the Birthday Problem: https://en.wikipedia.org/wiki/Birthday_problem
      globalId += 1;
      setDefaultId(`${globalId}`);
    }
  }, [defaultId]);
  return id;
};

// eslint-disable-next-line no-useless-concat -- Workaround for https://github.com/webpack/webpack/issues/14814
// const maybeReactUseId: undefined | (() => string) = (React as any)['useId' + ''];
// @ts-ignore
const maybeReactUseId: undefined | (() => string) = useReactId;

/**
 *
 * @example <div id={useId()} />
 * @param idOverride
 * @returns {string}
 */
export const useId = (idOverride?: string): string | undefined => {
  if (maybeReactUseId !== undefined) {
    const reactId = maybeReactUseId();
    return idOverride ?? reactId;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks -- `React.useId` is invariant at runtime.
  return useGlobalId(idOverride);
};
