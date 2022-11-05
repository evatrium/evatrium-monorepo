import { createThemedGlobalStyles } from '~/styles/createThemedGlobalStyles';
import { theme } from '~/styles/theme';
import { stylesGlobal } from '~/styles/stylesGlobal';

export const globalStyles = createThemedGlobalStyles(theme);

globalStyles((theme) => {
  return stylesGlobal(theme);
});
