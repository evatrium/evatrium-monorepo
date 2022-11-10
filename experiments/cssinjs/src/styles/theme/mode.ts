import { isWeb, localStore } from '@evatrium/utils';
import { useCallback, useEffect, useState } from 'react';
import { useSyncedRef } from '@evatrium/hooks';

export const DARK_THEME_ATTRIBUTE = 'data-dark-theme';
const STORAGE_KEY_THEME_MODE = 'theme-mode';
const dfltMode = 'system';

export type Mode = 'light' | 'dark' | 'system';

const modes: { [key: string]: Mode } = {
  dark: 'dark',
  light: 'light',
  system: 'system'
};

/*** similar logic is executed in index.html*/
const handleMode = (setTo?: Mode): { setting: string; perceived: string } => {
  if (!isWeb()) return { setting: dfltMode, perceived: dfltMode };
  let perceived;
  let setting = setTo || localStore.getItem(STORAGE_KEY_THEME_MODE);
  if (!setting || !(setting in modes)) setting = dfltMode;
  localStore.setItem(STORAGE_KEY_THEME_MODE, setting);
  if (setting === modes.system && window.matchMedia) {
    let mql = window.matchMedia('(prefers-color-scheme: dark)');
    perceived = mql.matches ? modes.dark : modes.light;
  } else perceived = setting;

  const el = document.querySelector('html')!;
  perceived === modes.dark
    ? el.setAttribute(DARK_THEME_ATTRIBUTE, '')
    : el.removeAttribute(DARK_THEME_ATTRIBUTE);
  return { setting, perceived };
};

type ModeSettings = { setting: string; perceived: string };
export const useThemeMode = (
  mode: Mode = modes.system,
  updateState?: true
): [ModeSettings, (nextMode: Mode) => void] => {
  const [state, setState] = useState<{ setting: string; perceived: string }>(() =>
    handleMode(mode)
  );
  const onModeChange = useCallback((setTo: Mode) => {
    const nextState = handleMode(setTo);
    setState(nextState);
  }, []);

  const setting = useSyncedRef(state.setting);

  useEffect(() => {
    if (isWeb()) {
      const handler = (e?: MediaQueryListEvent) => {
        if (setting.current === modes.system) {
          // console.log('device theme preference changed');
          onModeChange(e?.matches ? modes.dark : modes.light);
        }
      };
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      // Intentionally use deprecated listener methods to support iOS & old browsers
      media.addListener(handler);
      const unsubStorage = localStore.subscribeToKey(STORAGE_KEY_THEME_MODE, (data: any) =>
        onModeChange(data)
      );
      return () => {
        unsubStorage();
        media.removeListener(handler);
      };
    }
    return;
  }, []);
  return [state, onModeChange];
};
