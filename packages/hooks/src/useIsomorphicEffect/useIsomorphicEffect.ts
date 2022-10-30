import { isWeb } from '@evatrium/utils';
import { useEffect, useLayoutEffect } from 'react';

export const useIsomorphicEffect = isWeb() ? useLayoutEffect : useEffect;
