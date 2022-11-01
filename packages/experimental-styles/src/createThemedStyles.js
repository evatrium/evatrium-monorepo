import { isFunc, isObj, signature } from '@evatrium/utils';
import { parse } from '~/parse.js';

const withThemeSystem = (declarations, theme) => {
  if (isFunc(declarations)) return withThemeSystem(declarations(theme), theme);
  if (isObj(declarations)) {
    let out = {};
    for (let decKey in declarations) {
      let value = declarations[decKey];
      if (isFunc(value)) {
        out = handleCustomDeclarationKeyMerge(
          decKey,
          withThemeSystem(value(theme), theme),
          out,
          theme
        );
      } else if (isObj(value)) {
        for (let k in value) {
          const { upDownKeys, downKeys, down, up } = theme.breakpoints;
          if (upDownKeys.includes(k)) {
            const isDown = downKeys.includes(k);
            const media = isDown ? down(k) : up(k);
            out[media] = handleCustomDeclarationKeyMerge(
              decKey,
              withThemeSystem(value[k], theme),
              out[media] || {},
              theme
            );
          } else {
            (out[decKey] || (out[decKey] = {}))[k] = withThemeSystem(value[k], theme);
          }
        }
      } else {
        out = handleCustomDeclarationKeyMerge(decKey, value, out, theme);
      }
    }
    return out;
  } else return declarations;
};

export const createThemedStyles = (theme, declarationsCache = {}) => {
  return (jssClasses = {}, declarationsOnly) => {
    // declarations could be called many during frequent updates so it makes sense to cache them here
    if (declarationsOnly) {
      // ran a performance test and caching is actually helpful here
      const result = withThemeSystem(jssClasses, theme);
      const cacheKey = signature(result);
      if (declarationsCache[cacheKey]) return declarationsCache[cacheKey];
      const className = parse(result);
      declarationsCache[cacheKey] = className;
      return className;
      // const themed = withThemeSystem(jssClasses, theme);
      // return parse(themed)
    }
    // jss classes are defined once so caching is not that helpful
    let cssClasses = {};
    jssClasses = isFunc(jssClasses) ? jssClasses(theme) : jssClasses;
    for (let classKey in jssClasses) {
      const obj = withThemeSystem(jssClasses[classKey], theme);
      cssClasses[classKey] = parse(obj);
    }
    return cssClasses;
  };
};

export const marginPaddingFns = {
  m: (value) => ({ margin: value }),
  mt: (value) => ({ marginTop: value }),
  mr: (value) => ({ marginRight: value }),
  mb: (value) => ({ marginBottom: value }),
  ml: (value) => ({ marginLeft: value }),
  mx: (value) => ({ marginRight: value, marginLeft: value }),
  my: (value) => ({ marginTop: value, marginBottom: value }),
  p: (value) => ({ padding: value }),
  pt: (value) => ({ paddingTop: value }),
  pr: (value) => ({ paddingRight: value }),
  pb: (value) => ({ paddingBottom: value }),
  pl: (value) => ({ paddingLeft: value }),
  px: (value) => ({ paddingRight: value, paddingLeft: value }),
  py: (value) => ({ paddingTop: value, paddingBottom: value })
};

export const handleCustomDeclarationKeyMerge = (decKey, value, out, theme) => {
  if (value === undefined) return out;
  if (decKey in marginPaddingFns) {
    out = {
      ...out,
      ...marginPaddingFns[decKey](typeof value === 'number' ? value * theme.spacing(1) : value)
    };
  } else {
    out[decKey] = value;
  }
  return out;
};
