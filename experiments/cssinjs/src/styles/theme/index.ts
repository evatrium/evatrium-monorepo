import breakpoints from '~/styles/theme/breakpoints';
import { Theme } from '~/styles/types';
import { createTransitions } from './transitions';
import { palette } from '~/styles/theme/palette';

export const spacing = 8;

export const theme: Theme = {
  spacing: (units: number) => spacing * units,
  shape: { br1: 4, br2: 12, br3: 20 },
  breakpoints,
  palette,
  shadows: [
    'none',
    '0 2px 10px 0px rgba(var(--shadowBase), 14%)',
    '0px 2px 20px 0px rgb(var(--shadowBase) / 14%)'
  ],
  // typography: createTypography(),
  // @ts-ignore
  transitions: {
    standard: (prop = 'all') => `${prop} 200ms ease-in-out`,
    ...createTransitions()
  },
  zIndex: {
    navBar: 5000
  },
  components: {
    navHeight: 56
  }
  // icons
};
