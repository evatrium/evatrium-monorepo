export const createTypography = ({ breakpoints, palette } = {}) => {
  const htmlFontSize = 16;

  function pxToRem(value) {
    return `${value / htmlFontSize}rem`;
    // return value
  }

  let s = 1.4;

  const fontSize = 13 * s;
  // function responsiveFontSizes({ sm, md, lg }) {
  //     return {
  //         [breakpoints.up('xs')]: {
  //             fontSize: pxToRem(sm)
  //         },
  //         '@media (min-width:900px)': {
  //             fontSize: pxToRem(md)
  //         },
  //         '@media (min-width:1200px)': {
  //             fontSize: pxToRem(lg)
  //         }
  //     };
  // }
  //Montserrat, Roboto,
  //GT Walsheim, Helvetica Neue, Helvetica, Arial, sans-serif
  const fontStack =
    '\
GT Walsheim, Roboto, Helvetica Neue, -apple-system, Segoe UI, Oxygen, Ubuntu, \
Cantarell, Fira Sans, Droid Sans, sans-serif, "Apple Color Emoji", \
"Segoe UI Emoji", "Segoe UI Symbol"';

  const regular = 400;
  const medium = 600;
  const bold = 700;

  const typo = ({ fontSize: _fontSize = fontSize, lineHeight = 1.4, ...rest } = {}) => ({
    fontSize: pxToRem(_fontSize),
    lineHeight,
    ...rest
  });

  const global = {
    html: {
      ...typo(),
      fontSize: htmlFontSize,
      fontFamily: fontStack,
      fontVariantLigatures: 'common-ligatures',
      fontFeatureSettings: '"liga", "clig"',
      letterSpacing: '-0.24px'
    },
    body: {
      ...typo(),
      fontSize
    }
  };

  const scale = {
    txxl: typo({
      fontSize: 60 * s
    }),
    txl: typo({
      fontSize: 42 * s
    }),
    tlg: typo({
      fontSize: 30 * s
    }),
    tmd: typo({
      fontSize: 20 * s
    }),
    tsm: typo({
      fontSize: 11 * s
    }),
    txs: typo({
      fontSize: 8 * s
    })
  };

  return {
    global,
    scale,
    util: {
      ...scale,
      bold: {
        fontWeight: 'bold'
      },
      noWrap: {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      },
      tuc: {
        textTransform: 'uppercase'
      },
      tac: {
        textAlign: 'center'
      }
    },
    ...scale
  };
};
