import { DARK_THEME_ATTRIBUTE } from '~/styles/stylesGlobal/vars';

export const toggleThemeMode = () => {
  document.querySelector('html')!.toggleAttribute(DARK_THEME_ATTRIBUTE);
};
