import { isWeb, localStore as ls } from '@evatrium/utils';
import { useCallback, useEffect, useState } from 'react';
import { useSyncedRef } from '@evatrium/hooks';

// a bit less code than: https://github.com/mui/material-ui/blob/master/packages/mui-system/src/cssVars/useCurrentColorScheme.ts

export const DARK_THEME_ATTRIBUTE = 'data-dark-theme';
const STORAGE_KEY_THEME_MODE = 'theme-mode';
const dfltMode = 'system';
export type Mode = 'light' | 'dark' | 'system';
const modes: { [key: string]: Mode } = { dark: 'dark', light: 'light', system: 'system' };
const { dark, light, system } = modes;
const mm = () => window.matchMedia('(prefers-color-scheme: dark)');
/*** similar logic is executed in index.html*/
const handleMode = (setTo?: Mode): { setting: string; perceived: string } => {
  if (!isWeb()) return { setting: dfltMode, perceived: dfltMode };
  let perceived;
  let setting = setTo || ls.getItem(STORAGE_KEY_THEME_MODE);
  if (!setting || !(setting in modes)) setting = dfltMode;
  ls.setItem(STORAGE_KEY_THEME_MODE, setting);
  if (setting === system && 'matchMedia' in window) {
    perceived = mm().matches ? dark : light;
  } else perceived = setting;
  const el = document.querySelector('html')!;
  perceived === dark
    ? el.setAttribute(DARK_THEME_ATTRIBUTE, '')
    : el.removeAttribute(DARK_THEME_ATTRIBUTE);
  return { setting, perceived };
};

type ModeSettings = { setting: string; perceived: string };
export const useThemeMode = (mode: Mode = system): [ModeSettings, (nextMode: Mode) => void] => {
  const [m, setM] = useState<{ setting: string; perceived: string }>(() => handleMode(mode));
  const onModeChange = useCallback((setTo: Mode) => setM(handleMode(setTo)), []);
  const setting = useSyncedRef(m.setting);
  useEffect(() => {
    if (!isWeb()) return;
    const handler = (e?: MediaQueryListEvent) =>
      setting.current === system && onModeChange(e?.matches ? dark : light);
    const media = mm();
    media.addListener(handler); // Intentionally use deprecated listener methods to support iOS & old browsers
    const unsub = ls.subscribeToKey(STORAGE_KEY_THEME_MODE, (data: any) => onModeChange(data));
    return () => (unsub(), media.removeListener(handler));
  }, []);
  return [m, onModeChange];
};
