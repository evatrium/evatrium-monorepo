import { ObjStrKey, Theme } from '~/styles';
import { ObjStrKey } from '@evatrium/utils';

export const typography = ({ palette }: { palette: ObjStrKey }) => {
  const htmlFontSize = 14;
  const regular = 400;
  const medium = 500;
  const bold = 700;

  const pxToRem = (value: number, unit = 'rem') => `${value / htmlFontSize}${unit}`;

  let ratio = 1.6;

  const fontStack = `GT Walsheim, Roboto, Helvetica Neue, -apple-system, Segoe UI, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`;

  const weights = {
    regular,
    medium,
    bold: 'bold'
  };
  const typo = ({ px, lh = ratio }: { px: number; lh: number }) => {
    const fontSize = pxToRem(px * ratio);
    return {
      fontSize,
      lineHeight: lh
    };
  };
  console.log(typeof (1.123).toFixed(3));
  const scale: ObjStrKey = ['txxl', 'txl', 'tlg', 'tmd', 't', 'tsm', 'txs'].reduce(
    (acc, curr, i) => {
      i = i + 1;
      const hemmed = ratio / parseFloat(`1.${i + 15}`);
      acc[curr] = typo({ px: parseFloat(((30 / i) * ratio).toFixed(3)), lh: ratio });
      return acc;
    },
    {} as ObjStrKey
  );

  console.log(scale);

  return {
    scale,
    html: {
      fontSize: htmlFontSize,
      fontFamily: fontStack,
      fontVariantLigatures: 'common-ligatures',
      fontFeatureSettings: '"liga", "clig"',
      // letterSpacing: '-0.24px'
      // letterSpacing: 1,
      fontWeight: weights.medium
    },
    body: {
      ...scale.t
    },
    button: {
      fontWeight: weights.bold,
      textTransform: 'uppercase',
      ...scale.t
    }
  };
};
