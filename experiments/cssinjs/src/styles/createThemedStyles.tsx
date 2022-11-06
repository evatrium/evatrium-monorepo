import { isFunc, signature, weakMemoize } from '@evatrium/utils';
import { parse } from './parse';
import { withThemeSystem } from '~/styles/withThemeSystem.js';
import { Theme, Obj, StyleObjOrFunc, ClassesObj, JoinedClassNamesString } from '~/styles/types';
import { theme } from '~/styles/theme';
import { useMemo } from 'react';
import { styles } from '~/styles/index';

type OptionalArrayOfStyleObjOrFunc = StyleObjOrFunc | StyleObjOrFunc[];

export const createThemedStyles = (theme: Theme) => {
  // memoizes by the object/function reference
  const declarationsCache: Obj = {};
  // const memoized = weakMemoize((jssClasses) => {});
  const processDeclarations = (styleObjOrFunc: OptionalArrayOfStyleObjOrFunc) => {
    const themedObj = withThemeSystem(styleObjOrFunc, theme);
    const cacheKey = signature(themedObj);

    if (declarationsCache[cacheKey]) return declarationsCache[cacheKey];
    const className = parse(themedObj, 'custom');
    declarationsCache[cacheKey] = className;
    return className;
  };
  const styleIt = (
    styleObjOrFunc: OptionalArrayOfStyleObjOrFunc,
    declarationsOnly?: boolean
  ): any => {
    // ClassesObj | JoinedClassNamesString
    // declarations could be called many during frequent updates, so it makes sense to cache them here
    if (declarationsOnly) {
      // ran a performance test and caching is actually helpful here
      return processDeclarations(styleObjOrFunc);
    }
    // jss classes are defined once so caching is not that helpful
    // caching also takes place within the parse function anyway
    let cssClasses: ClassesObj = {};
    const styleObj = isFunc(styleObjOrFunc) ? styleObjOrFunc(theme) : styleObjOrFunc;
    for (let classKey of Object.keys(styleObj)) {
      const value = styleObj[classKey as keyof typeof styleObj];
      const themedObj = withThemeSystem(value, theme);
      cssClasses[classKey] = parse(themedObj, 'components');
    }
    return cssClasses;
  };
  return styleIt;
};
