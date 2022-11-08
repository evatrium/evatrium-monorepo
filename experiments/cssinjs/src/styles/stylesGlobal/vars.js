export const DARK_THEME_ATTRIBUTE = 'data-dark-theme';

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
