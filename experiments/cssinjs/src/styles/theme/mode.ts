import { isWeb, localStore, ObjStrKey } from '@evatrium/utils';

export const DARK_THEME_ATTRIBUTE = 'data-dark-theme';
const COLOR_MODE_STORAGE_KEY = 'colorMode';
export type Mode = 'light' | 'dark' | 'system';
export type SystemMode = Exclude<Mode, 'system'>;

export const toggleThemeMode = () => {
  document.querySelector('html')!.toggleAttribute(DARK_THEME_ATTRIBUTE);
};

export interface State<SupportedColorScheme extends string> {
  /**
   * User selected mode.
   * Note: on the server, mode is always undefined
   */
  mode: Mode | undefined;
  /**
   * Only valid if `mode: 'system'`, either 'light' | 'dark'.
   */
  systemMode: SystemMode | undefined;
  /**
   * The color scheme for the light mode.
   */
  lightColorScheme: SupportedColorScheme;
  /**
   * The color scheme for the dark mode.
   */
  darkColorScheme: SupportedColorScheme;
}

const modes: ObjStrKey = {
  dark: 'dark',
  light: 'light',
  system: 'system'
};

const getSystemMode = () => {
  if (!isWeb()) return;
  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  if (mql.matches) {
    return 'dark';
  }
  return 'light';
};

const init = ({ defaultValue = modes.dark } = {}) => {
  let storedMode = localStore.getItem(COLOR_MODE_STORAGE_KEY);

  if (!storedMode) {
    defaultValue = modes[defaultValue] || modes.system;
    localStore.setItem(COLOR_MODE_STORAGE_KEY, defaultValue);
    storedMode = defaultValue;
  }
};
