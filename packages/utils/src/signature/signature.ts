import { isObjOrArr } from '~/isType';

/**
 * nonstandard stringify
 * quickly converts serializable data into string thumbprint
 * for things like cache key lookup.
 * here is a more robust solution: https://github.com/streamich/fastest-stable-stringify
 */
export const signature = (data: any): string => {
	if (!isObjOrArr(data)) return `${data}`;
	let out = ''; // @ts-ignore
	for (const key in data) out += `${key}${signature(data[key])}`;
	return out;
};
