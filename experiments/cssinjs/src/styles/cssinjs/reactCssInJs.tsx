import { useDeepEqualMemo } from '@evatrium/hooks';
import { StyleObjOrFunc, StylesProcessingOptions, Theme } from '~/styles/types';
import { createCssInJsWithCache } from '~/styles/cssinjs/stylesWithCache';
import { createContext, ReactNode, useContext, useMemo, useRef } from 'react';
import { insertGlobalStyles } from '~/styles/cssinjs/insertGlobalStyles';
import { PrefixerOfChoice, setPrefixer } from '~/styles/cssinjs/prefixPx';

// ----------- THEME -----------------
export const ThemeContext = createContext({} as Theme);

type ThemeProviderProps = { theme: Theme; children: ReactNode };

export const ThemeProvider = ({ theme, children }: ThemeProviderProps) => {
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

export const StylesWithCacheProvider = ({
  rootCache,
  children,
  prefixerOfChoice
}: StylesWithCacheProviderProps) => {
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
  // theme is a gnarly deep object to compare
  // so we will use a normal memo to compare references
  // instead of checking them deeply in the useDeepEqualMemo
  // when used for declarations only, pass sxDeps to variants
  const themeOrStylesReferenceChanged = useMemo(() => {
    counterRef.current++;
    return counterRef.current;
  }, [theme]);

  return useDeepEqualMemo(() => {
    if (!styles) return declarations ? '' : {};
    return styleItWithCache({ theme, styles, variants, declarations, namespace });
  }, [themeOrStylesReferenceChanged, variants, declarations]); // when used for declarations only, pass sxDeps to variants
};

// --------------- GLOBAL -----------------
type GlobalStylesProps = { globalStyles?: StyleObjOrFunc };

export const GlobalStyles = ({ globalStyles }: GlobalStylesProps) => {
  const theme = useTheme();
  useMemo(() => {
    globalStyles && insertGlobalStyles(theme, globalStyles);
  }, [theme, globalStyles]);
  return null;
};
// -------------- ROOT PROVIDER -----------------

export type RootStylesProviderProps = {
  theme: Theme;
} & StylesWithCacheProviderProps &
  GlobalStylesProps;

export const RootStylesProvider = ({
  theme,
  rootCache,
  children,
  globalStyles,
  prefixerOfChoice
}: RootStylesProviderProps) => {
  return (
    <ThemeProvider theme={theme}>
      <StylesWithCacheProvider rootCache={rootCache} prefixerOfChoice={prefixerOfChoice}>
        <GlobalStyles globalStyles={globalStyles} />
        {children}
      </StylesWithCacheProvider>
    </ThemeProvider>
  );
};
