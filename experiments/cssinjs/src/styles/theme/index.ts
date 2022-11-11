import breakpoints from '~/styles/theme/breakpoints';
import { Theme } from '~/styles/types';
import { createTransitions } from './transitions';
import { palette } from '~/styles/theme/_genratePalette';
import { typography } from '~/styles/theme/typography';
import { getIn } from '@evatrium/utils';

export const spacingUnit = 8;

const getColor = (theme: Theme, color: string) => {
  const { palette } = theme;
  if (palette[color]) return palette[color];
  if (String(color).startsWith('grey')) return palette.grey[color.replace('grey', '')];
  return color;
};
const spacing = (units: number) => spacingUnit * units;
spacing.units = 'px';
export const theme: Theme = {
  spacing,
  typography: typography({ palette }),
  shape: { br1: 2, br2: 10, br3: 50 },
  breakpoints,
  palette,
  shadows: [
    'none',
    '0 2px 10px 0 rgba(var(--shadowBase), 15%)',
    '0px 2px 10px 0 rgb(var(--shadowBase), 15%), 0px 5px 14px 1px rgb(var(--shadowBase), 20%)'
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
  },
  getColor(dotWalk: string) {
    return getIn(palette, dotWalk, '');
  }
  // icons
};
