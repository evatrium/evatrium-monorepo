import { DARK_THEME_ATTRIBUTE } from '~/styles/theme/mode';

export const vars = (theme) => ({
  ':root': {
    '--ON': 'initial',
    '--OFF': ` `,
    ...theme.palette.declarations
  },

  [`[${DARK_THEME_ATTRIBUTE}]`]: {
    '--light': 'var(--OFF)',
    '--dark': 'var(--ON)'
  }
});
