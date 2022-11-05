export const DARK_THEME_ATTRIBUTE = 'dark-theme';

export const vars = () => ({
  ':root': {
    '--ON': 'initial',
    '--OFF': ` `
    // ...theme.palette.declarations,
  },

  [`[${DARK_THEME_ATTRIBUTE}]`]: {
    '--light': 'var(--OFF)',
    '--dark': 'var(--ON)'
  }
});
