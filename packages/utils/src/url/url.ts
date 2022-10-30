import { stringifyParams } from '~/stringifyParams';
import { isObj } from '~/isType';
import { isEmpty } from '~/isEmpty';

/**
 * tagged template literal that stringifies interpolated objects into URLSearchParams
 * @param strings
 * @param interpolations
 * @example
 * 	const placeToGo = url`foo/bar?${{id:123}}`;
 *
 * 	console.log(placeToGo); // foo/bar?id=123
 */
export const url = (strings: TemplateStringsArray, ...interpolations: any[]) =>
	strings.reduce((out, string, i) => {
		let value = interpolations[i];
		if (isObj(value)) {
			value = isEmpty(value) ? '' : `${string.endsWith('?') ? '' : '?'}${stringifyParams(value)}`;
		}
		if (value === undefined) value = '';
		out += `${string}${value}`;
		return out;
	}, '');
