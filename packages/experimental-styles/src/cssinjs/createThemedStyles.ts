import { isFunc, signature } from '@evatrium/utils';
import { parse } from './parse';
import { withThemeSystem } from '~/cssinjs/withThemeSystem.js';

type BreakpointValues = { xs: number; sm: number; md: number; lg: number; xl: number; xxl: number };
type BreakpointsValuesKey = keyof BreakpointValues;
export type Theme = {
  spacing: (units: number) => number;
  shape: { [key: string]: any };
  breakpoints: {
    downKeys: string[];
    upDownKeys: string[];
    keys: string[];
    values: BreakpointValues;
    up: (key: BreakpointsValuesKey) => string;
    down: (key: BreakpointsValuesKey) => string;
    between: (start: BreakpointsValuesKey, end: BreakpointsValuesKey) => string;
    only: (key: BreakpointsValuesKey) => string;
  };
};

export const createThemedStyles = (theme: Theme, declarationsCache: Record<string, any> = {}) => {
  return (jssClasses: Record<string, any> = {}, declarationsOnly?: boolean) => {
    // declarations could be called many during frequent updates so it makes sense to cache them here
    if (declarationsOnly) {
      // ran a performance test and caching is actually helpful here
      const result = withThemeSystem(jssClasses, theme);
      const cacheKey = signature(result);
      if (declarationsCache[cacheKey]) return declarationsCache[cacheKey];
      const className = parse(result);
      declarationsCache[cacheKey] = className;
      return className;
    }
    // jss classes are defined once so caching is not that helpful
    let cssClasses: { [key: string]: any } = {};
    jssClasses = isFunc(jssClasses) ? jssClasses(theme) : jssClasses;
    for (let classKey in jssClasses) {
      const obj = withThemeSystem(jssClasses[classKey], theme);
      cssClasses[classKey] = parse(obj);
    }
    return cssClasses;
  };
};
