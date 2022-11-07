/**
 * is value a number, not NaN, and is finite
 */
export const isNum = (value: any): value is number =>
  typeof value === 'number' && !isNaN(value - 0) && isFinite(value);
