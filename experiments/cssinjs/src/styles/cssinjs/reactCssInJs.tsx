import { useDeepEqualMemo, useShallowEqualMemo } from '@evatrium/hooks';
import { StyleObject, StyleObjOrFunc, StylesProcessingOptions, Theme } from '~/styles/types';
import { createCssInJsWithCache } from '~/styles/cssinjs/stylesWithCache';
import { createContext, FC, ReactNode, useContext, useMemo, useRef } from 'react';
import { insertGlobalStyles } from '~/styles/cssinjs/insertGlobalStyles';
import { PrefixerOfChoice, setPrefixer } from '~/styles/cssinjs/prefixPx';
import { markers } from '~/styles/cssinjs/parse';
import { isFunc, ObjStrKey } from '@evatrium/utils';

// ----------- THEME -----------------
export const ThemeContext = createContext({} as Theme);

type ThemeProviderProps = { theme: Theme; children: ReactNode };

export const ThemeProvider: FC<ThemeProviderProps> = ({ theme, children }) => {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);

// ----------- STYLES WITH CACHE -------------------------
export const StylesWithCacheContext = createContext(
  (stylesProcessingOptions: StylesProcessingOptions) => {}
);

export type StylesWithCacheProviderProps = {
  rootCache?: Map<any, any>; // TODO: fix types,
  children: ReactNode;
  prefixerOfChoice?: PrefixerOfChoice;
};

export const StylesWithCacheProvider: FC<StylesWithCacheProviderProps> = ({
  rootCache,
  children,
  prefixerOfChoice
}) => {
  const styles = useMemo(() => {
    prefixerOfChoice && setPrefixer(prefixerOfChoice);
    return createCssInJsWithCache({ rootCache });
  }, [rootCache, prefixerOfChoice]);
  return (
    <StylesWithCacheContext.Provider value={styles}>{children}</StylesWithCacheContext.Provider>
  );
};

export const useStyles = (
  styles?: StyleObjOrFunc,
  { variants, declarations, namespace }: StylesProcessingOptions = {}
) => {
  const theme = useTheme();
  const styleItWithCache = useContext(StylesWithCacheContext);
  const counterRef = useRef(0);
  // theme is a gnarly deep object to compare and styles could be a deep object
  // so we will use a normal memo to compare references
  // instead of checking them deeply in the useDeepEqualMemo
  // when using styles for declarations only (i.e. Box props), pass sxDeps to variants
  const themeOrStylesReferenceChanged = useMemo(() => {
    counterRef.current++;
    return counterRef.current;
  }, [theme, styles]);

  return useDeepEqualMemo(() => {
    if (!styles) return declarations ? '' : {};
    return styleItWithCache({ theme, styles, variants, declarations, namespace });
  }, [themeOrStylesReferenceChanged, variants, declarations]); // when used for declarations only, pass sxDeps to variants
};

// --------------- VARS -----------------

export const useVars = (name: string, obj: StyleObjOrFunc, deps: any[]) => {
  const theme = useTheme();
  const styles = useShallowEqualMemo(() => {
    if (!obj) return {};
    obj = isFunc(obj) ? obj(theme) : obj;
    return Object.keys(obj).reduce((acc, curr) => {
      acc[`--${name}-${curr}`] = obj[curr];
      return acc;
    }, {} as ObjStrKey);
  }, deps || []);
  // console.log(styles);
  return useStyles(styles, {
    declarations: true,
    variants: deps
  });
  // return styles;
};

// --------------- GLOBAL -----------------
type GlobalStylesProps = { globalStyles?: StyleObjOrFunc };

export const GlobalStyles: FC<GlobalStylesProps> = ({ globalStyles }) => {
  const theme = useTheme();

  useMemo(() => {
    globalStyles && insertGlobalStyles(theme, globalStyles);
  }, [theme, globalStyles]);
  return null;
};

// --------------- UTILITY -----------------
type UtilityClassesProviderProps = { utilityClassesStyles?: StyleObjOrFunc; children: ReactNode };

export const UtilityClassesContext = createContext({});

export const useUtilityClasses = () => useContext(UtilityClassesContext);

export const UtilityClassesProvider: FC<UtilityClassesProviderProps> = ({
  utilityClassesStyles,
  children
}) => {
  const utilityClasses = useStyles(utilityClassesStyles, { namespace: markers.UTILITIES });
  return (
    <UtilityClassesContext.Provider value={utilityClasses}>
      {children}
    </UtilityClassesContext.Provider>
  );
};

// -------------- ROOT PROVIDER -----------------

export type RootStylesProviderProps = {
  theme: Theme;
} & StylesWithCacheProviderProps &
  GlobalStylesProps &
  UtilityClassesProviderProps;

export const RootStylesProvider: FC<RootStylesProviderProps> = ({
  theme,
  rootCache,
  children,
  globalStyles,
  utilityClassesStyles,
  prefixerOfChoice
}) => {
  return (
    <ThemeProvider theme={theme}>
      <StylesWithCacheProvider rootCache={rootCache} prefixerOfChoice={prefixerOfChoice}>
        <GlobalStyles globalStyles={globalStyles} />
        <UtilityClassesProvider utilityClassesStyles={utilityClassesStyles}>
          {children}
        </UtilityClassesProvider>
      </StylesWithCacheProvider>
    </ThemeProvider>
  );
};
