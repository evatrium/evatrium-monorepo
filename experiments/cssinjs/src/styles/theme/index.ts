import breakpoints from '~/styles/theme/breakpoints';
import { Theme } from '~/styles/types';
import { createTransitions } from './transitions';

export const spacing = 8;

export const theme: Theme = {
  spacing: (units: number) => spacing * units,
  shape: { br1: 4, br2: 12, br3: 20 },
  breakpoints,
  // palette,
  shadows: [
    'none',
    '0 8px 10px 1px rgba(var(--shadowBase), 0.14)',
    '0 12px 14px 1px rgba(var(--shadowBase), 0.20)'
  ],
  // typography: createTypography(),
  // @ts-ignore
  transitions: createTransitions(),
  zIndex: {
    navBar: 5000
  },
  components: {
    navHeight: 56
  }
  // icons
};
