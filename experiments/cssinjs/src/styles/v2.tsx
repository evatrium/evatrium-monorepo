import { ClassesObj } from '~/styles/types';
import { cn, isEmpty, isEqual, isFunc, isObj, Obj, signature } from '@evatrium/utils';
import { withThemeSystem } from '~/styles/withThemeSystem';
import { parse } from '~/styles/parse';
import { theme } from '~/styles/theme';
import { ElementType, FC, forwardRef, useMemo, useRef } from 'react';
import { usePrevious } from '@evatrium/hooks';

const decsCache: { [key: string]: string } = {};
const processStyles = ({ theme, styles, namespace, declarations } = {}): any => {
  if (declarations) {
    const themedOut = withThemeSystem(styles, theme);
    const sig = signature(themedOut);
    if (decsCache[sig]) return decsCache[sig];
    decsCache[sig] = parse(themedOut, namespace || 'custom');
    return decsCache[sig];
  }
  let cssClasses: ClassesObj = {};
  const styleObj = isFunc(styles) ? styles(theme) : styles;
  for (let classKey of Object.keys(styleObj)) {
    const value = styleObj[classKey as keyof typeof styleObj];
    const themedObj = withThemeSystem(value, theme);
    cssClasses[classKey] = parse(themedObj, namespace || 'components');
  }
  return cssClasses;
};
/*
  styles
    - byTheme: theme
      - theme: variantCache
        - variantCache: results
 */
const createCssInJsWithCache = ({ rootCache = new WeakMap(), namespace } = {}) => {
  return ({ theme, styles, variants, namespace, declarations } = {}) => {
    let byTheme = rootCache.get(styles);
    const stringifiedVariantsKey = signature(variants);
    let results = { root: '' };
    let variantCache: { [key: string]: any };
    const construct = () => {
      console.log('constructing');
      const styleOut = isFunc(styles) ? styles(theme, variants) : styles;
      results = styleOut
        ? processStyles({ theme, styles: styleOut, namespace, declarations })
        : declarations
        ? ''
        : {};
      (variantCache || (variantCache = {}))[stringifiedVariantsKey] = results;
      (byTheme || (byTheme = new WeakMap())).set(theme, variantCache);
      byTheme.set(theme, variantCache);
      rootCache.set(styles, byTheme);
    };
    if (byTheme) {
      variantCache = byTheme.get(theme);
      if (variantCache[stringifiedVariantsKey]) {
        results = variantCache[stringifiedVariantsKey];
      } else construct();
    } else construct();

    return results;
  };
};

const styleIt = createCssInJsWithCache();

const useStyleCache = () => styleIt;

const useTheme = () => theme; // temp

const { keys, values } = Object;
const useStyles = (styles, { variants, declarations, namespace } = {}) => {
  const theme = useTheme();

  const styleCache = useStyleCache();
  const variantsRef = useRef(variants);
  const prev = usePrevious(variants);
  if (!isEqual(prev, variants)) {
    variantsRef.current = variants;
  }
  const deps = [theme, styles, variants, declarations];

  return useMemo(() => {
    if (!styles) return declarations ? '' : {};
    return styleCache({ theme, styles, variants, declarations, namespace });
  }, deps);
};

const EMPTY_SX_DEPS: any[] = [];

export const Box: FC<BoxProps> = forwardRef<Element, BoxProps>((props, ref) => {
  const { Component, ...rest } = useBoxProps(props);
  return <Component ref={ref} {...rest} />;
});

export interface BoxProps {
  component?: ElementType;
  className?: 'string';
  classes?: any[] | undefined;
  sx?: any; // TODO: FIX TYPE
  sxDeps?: any[];
  children?: ElementType;
}

//
const useBoxProps = ({
  component = 'div',
  className,
  classes,
  sx,
  sxDeps = EMPTY_SX_DEPS,
  ...rest
}: BoxProps) => {
  const theme = useTheme();
  const classNames = useMemo(
    () =>
      cn(
        className,
        ...(classes || []),
        sx && styleIt({ theme, styles: sx, declarations: true, variants: sxDeps })
      ),
    [theme, className, classes, ...sxDeps]
  );
  return {
    Component: component,
    className: classNames,
    ...rest
  };
};

const squareStyles = (theme, props) => {
  const { size = 'sm', color = 'blue' } = props;
  const sizes = { sm: 20, lg: 50 };
  return {
    root: {
      height: sizes[size],
      width: sizes[size],
      background: color
    }
  };
};

export const BlackBox = ({ size, color, ...rest }) => {
  const classnames = useStyles(squareStyles, {
    variants: { size, color }
  });

  return (
    <Box className={classnames.root} {...rest}>
      im a box
    </Box>
  );
};
