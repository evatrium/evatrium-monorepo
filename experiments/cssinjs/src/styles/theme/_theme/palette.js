import { capitalize } from '@iosio/util';
import { alpha, darken, getRgbValues, hslToRgb, lighten, rgbToHex } from '@iosio/util';

const createColorObject = ({ h, s, l } = {}) => {
  const hsl = `hsl(${h},${s}%,${l}%)`,
    rgb = hslToRgb(hsl),
    hex = rgbToHex(rgb),
    rgbValues = getRgbValues(hex),
    rgba = (o) => `rgba(${rgbValues},${o ?? 1})`;
  return {
    h,
    s,
    l,
    hsl,
    hex,
    rgb,
    rgbValues,
    rgba,
    augment: ({ h: _h, s: _s, l: _l } = {}) => {
      return createColorObject({ h: _h ?? h, s: _s ?? s, l: _l ?? l });
    }
  };
};

// for accessing actual color values via js
const makeObjectFlatValues = (palette, light) =>
  Object.keys(palette).reduce((acc, curr) => {
    const value = palette[curr];
    const isArr = Array.isArray(value);
    if (isArr || typeof value === 'string') {
      acc[curr] = isArr ? value[light ? 0 : 1] : value;
    } else if (typeof value === 'object') {
      acc[curr] = makeObjectFlatValues(value, light);
    }
    return acc;
  }, {});

const createModes = (palette) => {
  const declarations = {};

  const convert = (palette, declarations, parentKey = '') => {
    return Object.keys(palette).reduce((acc, curr) => {
      const value = palette[curr];
      const isArr = Array.isArray(value);
      if (isArr || typeof value === 'string') {
        const varName = `--${parentKey}${parentKey ? capitalize(curr) : curr}`;
        declarations[varName] = !isArr
          ? value
          : `var(--light, ${value[0]}) var(--dark, ${value[1]})`;
        acc[curr] = `var(${varName})`;
      } else if (typeof value === 'object') {
        acc[curr] = convert(value, declarations, curr);
      }
      return acc;
    }, {});
  };

  const values = makeObjectFlatValues(palette, true);

  return {
    ...convert(palette, declarations),
    declarations,
    values: {
      ...values,
      light: values,
      dark: makeObjectFlatValues(palette)
    }
  };
};

const lightObj = createColorObject({
  // h: 225,
  h: 227,
  s: 76,
  l: 62
});
const darkObj = lightObj.augment({
  s: 82,
  l: 64
});
const primary = [lightObj.hex, darkObj.hex];

const lightDesat = lightObj.augment({ s: 10 });
const grey = {
  0: '#FFFFFF',
  100: lightDesat.augment({ l: 99 }).hex,
  150: lightDesat.augment({ l: 95 }).hex,
  200: lightDesat.augment({ l: 90 }).hex,
  250: lightDesat.augment({ l: 85 }).hex,
  300: lightDesat.augment({ l: 80 }).hex,
  350: lightDesat.augment({ l: 75 }).hex,
  400: lightDesat.augment({ l: 70 }).hex,
  450: lightDesat.augment({ l: 65 }).hex,
  500: lightDesat.augment({ l: 60 }).hex,
  550: lightDesat.augment({ l: 55 }).hex,
  600: lightDesat.augment({ l: 50 }).hex,
  650: lightDesat.augment({ l: 45 }).hex,
  700: lightDesat.augment({ l: 40 }).hex,
  750: lightDesat.augment({ l: 35 }).hex,
  800: lightDesat.augment({ l: 30 }).hex,
  850: lightDesat.augment({ l: 25 }).hex,
  900: lightDesat.augment({ l: 15 }).hex,
  950: lightDesat.augment({ l: 10 }).hex, //10
  // 1000: lightDesat.augment({l: 5}).hex,
  1000: lightDesat.augment({ l: 2 }).hex,
  1050: lightDesat.augment({ l: 1 }).hex
};

const lightShadowBase = grey[500];
const darkShadowBase = grey[1050];

const config = {
  black: '#000',
  white: ['#fff', grey[100]],
  primary: primary,
  secondary: ['#74C7D1', '#74C7D1'],
  info: ['#1890FF', '#60bffe'],
  success: ['#54D62C', '#56e174'],
  warning: ['#FFC107', '#ffc424'],
  advisory: ['#ff7707', '#fe6943'],
  error: ['#B72136', '#d61240'],
  grey,
  border: grey[700],
  t1: [grey[800], grey[250]], //[grey[800], ],
  t2: [grey[700], grey[400]], //[grey[600]],
  t3: [grey[500], grey[600]], //[grey[500], grey[600]],
  contrast1: ['#000', grey[100]],
  contrast2: [grey[100], '#000'],
  bg0: [grey[150], grey[1000]],
  bg1: ['#fff', grey[950]],
  bg2: [grey[200], grey[900]],
  bg3: [grey[300], grey[850]],
  shadowBase: [getRgbValues(lightShadowBase), getRgbValues(darkShadowBase)],
  action: [lightDesat.rgba(0.08), lightDesat.rgba(0.1)],
  actionHover: [lightDesat.rgba(0.13), lightDesat.rgba(0.25)],
  actionActive: [lightDesat.rgba(0.11), lightDesat.rgba(0.15)],
  actionFocus: [lightDesat.rgba(0.1), lightDesat.rgba(0.18)],
  actionDisabled: [lightDesat.rgba(0.09), lightDesat.rgba(0.09)],
  actionPrimary: [primary[0], primary[1]],
  actionPrimaryHover: [lightObj.augment({ l: 50 }).hex, darkObj.augment({ l: 70 }).hex],
  actionPrimaryActive: [lightObj.augment({ l: 40 }).hex, darkObj.augment({ l: 75, s: 100 }).hex],
  actionPrimaryFocus: [lightObj.augment({ l: 30 }).hex, darkObj.augment({ l: 78, s: 100 }).hex],
  actionPrimaryDisabled: [
    lightObj.augment({ l: 70, s: 50 }),
    darkObj.augment({ l: 40, s: 40 }).hex
  ],
  gradient1: 'linear-gradient(180deg, #ff008c 0%, rgb(211, 9, 225) 100%)'
};

const palette = createModes(config);
console.log(palette.values);

// console.log(palette);
export default palette;
