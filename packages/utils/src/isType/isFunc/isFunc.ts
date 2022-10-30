/**
 * is value a function
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunc = (value: any): value is Function => typeof value === 'function';
