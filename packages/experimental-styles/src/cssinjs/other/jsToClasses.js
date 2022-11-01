import { prefixPx } from '~/cssinjs/prefixPx.js';

export const jsToClasses = (obj) =>
  Object.keys(obj).reduce(
    (acc, curr) =>
      `${acc} .${curr}{${Object.keys(obj[curr]).reduce(
        (a2, c2) => `${a2}${prefixPx(c2, obj[curr][c2])}`,
        ''
      )}}`,
    ''
  );
