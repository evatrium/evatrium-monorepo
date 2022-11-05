let values = {
  xs: 0, // phone
  sm: 600, // tablets
  md: 900, // small laptop
  lg: 1200, // desktop
  xl: 1536, // large screens
  xxl: 2000
};

const step = 5;
const keys = Object.keys(values);

function up(key) {
  const value = typeof values[key] === 'number' ? values[key] : key;
  return `@media (min-width:${value}px)`;
}

function down(key) {
  const value = typeof values[key] === 'number' ? values[key] : key;
  return `@media (max-width:${value - step / 100}px)`;
}

const between = (start, end) => {
  const endIndex = keys.indexOf(end);
  return `@media (min-width:${values[start]}px) and (max-width:${
    values[keys[endIndex]] - step / 100
  }px)`;
};
const only = (key) => {
  if (keys.indexOf(key) + 1 < keys.length) return between(key, keys[keys.indexOf(key) + 1]);
  return up(key);
};

const downKeys = keys.map((k) => k + 'Down');

export default {
  downKeys,
  upDownKeys: [...keys, ...downKeys],
  keys,
  values,
  up,
  down,
  between,
  only
};
