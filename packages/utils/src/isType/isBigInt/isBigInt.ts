/**
 * is value a big integer type
 */
export const isBigInt = (value: any): value is bigint => typeof value === 'bigint';
