import breakpoints from './breakpoints.js';
import palette from './palette.js';

import { createTypography } from './typography.js';
import { createTransitions } from './transitions.js';
import { icons } from './icons.js';

export const spacing = 8;

export const theme = {
  spacing: (units) => spacing * units,
  shape: { br1: 4, br2: 12, br3: 20 },
  breakpoints,
  palette,
  shadows: [
    'none',
    '0 8px 10px 1px rgba(var(--shadowBase), 0.14)',
    '0 12px 14px 1px rgba(var(--shadowBase), 0.20)'
  ],
  typography: createTypography(),
  transitions: {
    standard: (prop = 'all') => `${prop} 200ms ease-in-out`,
    ...createTransitions()
  },
  zIndex: {
    navBar: 5000
  },
  components: {
    navHeight: 56
  },
  icons
};
