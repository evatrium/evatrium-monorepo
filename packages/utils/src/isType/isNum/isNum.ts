/**
 * is value a number, not NaN, and is finite
 */
export const isNum = (value: any): boolean =>
	typeof value === 'number' && !isNaN(value - 0) && isFinite(value);
