import breakpoints from '~/styles/theme/breakpoints';
import { Theme } from '~/styles/types';
import { createTransitions } from './transitions';
import { palette } from '~/styles/theme/_genratePalette';
import { createTypography } from '~/styles/theme/createTypography';
import { getIn } from '@evatrium/utils';

export const spacingUnit = 8;

const spacing = (units: number) => spacingUnit * units;
spacing.units = 'px';

const shape = { br1: 4, br2: 16, br3: '55px/55px' };
const typography = createTypography({ palette });
const shadows = [
  'none',
  '0 2px 10px 0 rgba(var(--shadowBase), 15%)',
  '0px 2px 10px 0 rgb(var(--shadowBase), 15%), 0px 5px 14px 1px rgb(var(--shadowBase), 20%)'
];

function getColor(dotWalk: string) {
  return getIn(palette, dotWalk, '');
}

export const theme: Theme = {
  spacing,
  shape,
  breakpoints,
  palette,
  typography,
  shadows,
  transitions: {
    standard: (prop = 'all') => `${prop} 200ms ease-in-out`,
    ...createTransitions()
  },
  zIndex: {
    navBar: 5000
  },
  components: {
    NavBar: {
      styles: () => ({
        root: {
          height: 56
        }
      })
    },
    Button: {
      styles: () => ({
        root: {
          borderRadius: shape.br3
        }
      })
    }
  },
  getColor
  // icons
};
