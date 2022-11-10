import { tinycolor } from '~/styles/util/tinyColor';
import { capitalize, isArr, isObj, isString } from '@evatrium/utils';
import { StrKeyObj } from '~/styles';
import { Theme } from '~/styles';

/*


    TODO: make script to execute and write this to file at build time
    unless we plan to have adaptive theming

 */

const convert = (palette: Theme['palette'], declarations: StrKeyObj, parentKey = '') => {
  return Object.keys(palette).reduce((acc, curr) => {
    const value = palette[curr];
    const isAr = isArr(value);
    if (isAr || isString(value)) {
      const varName = `--${parentKey}${parentKey ? capitalize(curr) : curr}`;
      declarations[varName] = !isAr ? value : `var(--light, ${value[0]}) var(--dark, ${value[1]})`;
      acc[curr] = `var(${varName})`;
    } else if (isObj(value)) {
      acc[curr] = convert(value, declarations, curr);
    }
    return acc;
  }, {} as StrKeyObj);
};

const getRgbValues = ({ r, g, b }: StrKeyObj) => `${r},${g},${b}`;
const createCascadingPaletteFromPrimary = (color: any) => {
  const tc_primary = tinycolor(color);
  let { h, s, l, a } = tc_primary.toHsl();

  const steps = 20;
  const amountEachStep = 100 / (steps - 1);
  const greys = [...Array(steps)].map((_, i) => {
    return tinycolor({
      h,
      s: (i * (amountEachStep - 3)) / 100,
      l: (i * amountEachStep) / 100,
      a
    }).toHexString();
  });
  const grey = greys.reverse().reduce((acc, curr, i) => {
    const key = i * 50;
    acc[key] = curr;
    return acc;
  }, {});

  const lightShadowBase = tinycolor(grey[500]).toRgb();
  const darkShadowBase = tinycolor(grey[950]).toRgb();

  const alpha = (color: string, alpha = 1, desat = 0) =>
    tinycolor(color).desaturate(desat).setAlpha(alpha).toRgbString();

  const action = [grey[100], grey[750]];
  const primary = [tinycolor(color).toHexString(), tinycolor(color).desaturate().toHexString()];

  const config = {
    grey,
    black: grey[950],
    white: [grey[0], grey[100]],
    primary,
    secondary: ['#74C7D1', '#74C7D1'],
    info: ['#1890FF', '#60bffe'],
    success: ['#54D62C', '#56e174'],
    warning: ['#FFC107', '#ffc424'],
    advisory: ['#ff7707', '#fe6943'],
    error: ['#B72136', '#d61240'],
    border: [grey[300], grey[700]],
    t1: [grey[800], grey[100]],
    t2: [grey[700], grey[200]],
    t3: [grey[500], grey[300]],
    contrast1: [grey[950], grey[100]],
    contrast2: [grey[100], grey[950]],
    bg0: [grey[100], grey[900]],
    bg1: [grey[50], grey[850]],
    bg2: [grey[150], grey[800]],
    bg3: [grey[200], grey[750]],
    shadowBase: [getRgbValues(lightShadowBase), getRgbValues(darkShadowBase)],
    action: [alpha(action[0]), alpha(action[1])],
    actionHover: [alpha(action[0], 0.9), alpha(action[1], 0.9)],
    actionActive: [alpha(action[0], 0.7), alpha(action[1], 0.7)],
    actionFocus: [alpha(action[0], 0.1), alpha(action[1], 0.18)],
    actionDisabled: [alpha(action[0], 0.9), alpha(action[1], 0.9)],
    actionPrimary: [alpha(primary[0], 1), alpha(primary[1], 1)],
    actionPrimaryHover: [
      alpha(tinycolor(primary[0]).lighten(10), 1),
      alpha(tinycolor(primary[1]).lighten(20), 1)
    ],
    actionPrimaryActive: [
      alpha(tinycolor(primary[0]).lighten(12), 1),
      alpha(tinycolor(primary[1]).lighten(22), 1)
    ],
    actionPrimaryFocus: [
      alpha(tinycolor(primary[0]).lighten(15), 1),
      alpha(tinycolor(primary[1]).lighten(25), 1)
    ],
    actionPrimaryDisabled: [
      alpha(tinycolor(primary[0]).desaturate(15), 1),
      alpha(tinycolor(primary[1]).desaturate(25), 1)
    ]
  };

  const declarations = {};
  const converted = convert(config, declarations);
  console.log(converted, declarations);

  return {
    ...converted,
    declarations
  };
};

// console.log(_tester);
export const palette = createCascadingPaletteFromPrimary({ h: 238, s: 0.8, l: 0.6 });
// console.log(JSON.stringify(palette, null, '\t'));
