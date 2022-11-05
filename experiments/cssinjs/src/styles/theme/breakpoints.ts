import { isNum } from '@evatrium/utils';
import { Breakpoints, BreakpointValues, BreakpointsValuesKey } from '~/styles/types';

let values: BreakpointValues = {
  xs: 0, // phone
  sm: 600, // tablets
  md: 900, // small laptop
  lg: 1200, // desktop
  xl: 1536, // large screens
  xxl: 2000
};

const step = 5;
const keys: string[] = Object.keys(values);

function up(key: BreakpointsValuesKey) {
  const value = isNum(values[key]) ? values[key] : key;
  return `@media (min-width:${value}px)`;
}

function down(key: BreakpointsValuesKey | number) {
  const value = isNum(values[key]) ? values[key] : (key as number);
  return `@media (max-width:${value - step / 100}px)`;
}

const between = (start: BreakpointsValuesKey, end: BreakpointsValuesKey) => {
  const endIndex = keys.indexOf(end as string);
  return `@media (min-width:${values[start]}px) and (max-width:${
    values[keys[endIndex]] - step / 100
  }px)`;
};
const only = (key: BreakpointsValuesKey) => {
  if (keys.indexOf(key as string) + 1 < keys.length)
    return between(key, keys[keys.indexOf(key as string) + 1]);
  return up(key);
};

const downKeys = keys.map((k) => k + 'Down');

const breakpoints: Breakpoints = {
  downKeys,
  upDownKeys: [...keys, ...downKeys],
  keys,
  values,
  up,
  down,
  between,
  only
};

export default breakpoints;
