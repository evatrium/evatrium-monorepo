import { cssPropertyAlias, cssPropertyPrefixFlags, cssValuePrefixFlags } from 'style-vendorizer';

// yoinked from goober
const prefixCache = {};
export const prefix = (property, value) => {
  const pv = property + value;
  if (prefixCache[pv]) return prefixCache[pv];
  let cssText = '';
  /* Resolve aliases, e.g. `gap` -> `grid-gap` */
  const propertyAlias = cssPropertyAlias(property);
  if (propertyAlias) cssText += `${propertyAlias}:${value};`;

  /* Prefix properties, e.g. `backdrop-filter` -> `-webkit-backdrop-filter` */
  const propertyFlags = cssPropertyPrefixFlags(property);
  if (propertyFlags & 0b001) cssText += `-webkit-${property}:${value};`;
  if (propertyFlags & 0b010) cssText += `-moz-${property}:${value};`;
  if (propertyFlags & 0b100) cssText += `-ms-${property}:${value};`;

  /* Prefix values, e.g. `position: "sticky"` -> `position: "-webkit-sticky"` */
  /* Notice that flags don't overlap and property prefixing isn't needed here */
  const valueFlags = cssValuePrefixFlags(property, value);
  if (valueFlags & 0b001) cssText += `${property}:-webkit-${value};`;
  else if (valueFlags & 0b010) cssText += `${property}:-moz-${value};`;
  else if (valueFlags & 0b100) cssText += `${property}:-ms-${value};`;

  /* Include the standardized declaration last */
  /* https://css-tricks.com/ordering-css3-properties/ */
  cssText += `${property}:${value};`;
  prefixCache[pv] = cssText;
  return cssText;
};

const IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
// yoinked from csx
const hyph = (prop) =>
  prop[0] === '-' && prop[1] === '-' ? prop : prop.replace(/[A-Z]/g, '-$&').toLowerCase();

const addPx = (prop, val) =>
  typeof val !== 'number' || val === 0 || IS_NON_DIMENSIONAL.test(prop) ? val : val + 'px';

let decsCache = {};
export const prefixPx = (prop, val) => {
  let key = prop + val;
  if (decsCache[key]) return decsCache[key];
  let p = hyph(prop);
  let dec = prefix(p, addPx(prop, val));
  decsCache[key] = dec;
  return dec;
};
