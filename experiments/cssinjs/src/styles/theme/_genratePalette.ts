import { tinycolor } from '~/styles/util/tinyColor';
import { capitalize, isArr, isObj, isString } from '@evatrium/utils';
import { ObjStrKey } from '~/styles';
import { Theme } from '~/styles';

/*


    TODO: make script to execute and write this to file at build time
    unless we plan to have adaptive theming

 */

const convert = (palette: Theme['palette'], declarations: ObjStrKey, parentKey = '') => {
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
  }, {} as ObjStrKey);
};

const getRgbValues = ({ r, g, b }: ObjStrKey) => `${r},${g},${b}`;
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

  const primary = [
    tinycolor(color).toHexString(),
    tinycolor(color).desaturate().lighten(20).toHexString()
  ];

  const makeActionColors = (color: any[]) => {
    // prettier-ignore
    const action = [
      alpha(tinycolor(color[0]), 1),
      alpha(tinycolor(color[1]), 1)
    ]
    const actionHover = [
      /* light */ alpha(tinycolor(color[0]).darken(5).desaturate(10), 1),
      /* dark */ alpha(tinycolor(color[1]).darken(3).desaturate(2), 1)
    ];
    const actionActive = [
      alpha(tinycolor(color[0]).darken(20).desaturate(10), 0.9),
      alpha(tinycolor(color[1]).darken(15).desaturate(15), 0.9)
    ];
    // prettier-ignore
    const actionFocus = [
      alpha(tinycolor(color[0]).lighten(2), 1),
      alpha(tinycolor(color[1]).lighten(10), 1)
    ];

    // prettier-ignore
    const actionDisabled = [
      alpha(
        tinycolor(color[0]),
        0.5
      ),
      alpha(
        tinycolor(color[1]),
        0.5
      )
    ];
    return [action, actionHover, actionActive, actionFocus, actionDisabled];
  };

  const mapToActionType = (
    type: string,
    [action, actionHover, actionActive, actionFocus, actionDisabled]
  ) => {
    type = capitalize(type);
    return {
      [`action${type}`]: action,
      [`actionActive${type}`]: actionActive,
      [`actionHover${type}`]: actionHover,
      [`actionFocus${type}`]: actionFocus,
      [`actionDisabled${type}`]: actionDisabled
    };
  };

  const config = {
    grey,
    black: grey[950],
    white: [grey[0], grey[50]],
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
    contrast2: [grey[50], grey[950]],
    bg0: [grey[100], grey[900]],
    bg1: [grey[50], grey[850]],
    bg2: [grey[150], grey[800]],
    bg3: [grey[200], grey[750]],
    shadowBase: [getRgbValues(lightShadowBase), getRgbValues(darkShadowBase)],
    ...mapToActionType('', makeActionColors([grey[100], grey[750]])),
    ...mapToActionType('primary', makeActionColors(primary))
  };

  const declarations = {};
  const converted = convert(config, declarations);
  console.log(converted, declarations);

  return {
    ...converted,
    declarations
  };
};
const dflt = { h: 238, s: 0.8, l: 0.6 };
const mint = { h: 150, s: 0.8, l: 0.4 };
const blue = { h: 222, s: 0.9, l: 0.5 };
const purps = { h: 250, s: 0.8, l: 0.6 };
// const lavender = { h: 260, s: 0.8, l: 0.6 };
const pinkish = { h: 290, s: 0.8, l: 0.6 };
const looksTangerineInDarkMode = { h: 10, s: 0.8, l: 0.4 };
const lime = { h: 70, s: 0.8, l: 0.4 };
const asdf = { h: 70, s: 0.8, l: 0.4 };
// console.log(_tester);
export const palette = createCascadingPaletteFromPrimary(dflt);
// console.log(JSON.stringify(palette, null, '\t'));
