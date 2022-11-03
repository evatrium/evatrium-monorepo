import { isFunc, signature, weakMemoize } from '@evatrium/utils';
import { parse } from './parse';
import { withThemeSystem } from '~/cssinjs/withThemeSystem.js';
import { Theme, Obj, StyleObjOrFunc, ClassesObj, JoinedClassNamesString } from '~/cssinjs/types';

type OptionalArrayOfStyleObjOrFunc = StyleObjOrFunc | StyleObjOrFunc[];

// export type StylesFunc = {
//   (styleObjOrFunc: StyleObjOrFunc, declarationsOnly?: boolean): ClassesObj;
//
//   (
//     styleObjOrFunc: OptionalArrayOfStyleObjOrFunc,
//     declarationsOnly: boolean
//   ): JoinedClassNamesString;
// };

// function styles(jssClasses: ThemedStylesArg, declarationsOnly?: boolean): ClassesObj;
// function styles(jssClasses: ThemedStylesArg, declarationsOnly: boolean): string;

export const createThemedStyles = (theme: Theme) => {
  // memoizes by the object/function reference
  const declarationsCache: Obj = {};
  // const memoized = weakMemoize((jssClasses) => {});
  const processDeclarations = (styleObjOrFunc: OptionalArrayOfStyleObjOrFunc) => {
    const themedObj = withThemeSystem(styleObjOrFunc, theme);
    const cacheKey = signature(themedObj);
    if (declarationsCache[cacheKey]) return declarationsCache[cacheKey];
    const className = parse(themedObj);
    declarationsCache[cacheKey] = className;
    return className;
  };
  const styles = (
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
      cssClasses[classKey] = parse(themedObj);
    }
    return cssClasses;
  };

  return styles;
};
