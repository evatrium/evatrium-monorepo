import { ClassesObj, StylesProcessingOptions } from '~/styles/types';
import { isFunc, signature } from '@evatrium/utils';
import { withThemeSystem } from '~/styles/cssinjs/withThemeSystem';
import { parse, markers } from '~/styles/cssinjs/parse';

const decsCache: { [key: string]: string } = {};
const processStyles = ({
  theme,
  styles,
  namespace,
  declarations
}: StylesProcessingOptions = {}): any => {
  if (declarations) {
    namespace = namespace || markers.OVERRIDES;
    const themedOut = withThemeSystem(styles, theme);
    const sig = signature.fast([namespace, themedOut]); // TODO: find out the performance improvement
    if (decsCache[sig]) {
      // console.log('cache hit', namespace);
      return decsCache[sig];
    }
    decsCache[sig] = parse(themedOut, namespace);
    return decsCache[sig];
  }
  let cssClasses: ClassesObj = {};
  const styleObj = isFunc(styles) ? styles(theme!) : styles;
  for (let classKey of Object.keys(styleObj)) {
    const value = styleObj[classKey];
    const themedObj = withThemeSystem(value, theme);
    cssClasses[classKey] = parse(themedObj, namespace || markers.COMPONENTS);
  }
  return cssClasses;
};
/*
  styles (style producer reference: obj | func )
    - byTheme: theme
      - theme: variantCache
        - variantCache: results
 */
export const createCssInJsWithCache = ({ rootCache = new WeakMap() } = {}) => {
  return ({ theme, styles, variants, namespace, declarations }: StylesProcessingOptions = {}):
    | ClassesObj
    | string => {
    if (!styles) return declarations ? '' : {};
    let byTheme = rootCache.get(styles!);
    const stringifiedVariantsKey = signature.fast([namespace, variants]);
    let results;
    let variantCache: { [key: string]: any };
    const construct = () => {
      // console.log('constructing');
      const styleOut = isFunc(styles) ? styles(theme!, variants) : styles;
      results = styleOut
        ? processStyles({ theme, styles: styleOut, namespace, declarations })
        : declarations
        ? ''
        : {};
      (variantCache || (variantCache = {}))[stringifiedVariantsKey] = results;
      (byTheme || (byTheme = new WeakMap())).set(theme, variantCache);
      byTheme.set(theme, variantCache);
      rootCache.set(styles!, byTheme);
    };
    if (byTheme) {
      variantCache = byTheme.get(theme);
      if (variantCache && variantCache[stringifiedVariantsKey]) {
        results = variantCache[stringifiedVariantsKey];
      } else construct();
    } else construct();

    return results;
  };
};
