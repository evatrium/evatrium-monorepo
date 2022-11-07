/**
 * is value an array
 * yes... thats right... a few characters less to type than Array.isArray
 * @param value
 */
export const isArr = (value: any): value is unknown[] => Array.isArray(value);
