import { Theme } from '~/styles/types';

export const utilityStyles = (theme: Theme) => {
  const { shadows, shape, palette, transitions, breakpoints, spacing, typography } = theme;
  return {
    //---------------------SHADOWS------------------

    '.sdw1': {
      boxShadow: shadows[1]
    },
    '.sdw2': {
      boxShadow: shadows[2]
    },

    '.sdwh': {
      boxShadow: shadows[1],
      transition: transitions.standard('box-shadow')
    },
    ['.sdwh:hover']: {
      boxShadow: shadows[2]
    },

    //---------------------BORDER RADIUS------------------

    '.br1': {
      borderRadius: shape.br1
    },
    '.br2': {
      borderRadius: shape.br2
    },
    '.br3': {
      borderRadius: shape.br3
    },

    //---------------------DISPLAY------------------

    '.block': {
      display: 'block'
    },
    '.blockin': {
      display: 'inline-block'
    },
    '.inl': {
      display: 'inline'
    },
    //---------------------FLEX------------------

    '.flex': {
      display: 'flex'
    },
    '.fdc': {
      flexDirection: 'column'
    },
    '.fdr': {
      flexDirection: 'row'
    },
    '.jcc': {
      justifyContent: 'center'
    },
    '.jcsb': {
      justifyContent: 'space-between'
    },
    '.jcse': {
      justifyContent: 'space-evenly'
    },
    '.jcsa': {
      justifyContent: 'space-around'
    },
    '.jcfs': {
      justifyContent: 'flex-start'
    },
    '.jcfe': {
      justifyContent: 'flex-end'
    },
    '.aic': {
      alignItems: 'center'
    },
    '.aifs': {
      alignItems: 'flex-start'
    },
    '.ais': {
      alignItems: 'stretch'
    },
    '.aife': {
      alignItems: 'flex-end'
    },
    '.asfe': {
      alignSelf: 'flex-end'
    },
    '.asfs': {
      alignSelf: 'flex-start'
    },
    '.ass': {
      alignSelf: 'stretch'
    },
    '.asc': {
      alignSelf: 'center'
    },
    '.fcent': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    '.grw1': {
      flexGrow: 1
    },
    '.wrap': {
      flexFlow: 'wrap'
    },
    '.snk0': {
      'flex-shrink': '0'
    },

    //---------------------SIZING------------------

    '.w100': {
      width: '100%'
    },
    '.h100': {
      height: '100%'
    },
    '.all100': {
      height: '100%',
      width: '100%'
    },

    //---------------------OVERFLOW------------------

    '.ofh': {
      overflow: 'hidden'
    },
    '.ofa': {
      overflow: 'auto'
    },

    //---------------------ANIMATIONS------------------

    '.fadeIn': {
      willChange: 'opacity',
      animation: `fadeIn 100ms ease-in-out`
    },
    '.fadeOut': {
      willChange: 'opacity',
      animation: `fadeOut 100ms ease-in-out`
    },
    '.shimmer': {
      animation: 'shimmer 1s infinite',
      background: `linear-gradient(to right,${palette.action} 0%, ${palette.actionHover} 50%, ${palette.action} 100%)`,
      backgroundSize: '2000px 100%'
    },

    //---------------------ELEMENTS------------------

    '.img': {
      display: 'block',
      height: 'auto',
      maxWidth: '100%'
    },

    //---------------------GRID------------------

    '.row': {
      '--gridCols': 'var(--cols, 12)',
      // "--grid-gap": `${spacing(1)}px`,
      // "--mar": "calc(0 - var(--grid-gap) )",
      // margin: "inherit var(--mar) inherit var(--mar)",
      // marginTop: 'var(--mar)',
      // marginLeft: 'var(--mar)',
      // width: 'calc(100% + var(--grid-gap)',
      // px: 'var(--gridGap)',
      display: 'flex',
      flex: '0 1 auto',
      width: '100%',
      flexWrap: 'wrap'
    },
    '.col': {
      '--percent': 'calc((var(--num, 12) / var(--gridCols)) * 100%)',
      '--colGap_': 'var(--colGap, var(--gridGap))',
      '--rowGap_': 'var(--rowGap, calc(var(--colGap_) * 2))',
      px: 'var(--colGap_)',
      pt: 'var(--rowGap_)',
      display: 'flex',
      flexGrow: 0,
      flexDirection: 'column',
      flexBasis: 'var(--percent)',
      maxWidth: 'var(--percent)',
      '--num': {
        xs: 'var(--xs)',
        sm: 'var(--sm, var(--xs))',
        md: 'var(--md, var(--sm, var(--xs)))',
        lg: 'var(--lg, var(--md, var(--sm, var(--xs))))',
        xl: 'var(--xl, var(--lg, var(--md, var(--sm, var(--xs)))))',
        xxl: 'var(--xxl, var(--xl, var(--lg, var(--md, var(--sm, var(--xs))))))'
      }
    }
  };
};
