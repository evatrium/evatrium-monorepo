export const hasOwnProperty = <
  T extends Record<string | number | symbol, any>,
  K extends string | number | symbol
>(
  obj: T,
  property: K
): obj is T & Record<K, unknown> => Object.prototype.hasOwnProperty.call(obj, property);
