/**
 * plucks keys values and returns a new object with selected keys
 * @example
 * 	const obj = {a:1, b:2, c: 3};
 * 	const result = pluck(obj, ['b', 'c']);
 * 	// result -> {b:2, c:3}
 * @param obj - object to pluck from
 * @param keys - keys to pluck from object
 */
export const pluck = <T extends Record<string, any>>(obj: T, keys: string[]) =>
	keys.reduce((acc, curr) => ((acc[curr] = obj[curr]), acc), {} as Record<string, any>);
