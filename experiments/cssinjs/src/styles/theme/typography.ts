import { StrKeyObj, Theme } from '~/styles';

export const typography = ({ palette }: { palette: StrKeyObj }) => {
  const htmlFontSize = 16;
  const regular = 400;
  const medium = 600;
  const bold = 700;

  const pxToRem = (value: number) => `${value / htmlFontSize}rem`;

  let s = 1.4;

  const fontSize = 13 * s;

  const fontStack = `GT Walsheim, Roboto, Helvetica Neue, -apple-system, Segoe UI, Oxygen, Ubuntu,\
Cantarell, Fira Sans, Droid Sans, sans-serif, "Apple Color Emoji",\
"Segoe UI Emoji", "Segoe UI Symbol"`;

  const weights = {
    regular: 400,
    medium: 600,
    bold: 'bold'
  };

  const scale = {
    txxl: {
      fontSize: pxToRem(60 * s)
    },
    txl: {
      fontSize: pxToRem(42 * s)
    },
    tlg: {
      fontSize: pxToRem(30 * s)
    },
    tmd: {
      fontSize: pxToRem(20 * s)
    },
    tsm: {
      fontSize: pxToRem(11 * s)
    },
    txs: {
      fontSize: pxToRem(8 * s)
    }
  };

  return {
    html: {
      fontSize: htmlFontSize,
      fontFamily: fontStack,
      fontVariantLigatures: 'common-ligatures',
      fontFeatureSettings: '"liga", "clig"',
      // letterSpacing: '-0.24px'
      letterSpacing: 1
    },
    body: {
      fontSize
    },
    button: {
      color: 'inherit',
      fontWeight: weights.bold,
      textTransform: 'uppercase'
    }
  };
};
